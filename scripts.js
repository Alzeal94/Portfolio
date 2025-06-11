document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZACIÓN GENERAL ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- LÓGICA PARA MODO CLARO/OSCURO ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (localStorage.getItem('theme') === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.add('dark');
        if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- LÓGICA PARA HEADER AL HACER SCROLL ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
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
        document.body.classList.toggle('overflow-hidden');
    };
    
    if (hamburgerButton) hamburgerButton.addEventListener('click', toggleMenu);
    if (closeMenuButton) closeMenuButton.addEventListener('click', toggleMenu);
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // --- LÓGICA PARA ANIMACIÓN DE ENTRADA AL HACER SCROLL ---
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(section => observer.observe(section));
    }
    
    // --- LÓGICA PARA SCROLL SUAVE Y ENLACE ACTIVO ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('main section');

    const activateLink = (id) => {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    pageSections.forEach(section => sectionObserver.observe(section));
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- MEJORA: BOTÓN "VOLVER ARRIBA" ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopButton.classList.remove('hidden');
            else backToTopButton.classList.add('hidden');
        });
        backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // --- MEJORA: MODAL DE PROYECTOS ---
    // (Lógica del modal sin cambios)
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalButton = document.getElementById('close-modal-button');

    const projectData = {
        petsafe: {
            title: "PetSafe",
            img: "img/todas.png",
            tags: ['JavaFX', 'JavaScript', 'MySQL', 'HTML5', 'CSS3'],
            problem: "La gestión de animales perdidos y en adopción es un proceso a menudo desorganizado, dependiendo de redes sociales y protectoras locales con recursos limitados. Se necesitaba una herramienta centralizada.",
            solution: "Desarrollamos PetSafe, una aplicación de escritorio con JavaFX que proporciona una interfaz clara e intuitiva para que protectoras y usuarios puedan registrar, buscar y gestionar perfiles de animales, veterinarios y locales facilitando el reencuentro, la adopción y el cuidado de las mascotas.",
            githubLink: "https://github.com/Alzeal94/PetSafe"
        },
        alzimatic: {
            title: "Gestor de Incidencias (Alzimatic)",
            img: "img/inicioQr.png",
            tags: ['HTML5', 'JavaScript', 'Node.js', 'CSS3', 'MySQL'],
            problem: "Una empresa necesitaba un sistema interno para que sus empleados y clientes pudieran reportar y hacer seguimiento de las incidencias técnicas de forma eficiente, reemplazando el caótico sistema de correos y llamadas.",
            solution: "Creamos una aplicación web completa con un backend en Node.js y un frontend dinámico. El sistema permite a los usuarios registrar varios tipos de averías, a los administradores ver su estado en tiempo real y modificar o eliminar las averias, mejorando drásticamente el flujo de trabajo.",
            githubLink: "https://github.com/Alzeal94/APP-WEB-INCIDENCIAS"
        },
        viajeros: {
            title: "Proximo Proyecto",
            img: "https://placehold.co/600x400/FF4500/FFFFFF?text=Concepto",
            tags: [''],
            problem: "",
            solution: "",
            githubLink: "#"
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const data = projectData[projectId];
            if (data) {
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-img').src = data.img;
                document.getElementById('modal-problem').textContent = data.problem;
                document.getElementById('modal-solution').textContent = data.solution;
                document.getElementById('modal-github-link').href = data.githubLink;
                const tagsContainer = document.getElementById('modal-tags');
                tagsContainer.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full';
                    span.textContent = tag;
                    tagsContainer.appendChild(span);
                });
                modal.classList.remove('hidden');
                setTimeout(() => modalContent.classList.add('open'), 10);
                document.body.classList.add('overflow-hidden');
            }
        });
    });

    const closeModal = () => {
        modalContent.classList.remove('open');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    };

    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target.id === 'project-modal') closeModal();
    });

    // --- MEJORA: ANIMACIÓN DE TIPEO ---
    if (document.getElementById('typed-subtitle')) {
        new Typed('#typed-subtitle', {
            strings: ['Desarrollador de Aplicaciones Multiplataforma.', 'Construyo soluciones intuitivas para iOS, Android y la Web.'],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            loop: true
        });
    }

    // --- MEJORA: ENVÍO DE FORMULARIO CON AJAX ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const data = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    formFeedback.innerHTML = '<p class="text-green-500">¡Gracias por tu mensaje! Te responderé pronto.</p>';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formFeedback.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formFeedback.innerHTML = '<p class="text-red-500">Hubo un problema al enviar tu mensaje.</p>';
                        }
                    })
                }
            }).catch(error => {
                formFeedback.innerHTML = '<p class="text-red-500">Hubo un problema al enviar tu mensaje.</p>';
            });
        });
    }

});
