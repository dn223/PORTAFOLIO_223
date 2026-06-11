document.addEventListener('DOMContentLoaded', () => {
    // Clone marquee items for infinite scroll and add hover listeners
    const marqueesContainers = document.querySelectorAll('.marquee-container');
    marqueesContainers.forEach(container => {
        const marquee = container.querySelector('.marquee-content');
        if (marquee) {
            // Clone the HTML inside the marquee
            const clone = marquee.innerHTML;
            marquee.innerHTML += clone;

            // Slow down animation on hover or touch
            const slowDown = () => {
                marquee.getAnimations().forEach(anim => anim.playbackRate = 0.3);
            };
            const speedUp = () => {
                marquee.getAnimations().forEach(anim => anim.playbackRate = 1);
            };

            container.addEventListener('mouseenter', slowDown);
            container.addEventListener('mouseleave', speedUp);
            container.addEventListener('touchstart', slowDown);
            container.addEventListener('touchend', speedUp);
        }
    });

    // Carousel logic
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        
        if (!inner || items.length === 0) return;

        let currentIndex = 0;

        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
            });
        }
    });

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-up').forEach(el => {
        observer.observe(el);
    });
});
