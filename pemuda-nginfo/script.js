AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

    function toggleDetail(el) {
    el.classList.toggle('active');
  }

let currentZoom = 1;

function openLightbox(src) {
  const img = document.getElementById("lightbox-img");
  img.src = src;
  currentZoom = 1;
  img.style.transform = `scale(${currentZoom})`;
  document.getElementById("lightbox").classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

function handleLightboxClick(event) {
  const img = document.getElementById("lightbox-img");
  const controls = event.target.closest("#lightbox-img, button");
  if (!controls) {
    closeLightbox();
  }
}

function zoomIn() {
  currentZoom += 0.1;
  applyZoom();
}

function zoomOut() {
  currentZoom = Math.max(0.5, currentZoom - 0.1);
  applyZoom();
}

function applyZoom() {
  const img = document.getElementById("lightbox-img");
  img.style.transform = `scale(${currentZoom})`;
}

// Auto close menu saat link diklik di mobile
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      menu.classList.add('hidden');
    }
  });
});

// Swiper update for better mobile responsiveness
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.5,
  spaceBetween: 16,
  breakpoints: {
    480: {
      slidesPerView: 2.2,
    },
    768: {
      slidesPerView: 4,
    },
  },
});