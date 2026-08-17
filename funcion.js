document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.getElementById("menu-toggle");
  const navigation = document.getElementById("main-navigation");
  const navigationLinks = document.querySelectorAll(".site-nav a");
  const backToTopButton = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("main section[id]");

  // Abrir y cerrar el menú en celulares
  function toggleMenu() {
    const menuIsOpen = navigation.classList.toggle("is-open");

    menuButton.classList.toggle("is-active", menuIsOpen);
    document.body.classList.toggle("menu-open", menuIsOpen);

    menuButton.setAttribute("aria-expanded", String(menuIsOpen));
    menuButton.setAttribute(
      "aria-label",
      menuIsOpen ? "Cerrar menú" : "Abrir menú"
    );
  }

  // Cerrar el menú
  function closeMenu() {
    navigation.classList.remove("is-open");
    menuButton.classList.remove("is-active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", toggleMenu);

    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  // Cerrar el menú con la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Cerrar el menú si la pantalla vuelve a ser grande
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  // Cambios al desplazarse por la página
  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (header) {
      header.classList.toggle("is-scrolled", scrollPosition > 20);
    }

    if (backToTopButton) {
      backToTopButton.classList.toggle(
        "is-visible",
        scrollPosition > 600
      );
    }
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();

  // Botón para volver al inicio
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Marcar en el menú la sección que se está observando
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const currentSectionId = entry.target.id;

          navigationLinks.forEach((link) => {
            const linkDestination = link.getAttribute("href");
            const isCurrentSection =
              linkDestination === `#${currentSectionId}`;

            link.classList.toggle("is-current", isCurrentSection);

            if (isCurrentSection) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Animación suave de aparición para tarjetas y bloques
  const animatedElements = document.querySelectorAll(
    ".question-card, " +
    ".content-card, " +
    ".role-card, " +
    ".process-list article, " +
    ".tool-panel, " +
    ".honesty-card, " +
    ".gallery-grid figure, " +
    ".next-list article, " +
    ".people-grid > div"
  );

  if ("IntersectionObserver" in window) {
    const animationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("reveal-element");
      animationObserver.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("is-revealed");
    });
  }
});