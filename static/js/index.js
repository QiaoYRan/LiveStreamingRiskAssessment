document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".navbar-burger");
  const navMenu = document.getElementById("mainNavbar");
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  const applyTheme = (darkMode) => {
    document.body.classList.toggle("dark-mode", darkMode);
    const icon = themeToggle?.querySelector("i");
    if (icon) {
      icon.className = darkMode ? "fas fa-sun" : "fas fa-moon";
    }
  };

  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("is-active");
      navMenu.classList.toggle("is-active");
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const darkMode = !document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", darkMode ? "dark" : "light");
      applyTheme(darkMode);
    });
  }

  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (burger && navMenu && navMenu.classList.contains("is-active")) {
        burger.classList.remove("is-active");
        navMenu.classList.remove("is-active");
      }
    });
  });

  const revealTargets = document.querySelectorAll(".reveal-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((target) => observer.observe(target));
});
