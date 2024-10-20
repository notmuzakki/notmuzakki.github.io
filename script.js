document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const skillBoxes = document.querySelectorAll('.skill-box');
    const typingTextElement = document.getElementById('typing-text');
    const words = [
        { text: "UNESA Student", color: "#FF5733" },
        { text: "Developer", color: "#33FF57" },
        { text: "Bug Hunter", color: "#3357FF" },
        { text: "Gamer", color: "#FF33F5" },
        { text: "Beginner Safety", color: "#33FFF5" }
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert(`Maaf, section "${sectionId}" belum tersedia saat ini. Kami sedang dalam proses pengembangan.`);
        }
    }

    function setActiveNavItem() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    function typeText() {
        const currentWord = words[wordIndex].text;
        const currentColor = words[wordIndex].color;
        
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        typingTextElement.style.color = currentColor;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 200;
        }

        setTimeout(typeText, isDeleting ? 100 : typingDelay);
    }

    typeText();
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });

    window.addEventListener('scroll', setActiveNavItem);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBox = entry.target;
                const percent = skillBox.getAttribute('data-percent');
                const color = skillBox.getAttribute('data-color');
                const percentBar = skillBox.querySelector('.skill-percentage');

                percentBar.style.width = percent;
                percentBar.style.backgroundColor = color;
                percentBar.style.transition = 'width 1s ease-in-out';

                observer.unobserve(skillBox);
            }
        });
    }, { threshold: 0.5 });

    skillBoxes.forEach(box => observer.observe(box));

    // Start the typing animation
    typeText();

    // Mobile menu toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('nav');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuIcon && navbar) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    });
});

// Fungsi untuk popup WhatsApp
const modal = document.getElementById("whatsapp-popup");
const btn = document.getElementById("whatsapp-button");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function sendMessageToWhatsapp(event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value;
    const pesan = document.getElementById("pesan").value;
    const whatsappNumber = "6285645128794";
    const url = `https://wa.me/${whatsappNumber}?text=Nama: ${nama}%0APesan: ${pesan}`;
    window.open(url, '_blank');
    modal.style.display = "none";
}
