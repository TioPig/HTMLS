/**
 * Recetas Del Mundo - Presentación de Slides
 * Script principal para navegación y funcionalidades interactivas
 */

// ============================================
// NAVEGACIÓN DE SLIDES
// ============================================

const slides = Array.from(document.querySelectorAll('.slide'));
let currentIndex = 0;

const indicator = document.getElementById('slideIndicator');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const progressBar = document.getElementById('progressBar');

/**
 * Actualiza la visualización de slides y controles
 */
function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
    });
    
    // Actualizar indicador
    indicator.textContent = `Slide ${currentIndex + 1} / ${slides.length}`;
    
    // Actualizar botones
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
    
    // Actualizar barra de progreso
    const progress = ((currentIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Animar entrada de la slide
    const activeSlide = slides[currentIndex];
    activeSlide.style.opacity = '0';
    setTimeout(() => {
        activeSlide.style.opacity = '1';
    }, 50);
}

/**
 * Navega a la slide anterior
 */
function previousSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlides();
    }
}

/**
 * Navega a la siguiente slide
 */
function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlides();
    }
}

/**
 * Navega a una slide específica por índice
 */
function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        currentIndex = index;
        updateSlides();
    }
}

// Event listeners para botones
prevBtn.addEventListener('click', previousSlide);
nextBtn.addEventListener('click', nextSlide);

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    // Evitar navegación si hay un modal abierto
    if (imageModal.classList.contains('active')) {
        return;
    }
    
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'PageUp':
            e.preventDefault();
            previousSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(slides.length - 1);
            break;
    }
});

// ============================================
// ZOOM DE IMÁGENES
// ============================================

const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeModal');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const zoomResetBtn = document.getElementById('zoomReset');
const zoomLevelDisplay = document.getElementById('zoomLevel');

let currentZoom = 1;
let minZoom = 0.5;
let maxZoom = 5;
let zoomStep = 0.25;

// Variables para drag and drop
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;
let currentTranslateX = 0;
let currentTranslateY = 0;

/**
 * Actualiza el nivel de zoom de la imagen
 */
function updateZoom(newZoom) {
    currentZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
    zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    
    // Cambiar cursor según el zoom
    if (currentZoom > 1) {
        modalImg.style.cursor = isDragging ? 'grabbing' : 'grab';
    } else {
        modalImg.style.cursor = 'zoom-in';
    }
}

/**
 * Actualiza la posición de la imagen (para arrastrar)
 */
function updateTransform() {
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
}

/**
 * Resetea zoom y posición
 */
function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    currentTranslateX = 0;
    currentTranslateY = 0;
    updateZoom(1);
}

/**
 * Abre el modal de zoom con la imagen seleccionada
 */
function openImageModal(imageSrc) {
    modalImg.src = imageSrc;
    imageModal.classList.add('active');
    resetZoom();
    
    // Evitar scroll del body
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de zoom
 */
function closeImageModal() {
    imageModal.classList.remove('active');
    modalImg.src = '';
    resetZoom();
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

// Event listeners para controles de zoom
zoomInBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateZoom(currentZoom + zoomStep);
});

zoomOutBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateZoom(currentZoom - zoomStep);
});

zoomResetBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetZoom();
});

// Zoom con rueda del mouse
modalContent.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
    updateZoom(currentZoom + delta);
}, { passive: false });

// Prevenir que los clics en los controles cierren el modal
document.querySelector('.zoom-controls').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Drag and drop para mover la imagen cuando está con zoom
modalImg.addEventListener('mousedown', (e) => {
    if (currentZoom > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        modalImg.style.cursor = 'grabbing';
        e.preventDefault();
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        currentTranslateX = translateX;
        currentTranslateY = translateY;
        if (currentZoom > 1) {
            modalImg.style.cursor = 'grab';
        }
    }
});

// Touch events para dispositivos móviles
let initialDistance = 0;
let initialZoom = 1;
let touches = [];

modalImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        // Pinch to zoom
        e.preventDefault();
        initialDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        initialZoom = currentZoom;
    } else if (e.touches.length === 1 && currentZoom > 1) {
        // Drag
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
    }
});

modalImg.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        // Pinch to zoom
        e.preventDefault();
        const currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        const scale = currentDistance / initialDistance;
        updateZoom(initialZoom * scale);
    } else if (isDragging && e.touches.length === 1) {
        // Drag
        e.preventDefault();
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        updateTransform();
    }
});

