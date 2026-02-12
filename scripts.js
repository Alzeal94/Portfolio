// --- 1. IMPORTACIONES PARA THREE.JS ---
import * as THREE from "https://unpkg.com/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.129.0/examples/jsm/controls/OrbitControls.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- INICIALIZACIÓN GENERAL ---
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  } // --- LÓGICA PARA MODO CLARO/OSCURO ---

  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon",
  );

  if (
    localStorage.getItem("theme") === "light" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: light)").matches)
  ) {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    if (themeToggleLightIcon) themeToggleLightIcon.classList.remove("hidden");
  } else {
    document.documentElement.classList.add("dark");
    if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      themeToggleDarkIcon.classList.toggle("hidden");
      themeToggleLightIcon.classList.toggle("hidden");
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    });
  } // --- LÓGICA PARA HEADER AL HACER SCROLL ---

  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });
  } // --- LÓGICA PARA EL MENÚ DE HAMBURGUESA ---

  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuButton = document.getElementById("close-menu-button");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
  };

  if (hamburgerButton) hamburgerButton.addEventListener("click", toggleMenu);
  if (closeMenuButton) closeMenuButton.addEventListener("click", toggleMenu);
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileMenu.classList.contains("hidden")) {
        toggleMenu();
      }
    });
  }); // --- LÓGICA PARA ANIMACIÓN DE ENTRADA AL HACER SCROLL ---

  const sections = document.querySelectorAll(".fade-in-section");
  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    sections.forEach((section) => observer.observe(section));
  } // --- LÓGICA PARA SCROLL SUAVE Y ENLACE ACTIVO ---

  const navLinks = document.querySelectorAll(".nav-link");
  const pageSections = document.querySelectorAll("main section");

  const activateLink = (id) => {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-30% 0px -70% 0px" },
  );

  pageSections.forEach((section) => sectionObserver.observe(section));

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
    });
  }); // --- MEJORA: BOTÓN "VOLVER ARRIBA" ---

  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) backToTopButton.classList.remove("hidden");
      else backToTopButton.classList.add("hidden");
    });
    backToTopButton.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  } // --- MEJORA: MODAL DE PROYECTOS ---

  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModalButton = document.getElementById("close-modal-button");

  const projectData = {
    petsafe: {
      title: "PetSafe",
      img: "img/todas.png",
      tags: ["JavaFX", "JavaScript", "MySQL", "HTML5", "CSS3"],
      problem: "La gestión de animales perdidos es desorganizada.",
      solution: "Desarrollamos una App centralizada en JavaFX.",
      githubLink: "https://github.com/Alzeal94/PetSafe",
    },
    alzimatic: {
      title: "Gestor de Incidencias (Alzimatic)",
      img: "img/inicioQr.png",
      tags: ["HTML5", "JavaScript", "Node.js", "CSS3", "MySQL"],
      problem: "Reporte de incidencias ineficiente.",
      solution: "Aplicación web completa con backend en Node.js.",
      githubLink: "https://github.com/Alzeal94/APP-WEB-INCIDENCIAS",
    },
    viajeros: {
      title: "Próximo Proyecto",
      img: "https://placehold.co/600x400/FF4500/FFFFFF?text=Concepto",
      tags: [""],
      problem: "",
      solution: "",
      githubLink: "#",
    },
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.dataset.project;
      const data = projectData[projectId];
      if (data) {
        document.getElementById("modal-title").textContent = data.title;
        document.getElementById("modal-img").src = data.img;
        document.getElementById("modal-problem").textContent = data.problem;
        document.getElementById("modal-solution").textContent = data.solution;
        document.getElementById("modal-github-link").href = data.githubLink;
        const tagsContainer = document.getElementById("modal-tags");
        tagsContainer.innerHTML = "";
        data.tags.forEach((tag) => {
          const span = document.createElement("span");
          span.className = "tag text-xs font-semibold px-2.5 py-1 rounded-full";
          span.textContent = tag;
          tagsContainer.appendChild(span);
        });
        modal.classList.remove("hidden");
        setTimeout(() => modalContent.classList.add("open"), 10);
        document.body.classList.add("overflow-hidden");
      }
    });
  });

  const closeModal = () => {
    modalContent.classList.remove("open");
    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }, 300);
  };

  if (closeModalButton) closeModalButton.addEventListener("click", closeModal);
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target.id === "project-modal") closeModal();
    }); // --- MEJORA: ANIMACIÓN DE TIPEO ---

  if (document.getElementById("typed-subtitle")) {
    new Typed("#typed-subtitle", {
      strings: [
        "Desarrollador de Aplicaciones Multiplataforma.",
        "Soluciones intuitivas para iOS, Android y la Web.",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 2000,
      loop: true,
    });
  } // --- MEJORA: ENVÍO DE FORMULARIO ---

  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(contactForm);
      fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      }).then((response) => {
        if (response.ok) {
          formFeedback.innerHTML =
            '<p class="text-green-500">¡Mensaje enviado!</p>';
          contactForm.reset();
        } else {
          formFeedback.innerHTML = '<p class="text-red-500">Hubo un error.</p>';
        }
      });
    });
  } // --- INICIALIZAR COMPONENTES ADICIONALES ---

  initConway();
  initSnake3D();
});

