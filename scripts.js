// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // Inicializar Lucide Icons
    // Comprobamos si lucide está disponible antes de llamarlo
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Script para animación de entrada al hacer scroll
    const sections = document.querySelectorAll('.fade-in-section');

    // Si no hay secciones que animar, no creamos el observer
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Opcional: deja de observar el elemento una vez que es visible
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // La animación se activa cuando el 10% del elemento es visible
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Script para scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
