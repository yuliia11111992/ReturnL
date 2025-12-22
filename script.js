// Мобильное меню
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

burger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Закрытие меню при клике на ссылку
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Закрытие меню при клике вне его
document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !burger.contains(e.target) &&
    mobileMenu.classList.contains("active")
  ) {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Изменение навигации при скролле
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Обработка формы Hero
const heroForm = document.getElementById("hero-form");

heroForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Получаем данные формы
  const formData = new FormData(heroForm);
  const data = Object.fromEntries(formData);

  // Показываем уведомление об успешной отправке
  showNotification(
    "Спасибо за обращение! Мы свяжемся с вами в течение 2 часов.",
    "success"
  );

  // Очищаем форму
  heroForm.reset();

  // В реальном проекте здесь был бы AJAX-запрос на сервер
  console.log("Данные формы Hero:", data);
});

// Обработка формы контактов
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Получаем данные формы
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Показываем уведомление об успешной отправке
  showNotification(
    "Ваше сообщение отправлено! Мы ответим вам в ближайшее время.",
    "success"
  );

  // Очищаем форму
  contactForm.reset();

  // В реальном проекте здесь был бы AJAX-запрос на сервер
  console.log("Данные формы контактов:", data);
});

// Функция для показа уведомлений
function showNotification(message, type = "success") {
  // Создаем элемент уведомления
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Стили для уведомления
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === "success" ? "#00ff88" : "#ff4444"};
        color: #0a0e0f;
        padding: 1.2rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

  // Добавляем анимацию
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Добавляем уведомление на страницу
  document.body.appendChild(notification);

  // Удаляем через 5 секунд
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Анимация появления элементов при скролле
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

// Наблюдаем за карточками
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    ".about-card, .step-card, .review-card, .problem-item"
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });
});

// Валидация телефона
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    // Если начинается с 8, заменяем на 7
    if (value.startsWith("8")) {
      value = "7" + value.slice(1);
    }

    // Если не начинается с 7, добавляем
    if (value && !value.startsWith("7")) {
      value = "7" + value;
    }

    // Форматируем номер
    let formattedValue = "";
    if (value.length > 0) {
      formattedValue = "+7";
      if (value.length > 1) {
        formattedValue += " (" + value.substring(1, 4);
      }
      if (value.length >= 5) {
        formattedValue += ") " + value.substring(4, 7);
      }
      if (value.length >= 8) {
        formattedValue += "-" + value.substring(7, 9);
      }
      if (value.length >= 10) {
        formattedValue += "-" + value.substring(9, 11);
      }
    }

    e.target.value = formattedValue;
  });

  // Автоматически добавляем +7 при фокусе, если поле пустое
  input.addEventListener("focus", (e) => {
    if (!e.target.value) {
      e.target.value = "+7";
    }
  });

  // Не даем удалить +7
  input.addEventListener("keydown", (e) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      e.target.value === "+7"
    ) {
      e.preventDefault();
    }
  });
});

// Счетчик для статистики (можно добавить анимацию цифр)
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Дополнительная безопасность форм
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    // Проверка на спам-ботов (простая проверка времени заполнения)
    const submitTime = new Date().getTime();
    const formLoadTime = form.dataset.loadTime || submitTime;
    const timeDiff = submitTime - formLoadTime;

    // Если форма заполнена менее чем за 2 секунды, возможно это бот
    if (timeDiff < 2000 && !form.dataset.loadTime) {
      console.warn("Подозрительно быстрая отправка формы");
    }
  });

  // Сохраняем время загрузки формы
  form.dataset.loadTime = new Date().getTime();
});

console.log("Return Legal - Юридическая помощь по возврату средств");
console.log("Сайт загружен успешно ✓");
