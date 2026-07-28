const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");

function closeMenu() {
  navToggle.classList.remove("active");
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  document.body.classList.toggle("menu-open", isOpen);
});

navAnchors.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720) {
    closeMenu();
  }
});

year.textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const senderName = formData.get("name").trim();
  const senderEmail = formData.get("email").trim();
  const projectType = formData.get("projectType");
  const message = formData.get("message").trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${senderName}`);
  const body = encodeURIComponent(
    `Name: ${senderName}\nEmail: ${senderEmail}\nProject type: ${projectType}\n\n${message}`
  );

  formStatus.textContent = "Opening your email app…";
  window.location.href = `mailto:hello@alexmorgan.dev?subject=${subject}&body=${body}`;

  window.setTimeout(() => {
    formStatus.textContent = "If your email app didn’t open, write to hello@alexmorgan.dev.";
  }, 1200);
});
