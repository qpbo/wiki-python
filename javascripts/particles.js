/**
 * PARTICLE SYSTEM
 * Canvas-based particle animation for MkDocs background
 * Optimized for performance with requestAnimationFrame
 */

class ParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn(`Canvas with id "${canvasId}" not found`);
      return;
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    
    // Configuration options
    this.options = {
      particleCount: options.particleCount || 50,
      particleColor: options.particleColor || '#6366f1',
      particleSize: options.particleSize || 2,
      speed: options.speed || 0.3,
      lineDistance: options.lineDistance || 150,
      lineColor: options.lineColor || '#6366f1',
      lineOpacity: options.lineOpacity || 0.1,
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.setCanvasSize();
    this.createParticles();
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.setCanvasSize();
      this.createParticles();
    });
    
    // Update colors when theme changes
    this.observeThemeChange();
  }
  
  setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    const count = Math.floor(this.options.particleCount * (this.canvas.width / 1920));
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: Math.random() * this.options.particleSize + 1
      });
    }
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
    });
  }
  
  drawParticles() {
    this.ctx.fillStyle = this.options.particleColor;
    
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
  
  drawLines() {
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.options.lineDistance) {
          const opacity = (1 - distance / this.options.lineDistance) * this.options.lineOpacity;
          this.ctx.strokeStyle = `${this.options.lineColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateParticles();
    this.drawLines();
    this.drawParticles();
    
    requestAnimationFrame(() => this.animate());
  }
  
  observeThemeChange() {
    // Observe theme changes and update particle colors
    const observer = new MutationObserver(() => {
      const isDarkMode = document.body.getAttribute('data-md-color-scheme') === 'slate';
      this.options.particleColor = isDarkMode ? '#818cf8' : '#6366f1';
      this.options.lineColor = isDarkMode ? '#818cf8' : '#6366f1';
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-md-color-scheme']
    });
  }
}

// Initialize particle system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
    
    // Initialize particle system
    new ParticleSystem('particles-canvas', {
      particleCount: 60,
      speed: 0.2,
      particleSize: 2,
      lineDistance: 120,
      lineOpacity: 0.15
    });
  }
});
