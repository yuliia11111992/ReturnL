// Мобильное меню
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

if (burger) {
  burger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
}

// Закрытие меню при клике на ссылку
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Обработка форм
const heroForm = document.getElementById("hero-form");
const contactForm = document.getElementById("contact-form");

if (heroForm) {
  heroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
    heroForm.reset();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Спасибо за сообщение! Мы ответим вам в течение 2 часов.");
    contactForm.reset();
  });
}

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Применяем анимацию к карточкам
const animateElements = document.querySelectorAll(
  ".about-card, .step-card, .review-card, .team-member"
);
animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});
