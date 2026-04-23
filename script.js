// ── SOUNDSCAPE slideshow script ──

let slideIndex = 1;
let autoTimer;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    startAuto();
});

// If DOMContentLoaded already fired (inline script), run immediately
if (document.readyState !== 'loading') {
    showSlides(slideIndex);
    startAuto();
}

function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => plusSlides(1), 5000);
}

function plusSlides(n) {
    startAuto();
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    startAuto();
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');

    if (!slides.length) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    slides[slideIndex - 1].style.display = 'block';
    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
}

// Pause on hover
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.slideshow-container');
    if (!container) return;
    container.addEventListener('mouseenter', () => clearInterval(autoTimer));
    container.addEventListener('mouseleave', startAuto);
});