// ==========================================
// LÓGICA DE LA SERPIENTE 3D (THREE.JS)
// ==========================================
function initSnake3D() {
  const container = document.getElementById("container3D");
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(
    20,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );
  const baseCamPos = new THREE.Vector3(2.6, 1.9, 4.2);
  camera.position.copy(baseCamPos);
  camera.lookAt(0, 0.5, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement); // Parallax del mouse

  let cursorX = 0,
    cursorY = 0;
  window.addEventListener("pointermove", (e) => {
    cursorX = (e.clientX / window.innerWidth - 0.5) * 4;
    cursorY = (e.clientY / window.innerHeight - 0.5) * 4;
  }); // Luces

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(-4, 10, 4);
  scene.add(dirLight); // Variables para alternar partículas

  let loadedModel = null;
  let particlePoints = null;
  let showingParticles = false;
  const sweepColorA = new THREE.Color(0x1a0033);
  const sweepColorB = new THREE.Color(0xd40000);
  const _tmpColor = new THREE.Color();

  const loader = new GLTFLoader();
  loader.load("./models/snakeVoxels.gltf", (gltf) => {
    loadedModel = gltf.scene;
    loadedModel.scale.set(0.1, 0.1, 0.1);
    scene.add(loadedModel); // Generar Partículas

    const positions = [];
    loadedModel.traverse((child) => {
      if (child.isMesh) {
        const posAttr = child.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          let v = new THREE.Vector3()
            .fromBufferAttribute(posAttr, i)
            .applyMatrix4(child.matrixWorld);
          positions.push(v.x * 0.1, v.y * 0.1, v.z * 0.1);
        }
      }
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(positions.length), 3),
    );

    particlePoints = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: false,
        opacity: 1,
        blending: THREE.NormalBlending,
      }),
    );
    particlePoints.visible = false;
    scene.add(particlePoints); // Evento del botón de partículas

    document
      .getElementById("toggleParticles")
      ?.addEventListener("click", (e) => {
        showingParticles = !showingParticles;
        loadedModel.visible = !showingParticles;
        particlePoints.visible = showingParticles;
        e.target.textContent = showingParticles
          ? "Ver geometría"
          : "Ver partículas";
      });
  });

  function animate() {
    requestAnimationFrame(animate);

    if (showingParticles && particlePoints) {
      const time = performance.now() * 0.001;
      const colors = particlePoints.geometry.attributes.color;
      for (let i = 0; i < colors.count; i++) {
        const t = (Math.sin(i * 0.01 + time * 2) + 1) / 2;
        _tmpColor.copy(sweepColorA).lerp(sweepColorB, t);
        colors.setXYZ(i, _tmpColor.r, _tmpColor.g, _tmpColor.b);
      }
      colors.needsUpdate = true;
    } // Efecto Parallax suave

    camera.position.x +=
      (baseCamPos.x + cursorX * 0.5 - camera.position.x) * 0.05;
    camera.position.y +=
      (baseCamPos.y - cursorY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0.5, 0);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// ==========================================
// LÓGICA CONWAY'S GAME OF LIFE
// ==========================================
function initConway() {
  const canvas = document.getElementById("golCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const toggleBtn = document.getElementById("golToggle");
  const randomBtn = document.getElementById("golRandom");
  const clearBtn = document.getElementById("golClear");
  const speedSlider = document.getElementById("golSpeed");

  const CELL = 8;
  let cols, rows, grid, next;

  function idx(x, y) {
    return y * cols + x;
  }

  function resizeCanvasToCSS() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(320, Math.floor(rect.width * dpr));
    canvas.height = Math.max(200, Math.floor(rect.height * dpr));
    cols = Math.floor(canvas.width / CELL);
    rows = Math.floor(canvas.height / CELL);
    grid = new Uint8Array(cols * rows);
    next = new Uint8Array(cols * rows);
    randomize(0.18);
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(102, 204, 255, 0.9)";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[idx(x, y)]) {
          ctx.fillRect(x * CELL, y * CELL, CELL - 1, CELL - 1);
        }
      }
    }
  }

  function step() {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let n = 0;
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            if (ox === 0 && oy === 0) continue;
            const xx = x + ox,
              yy = y + oy;
            if (xx < 0 || yy < 0 || xx >= cols || yy >= rows) continue;
            n += grid[idx(xx, yy)];
          }
        }
        const alive = grid[idx(x, y)] === 1;
        next[idx(x, y)] =
          (alive && (n === 2 || n === 3)) || (!alive && n === 3) ? 1 : 0;
      }
    }
    const tmp = grid;
    grid = next;
    next = tmp;
  }

  function randomize(p = 0.2) {
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < p ? 1 : 0;
    draw();
  }

  let painting = false;
  let paintValue = 1;
  function cellFromEvent(e) {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = Math.floor(((e.clientX - r.left) * dpr) / CELL);
    const y = Math.floor(((e.clientY - r.top) * dpr) / CELL);
    return { x, y };
  }

  canvas.addEventListener("pointerdown", (e) => {
    painting = true;
    canvas.setPointerCapture(e.pointerId);
    const { x, y } = cellFromEvent(e);
    if (x < 0 || y < 0 || x >= cols || y >= rows) return;
    const i = idx(x, y);
    paintValue = e.shiftKey ? 1 : grid[i] ? 0 : 1;
    grid[i] = paintValue;
    draw();
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!painting) return;
    const { x, y } = cellFromEvent(e);
    if (x < 0 || y < 0 || x >= cols || y >= rows) return;
    grid[idx(x, y)] = paintValue;
    draw();
  });

  canvas.addEventListener("pointerup", () => (painting = false));

  let running = false;
  let fps = Number(speedSlider?.value ?? 12);
  let acc = 0;
  function loop(ts) {
    requestAnimationFrame(loop);
    if (!running) return;
    const dt = Math.min(0.05, (ts - (loop._last || ts)) / 1000);
    loop._last = ts;
    acc += dt;
    const stepEvery = 1 / fps;
    while (acc >= stepEvery) {
      step();
      acc -= stepEvery;
    }
    draw();
  }
  requestAnimationFrame(loop);

  toggleBtn?.addEventListener("click", () => {
    running = !running;
    toggleBtn.textContent = running ? "Pausa" : "Reanudar";
  });
  randomBtn?.addEventListener("click", () => randomize(0.2));
  clearBtn?.addEventListener("click", () => {
    grid.fill(0);
    draw();
  });
  speedSlider?.addEventListener(
    "input",
    () => (fps = Number(speedSlider.value)),
  );

  window.addEventListener("resize", resizeCanvasToCSS);
  resizeCanvasToCSS();

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      running = !running;
      if (toggleBtn) toggleBtn.textContent = running ? "Pausa" : "Reanudar";
    }
  });
}
