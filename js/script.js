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

   // Grab the theme toggle element
const themeToggle = document.getElementById('theme-toggle');
const icons = themeToggle.querySelectorAll('ion-icon');

// Restore saved theme on load
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Add event listener for theme toggle
themeToggle.addEventListener('click', () => {
    // Add animation to icons
    icons.forEach((icon) => {
        if (!icon.classList.contains('icon-animate')) {
            icon.classList.add('icon-animate');

            icon.addEventListener('animationend', () => {
                icon.classList.remove('icon-animate');
            }, { once: true });
        }
    });

    // Toggle the theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);

    // Save the theme to localStorage
    localStorage.setItem('theme', newTheme);
});


    function showModal(message) {
        const modal = document.getElementById('customModal');
        const modalMessage = document.getElementById('modalMessage');
        modalMessage.textContent = message;
        modal.style.display = 'block';
        
        // Menutup modal dengan klik tombol close
        const closeButton = modal.querySelector('.close-button');
        closeButton.onclick = function() {
            modal.style.display = 'none';
        }
        
        // Menutup modal dengan klik tombol Kembali
        const modalButton = modal.querySelector('.modal-button');
        modalButton.onclick = function() {
            modal.style.display = 'none';
        }
        
        // Menutup modal dengan klik di luar modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
    
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            showModal(`Section "${sectionId}" belum tersedia saat ini. Kami sedang dalam proses pengembangan.`);
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
            typingDelay = 500;
        }

        setTimeout(typeText, isDeleting ? 100 : typingDelay);
    }

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
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            scrollToSection(sectionId);
    
            // Tutup menu di tampilan mobile
            if (menuIcon && navbar) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    });
});
// Form Contact
const contactForm = document.getElementById('contact-form');

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const sendOption = document.querySelector('input[name="send-option"]:checked').value;
    
    

     if (sendOption === 'whatsapp') {
        const whatsappNumber = "6285645128794";
        const whatsappMessage = `Nama: ${name}%0A${email ? 'Email: ' + email + '%0A' : ''}Pesan: ${message}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    } else {
        if (!isValidEmail(email)) {
            alert('Silakan masukkan alamat email yang valid.');
            return; 
        }
        const mailtoLink = `mailto:amigodd0@gmail.com?subject=Pesan dari ${name}&body=Nama: ${name}%0AEmail: ${email}%0A%0APesan:%0A${message}`;
        window.location.href = mailtoLink;
    }
    
    
    contactForm.reset();
});
