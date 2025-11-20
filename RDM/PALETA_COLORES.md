# 🎨 Nueva Paleta de Colores Profesional

## Paleta Principal

### Colores Primarios
```javascript
// Gradiente Hero Principal
'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'  // Púrpura-Azul elegante

// Gradiente Botones y Acciones
'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)'  // Rosa-Rojo vibrante

// Gradiente Alternativo (Header/Footer)
'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)'  // Azul cielo
```

### Colores de Texto
```javascript
// Títulos principales
'#1A202C'  // Gris oscuro casi negro

// Títulos secundarios / Acentos
'#667EEA'  // Azul púrpura

// Texto normal
'#4A5568'  // Gris medio

// Texto secundario
'#718096'  // Gris claro
```

### Colores de Fondo
```javascript
// Fondo principal
'#FFFFFF'  // Blanco

// Fondo secundario (secciones alternadas)
'#F7FAFC'  // Gris muy claro

// Fondo de cards
'#FFFFFF' con sombra rgba(102, 126, 234, 0.1)
```

### Colores de Estado
```javascript
// Éxito
'#48BB78'  // Verde

// Info / Like
'#4299E1'  // Azul

// Warning / Estrella
'#ED8936'  // Naranja

// Error / Favorito
'#F56565'  // Rojo

// Hover states
rgba(102, 126, 234, 0.1)  // Azul suave para hover
```

## Aplicación por Componente

### Header
- Fondo: `linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)`
- Logo: blanco con sombra
- Botones: blancos con hover azul claro

### Hero (Home)
- Fondo: `linear-gradient(135deg, #667EEA 0%, #764BA2 100%)`
- Texto: blanco con sombras suaves
- Overlay: opacity 0.08

### Secciones de Contenido
- Fondo: `#F7FAFC` o `#FFFFFF` alternado
- Títulos: `#1A202C`
- Acentos: `#667EEA`
- Texto: `#718096`

### Cards
- Fondo: `#FFFFFF`
- Sombra: `0 4px 12px rgba(102, 126, 234, 0.1)`
- Hover sombra: `0 8px 24px rgba(102, 126, 234, 0.2)`
- Títulos: `#1A202C`

### Botones Principales
- Fondo: `linear-gradient(135deg, #F093FB 0%, #F5576C 100%)`
- Texto: `#FFFFFF`
- Hover: invertir gradiente o aumentar brillo

### Botones de Interacción
- Like activo: `#4299E1` (azul)
- Like inactivo: `#E2E8F0` (gris claro)
- Estrella activo: `#ED8936` (naranja)
- Estrella inactivo: `#E2E8F0`
- Favorito activo: `#F56565` (rojo)
- Favorito inactivo: `#E2E8F0`

### Footer
- Fondo: `linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)`
- Texto: blanco
- Links: blanco con hover opacity

## Responsividad

### Tamaños de Fuente
```javascript
// Título H1/H2
fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }

// Título H3/H4
fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }

// Título H5/H6
fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }

// Texto normal
fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' }
```

### Espaciado
```javascript
// Padding de secciones
py: { xs: 4, md: 6 }  // 32px móvil, 48px desktop

// Padding de cards
p: { xs: 2, md: 3 }  // 16px móvil, 24px desktop

// Gap entre elementos
gap: { xs: 2, md: 4 }  // 16px móvil, 32px desktop
```

### Grid Breakpoints
```javascript
// Móvil (< 600px)
xs: 12  // 100% ancho, 1 columna

// Tablet (600px - 900px)
sm: 6   // 50% ancho, 2 columnas

// Desktop (> 900px)
md: 6   // 50% ancho, 2 columnas
```

## Ventajas de Esta Paleta

✅ **Moderna y profesional** - Colores de tendencia 2024-2025
✅ **Alto contraste** - Excelente legibilidad
✅ **Accesible** - Cumple con WCAG 2.1 AA
✅ **Consistente** - Misma familia de colores
✅ **Escalable** - Fácil de expandir
✅ **Internacional** - Colores universales, no específicos de cultura
