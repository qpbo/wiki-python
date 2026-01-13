/**
 * CUSTOM JAVASCRIPT ENHANCEMENTS
 * Premium interactive features for MkDocs
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCodeCopyFeedback();
  initSmoothScroll();
  initStatsCounter();
  initThemeTransition();
  initTypingEffect();
  initRippleEffect();
});

/**
 * SCROLL ANIMATIONS
 * Animate elements when they come into view
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.fade-in-up, .fade-in, .scale-in, .section-transition').forEach(el => {
    observer.observe(el);
  });
}

/**
 * CODE COPY ENHANCED FEEDBACK
 * Show visual feedback when code is copied
 */
function initCodeCopyFeedback() {
  document.addEventListener('click', (e) => {
    const copyButton = e.target.closest('.md-clipboard');
    if (copyButton) {
      const originalHTML = copyButton.innerHTML;
      
      // Change to checkmark
      copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
      copyButton.style.background = '#10b981';
      
      // Create ripple effect
      createRipple(e, copyButton);
      
      // Reset after animation
      setTimeout(() => {
        copyButton.innerHTML = originalHTML;
        copyButton.style.background = '';
      }, 2000);
    }
  });
}

/**
 * SMOOTH SCROLL
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
      }
    });
  });
}

/**
 * ANIMATED STATS COUNTER
 * Animate numbers in stat cards
 */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

/**
 * SMOOTH THEME TRANSITION
 * Add smooth color transition when switching themes
 */
function initThemeTransition() {
  // Add transition class to body
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  
  // Observe theme toggle
  const toggleButton = document.querySelector('[data-md-component="palette"]');
  if (toggleButton) {
    toggleButton.addEventListener('change', () => {
      // Add a subtle flash effect
      document.body.style.opacity = '0.95';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 150);
    });
  }
}

/**
 * TYPING EFFECT
 * Typewriter effect for hero text
 */
function initTypingEffect() {
  const typingElements = document.querySelectorAll('[data-typing]');
  
  typingElements.forEach(element => {
    const text = element.getAttribute('data-typing');
    const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;
    element.textContent = '';
    
    let index = 0;
    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };
    
    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  });
}

/**
 * RIPPLE EFFECT
 * Material Design ripple effect for buttons
 */
function initRippleEffect() {
  document.querySelectorAll('.btn-premium, .ripple-effect').forEach(button => {
    button.addEventListener('click', function(e) {
      createRipple(e, this);
    });
  });
}

function createRipple(event, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255, 255, 255, 0.6)';
  ripple.style.pointerEvents = 'none';
  ripple.style.animation = 'ripple 0.6s ease-out';
  
  // Ensure parent is positioned
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  
  element.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

/**
 * PARALLAX EFFECT
 * Subtle parallax on mouse move for hero sections
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 5;
      const x = mouseX * speed;
      const y = mouseY * speed;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

/**
 * CODE PREVIEW ENHANCEMENT
 * Add line numbers and syntax highlighting enhancements
 */
function enhanceCodeBlocks() {
  document.querySelectorAll('.highlight pre code').forEach((block) => {
    // Add line numbers if not already present
    if (!block.parentElement.classList.contains('has-line-numbers')) {
      const lines = block.textContent.split('\n').length;
      const lineNumbers = document.createElement('div');
      lineNumbers.className = 'line-numbers';
      
      for (let i = 1; i <= lines; i++) {
        const lineNumber = document.createElement('span');
        lineNumber.textContent = i;
        lineNumbers.appendChild(lineNumber);
      }
      
      block.parentElement.classList.add('has-line-numbers');
      block.parentElement.insertBefore(lineNumbers, block);
    }
  });
}

/**
 * SCROLL PROGRESS INDICATOR
 * Show reading progress at the top of the page
 */
function initScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #ec4899);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progress);
  
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = (window.scrollY / documentHeight) * 100;
    progress.style.width = scrolled + '%';
  });
}

// Initialize scroll progress
initScrollProgress();

/**
 * EASTER EGG: Konami Code
 * Fun surprise for users who enter the Konami code
 */
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  // Add rainbow effect to the page
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    body { animation: rainbow 3s linear infinite; }
  `;
  document.head.appendChild(style);
  
  // Show notification
  const notification = document.createElement('div');
  notification.textContent = '🎉 ¡Código secreto activado! 🎉';
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 2rem 3rem;
    border-radius: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    z-index: 10000;
    animation: scaleInBounce 0.7s ease-out;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
      notification.remove();
      style.remove();
      document.body.style.animation = '';
    }, 500);
  }, 3000);
}

/**
 * PERFORMANCE MONITORING
 * Log performance metrics in development
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.addEventListener('load', () => {
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
    }
  });
}
