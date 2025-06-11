(function () {
  "use strict";

  // Toggle body class saat scroll
  function toggleScrolled() {
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    if (!header.classList.contains('scroll-up-sticky') &&
      !header.classList.contains('sticky-top') &&
      !header.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Toggle mobile nav
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToggle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  // Auto-hide mobile nav on link click
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) mobileNavToggle();
    });
  });

  // Dropdown in mobile nav
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  // Scroll-to-top button
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // AOS animation
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  // Swiper sliders (custom config)
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener('load', initSwiper);

  // GLightbox
  const glightbox = GLightbox({ selector: '.glightbox' });

  // Isotope layout
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let initIsotope;

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterBtn => {
      filterBtn.addEventListener('click', function () {
        isotopeItem.querySelector('.filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      });
    });
  });

  // FAQ toggle
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(faqItem => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  // Auto scroll to section if hash in URL
  window.addEventListener('load', () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const margin = parseInt(getComputedStyle(section).scrollMarginTop);
        window.scrollTo({ top: section.offsetTop - margin, behavior: 'smooth' });
      }, 100);
    }
  });

  // Nav scrollspy
  const navLinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})(); // End of main IIFE

// Swiper team slider
const teamSwiper = new Swiper('.team-slider', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  autoHeight: true, // ✅ PENTING untuk tinggi dinamis!
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 }
  }
});

// DOM Ready Extras (slick & toggle map & expandable desc)
document.addEventListener('DOMContentLoaded', function () {
  // Portfolio slider (Slick)
  if (document.querySelector('.portfolio-scroll')) {
    $('.portfolio-scroll').slick({
      autoplay: true,
      autoplaySpeed: 0,
      arrows: false,
      draggable: false,
      centerMode: false,
      infinite: true,
      cssEase: 'linear',
      pauseOnHover: false,
      variableWidth: true,
      dots: false,
      speed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnFocus: false
    });
  }

  // Toggle Map Button
  const toggleBtn = document.getElementById("toggleMapBtn");
  const mapContainer = document.getElementById("mapContainer");

  if (toggleBtn && mapContainer) {
    toggleBtn.addEventListener("click", function () {
      const isVisible = mapContainer.style.display === "block";
      mapContainer.style.display = isVisible ? "none" : "block";
      toggleBtn.innerText = isVisible
        ? "Lihat Lokasi Sekretariat"
        : "Tutup Peta Sekretariat";
    });
  }

  // Expandable deskripsi anggota (mobile only)
 document.querySelectorAll('.team-member').forEach(member => {
    const toggleBtn = member.querySelector('.toggle-more');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (window.innerWidth <= 768) {
        member.classList.toggle('active');

        // ✅ Update tinggi swiper setelah expand/collapse
        if (typeof teamSwiper !== 'undefined') {
          teamSwiper.updateAutoHeight();
        }
      }
    });
  });
});
