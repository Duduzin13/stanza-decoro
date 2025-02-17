// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Smooth Scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Fecha o menu mobile se estiver aberto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelectorAll('span').forEach(span => span.classList.remove('active'));
            }
        }
    });
});

// Formulário de Contato
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Aqui você pode adicionar a lógica para enviar os dados para um servidor
        console.log('Dados do formulário:', data);
        
        // Feedback visual para o usuário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
    });
}

// Animação de fade-in para elementos quando entram na viewport
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa elementos que devem ter animação
document.querySelectorAll('.service-card, .about-content, .contact-container, .partner-card, .review-card').forEach(el => {
    observer.observe(el);
});

// Header com fundo transparente que muda ao rolar
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    }
    
    if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Slider de Depoimentos
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentSlide = 0;

    function updateSlider() {
        testimonialsSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }

    // Auto-play do slider
    setInterval(nextSlide, 5000);
}


document.addEventListener("DOMContentLoaded", function () {
    let elements = document.querySelectorAll(".scroll-effect");

    function checkScroll() {
        let windowHeight = window.innerHeight;
        elements.forEach((el) => {
            let position = el.getBoundingClientRect().top;
            if (position < windowHeight - 50) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Executa ao carregar a página
});
