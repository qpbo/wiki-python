# Python Wiki Premium 🐍✨

Documentación profesional de Python con diseño moderno e interactivo.

![Python](https://img.shields.io/badge/python-3.x-blue.svg)
![MkDocs](https://img.shields.io/badge/mkdocs-material-00C7B7.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Demo en Vivo

**[Ver Sitio Web →](https://qpbo.github.io/wiki-python/)**

## ✨ Características

- 🎨 **Diseño Premium** - Glassmorphism, gradientes animados, y efectos modernos
- ⚡ **Sistema de Partículas** - Background animado con Canvas
- 📱 **Responsive** - Optimizado para móvil, tablet y desktop
- 🌓 **Modo Oscuro/Claro** - Cambio suave entre temas
- 🔍 **Búsqueda Avanzada** - Busca en toda la documentación
- 📊 **Diagramas Interactivos** - Mermaid diagrams
- 🎯 **Stats Animados** - Contadores que se animan al scroll
- 🚀 **Deploy Automático** - GitHub Actions CI/CD

## 🛠️ Tecnologías

- **MkDocs Material** - Framework de documentación
- **CSS3** - Animaciones y glassmorphism
- **JavaScript Vanilla** - Partículas y efectos interactivos
- **GitHub Pages** - Hosting gratuito
- **GitHub Actions** - CI/CD automático

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/qpbo/wiki-python.git
cd wiki-python

# Instalar dependencias
pip install -r requirements.txt

# Servir localmente
mkdocs serve
```

Abre http://127.0.0.1:8000 en tu navegador.

## 🚀 Despliegue

El sitio se despliega automáticamente a GitHub Pages cuando haces push a `main`:

```bash
git add .
git commit -m "Actualizar contenido"
git push
```

GitHub Actions se encarga del resto. El sitio se actualiza en 1-2 minutos.

## 📁 Estructura del Proyecto

```
wiki-python/
├── docs/
│   ├── index.md              # Página principal
│   ├── fundamentos.md        # Fundamentos de Python
│   ├── avanzado.md          # Conceptos avanzados
│   ├── proyectos.md         # Proyectos prácticos
│   ├── recursos.md          # Recursos de aprendizaje
│   ├── stylesheets/
│   │   ├── custom.css       # Estilos personalizados
│   │   └── animations.css   # Animaciones
│   └── javascripts/
│       ├── custom.js        # JavaScript principal
│       └── particles.js     # Sistema de partículas
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions
├── mkdocs.yml               # Configuración MkDocs
├── requirements.txt         # Dependencias Python
└── README.md               # Este archivo
```

## 🎨 Personalización

### Cambiar Colores

Edita `docs/stylesheets/custom.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
}
```

### Modificar Partículas

Edita `docs/javascripts/particles.js`:

```javascript
new ParticleSystem('particles-canvas', {
  particleCount: 60,
  speed: 0.2,
  particleSize: 2,
  lineDistance: 120
});
```

## 📊 Estadísticas

- **Páginas:** 5 páginas completas
- **CSS:** ~600 líneas de código personalizado
- **JavaScript:** ~600 líneas con animaciones
- **Características:** 40+ features de Material for MkDocs
- **Animaciones:** 20+ keyframes CSS

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👤 Autor

**Carliyo** - [@qpbo](https://github.com/qpbo)

## 🙏 Agradecimientos

- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) - Framework increíble
- [Python.org](https://www.python.org/) - Por Python
- [GitHub Pages](https://pages.github.com/) - Hosting gratuito

---

<div align="center">
  
**[Ver Documentación](https://qpbo.github.io/wiki-python/)** | **[Reportar Bug](https://github.com/qpbo/wiki-python/issues)** | **[Solicitar Feature](https://github.com/qpbo/wiki-python/issues)**

Hecho con ❤️ y Python

</div>