modalImg.addEventListener('touchend', () => {
    isDragging = false;
    currentTranslateX = translateX;
    currentTranslateY = translateY;
});

// Agregar event listener a todas las imágenes zoomables
document.querySelectorAll('.zoomable-image').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        const zoomSrc = img.getAttribute('data-zoom-src') || img.src;
        openImageModal(zoomSrc);
    });
    
    // Añadir efecto visual al hover
    img.style.transition = 'all 0.3s ease';
});

// Cerrar modal al hacer clic en la X
closeBtn.addEventListener('click', closeImageModal);

// Cerrar modal al hacer clic fuera de la imagen
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal || e.target === modalContent) {
        closeImageModal();
    }
});

// Prevenir cierre al hacer clic en la imagen
modalImg.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeImageModal();
    }
});

// ============================================
// ANIMACIONES Y EFECTOS
// ============================================

/**
 * Anima la entrada de elementos cuando se hacen visibles
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    document.querySelectorAll('.feature-card, .tech-card, .highlight-box').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

/**
 * Agrega efecto de pulso a elementos importantes
 */
function addPulseEffect() {
    const pulseElements = document.querySelectorAll('.badge-primary, .hero-tags span');
    
    pulseElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'pulse 2s infinite';
            setTimeout(() => {
                element.style.animation = '';
            }, 4000);
        }, index * 200);
    });
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Muestra el tiempo transcurrido de la presentación
 */
let presentationStartTime = null;
let timerInterval = null;

function startPresentationTimer() {
    if (!presentationStartTime) {
        presentationStartTime = Date.now();
        
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - presentationStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            console.log(`Tiempo de presentación: ${minutes}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
    }
}

/**
 * Copia al portapapeles (útil para comandos técnicos)
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copiado al portapapeles:', text);
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

/**
 * Modo presentador (muestra notas adicionales en consola)
 */
function togglePresenterMode() {
    const presenterMode = localStorage.getItem('presenterMode') === 'true';
    const newMode = !presenterMode;
    localStorage.setItem('presenterMode', newMode);
    
    if (newMode) {
        console.log('%c🎤 MODO PRESENTADOR ACTIVADO', 'color: #667EEA; font-size: 16px; font-weight: bold;');
        console.log('Usa las teclas de flecha o espacio para navegar');
        console.log('Presiona "P" nuevamente para desactivar');
        startPresentationTimer();
    } else {
        console.log('%c🎤 Modo presentador desactivado', 'color: #999; font-size: 14px;');
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            presentationStartTime = null;
        }
    }
    
    return newMode;
}

// Atajo de teclado para modo presentador
document.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') {
        if (!imageModal.classList.contains('active')) {
            e.preventDefault();
            togglePresenterMode();
        }
    }
});

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicializa todos los componentes de la presentación
 */
function initPresentation() {
    // Actualizar slides inicialmente
    updateSlides();
    
    // Configurar animaciones
    setupScrollAnimations();
    
    // Mensaje de bienvenida en consola
    console.log('%c🍽️ Recetas Del Mundo - Presentación', 'color: #667EEA; font-size: 20px; font-weight: bold;');
    console.log('%cControles de navegación:', 'color: #4A5568; font-size: 14px; font-weight: bold;');
    console.log('  → / Espacio : Siguiente slide');
    console.log('  ← : Slide anterior');
    console.log('  Home : Primera slide');
    console.log('  End : Última slide');
    console.log('  P : Activar/desactivar modo presentador');
    console.log('  ESC : Cerrar modal de imagen');
    console.log('\n%cHaz clic en las imágenes de diagramas para ampliarlas', 'color: #48BB78; font-style: italic;');
    
    // Verificar si el modo presentador está activo
    if (localStorage.getItem('presenterMode') === 'true') {
        togglePresenterMode();
    }
    
    // Agregar efecto pulse inicial
    setTimeout(() => {
        addPulseEffect();
    }, 1000);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentation);
} else {
    initPresentation();
}

// ============================================
// EXPORTAR FUNCIONES ÚTILES
// ============================================

window.SlidesPresentation = {
    goToSlide,
    nextSlide,
    previousSlide,
    togglePresenterMode,
    openImageModal,
    closeImageModal,
    getCurrentSlide: () => currentIndex + 1,
    getTotalSlides: () => slides.length,
    getProgress: () => ((currentIndex + 1) / slides.length) * 100
};
