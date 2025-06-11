// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // Inicializar Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- LÓGICA PARA HEADER AL HACER SCROLL ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Añade la clase después de scrollear 50px
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // --- LÓGICA PARA EL MENÚ DE HAMBURGUESA ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        // Previene el scroll del body cuando el menú está abierto
        document.body.classList.toggle('overflow-hidden');
    };
    
    // Abrir menú con el botón de hamburguesa
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', toggleMenu);
    }

    // Cerrar menú con el botón de la 'X'
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', toggleMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace del menú
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });
    // --- FIN DE LA LÓGICA DEL MENÚ ---


    // Script para animación de entrada al hacer scroll
    const sections = document.querySelectorAll('.fade-in-section');

    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
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
