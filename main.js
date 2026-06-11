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
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.05
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

    // Observer for Hola section animations (Text, Bubbles, Image Opacity)
    const holaSection = document.getElementById('hola-section');
    const holaText = document.getElementById('hola-text');
    const bubble1 = document.getElementById('bubble-1');
    const bubble2 = document.getElementById('bubble-2');
    const b1Inner = document.getElementById('bubble-1-inner');
    const b2Inner = document.getElementById('bubble-2-inner');
    const profileImageContainer = document.getElementById('profile-image-container');

    if (holaSection && holaText && bubble1 && bubble2 && profileImageContainer) {
        const holaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Show text
                    holaText.classList.remove('opacity-0', '-translate-x-20');
                    holaText.classList.add('opacity-100', 'translate-x-0');

                    // Image opacity on mobile
                    profileImageContainer.classList.remove('opacity-40');
                    profileImageContainer.classList.add('opacity-100');

                    // Swap bubbles
                    bubble1.classList.add('swapped');
                    bubble2.classList.add('swapped');

                    // Color bubbles
                    if(b1Inner) {
                        b1Inner.classList.remove('bg-white/10', 'border-white/20', 'text-gray-400');
                        b1Inner.classList.add('bg-cyber-purple/20', 'border-cyber-purple/50', 'text-white', 'shadow-[0_0_20px_rgba(147,51,234,0.4)]');
                    }
                    if(b2Inner) {
                        b2Inner.classList.remove('bg-white/10', 'border-white/20', 'text-gray-400');
                        b2Inner.classList.add('bg-cyber-red/20', 'border-cyber-red/50', 'text-white', 'shadow-[0_0_20px_rgba(236,72,153,0.4)]');
                    }
                } else {
                    // Hide text
                    holaText.classList.remove('opacity-100', 'translate-x-0');
                    holaText.classList.add('opacity-0', '-translate-x-20');

                    // Revert Image opacity on mobile
                    profileImageContainer.classList.add('opacity-40');
                    profileImageContainer.classList.remove('opacity-100');

                    // Reset bubbles
                    bubble1.classList.remove('swapped');
                    bubble2.classList.remove('swapped');

                    // Reset bubble colors
                    if(b1Inner) {
                        b1Inner.classList.add('bg-white/10', 'border-white/20', 'text-gray-400');
                        b1Inner.classList.remove('bg-cyber-purple/20', 'border-cyber-purple/50', 'text-white', 'shadow-[0_0_20px_rgba(147,51,234,0.4)]');
                    }
                    if(b2Inner) {
                        b2Inner.classList.add('bg-white/10', 'border-white/20', 'text-gray-400');
                        b2Inner.classList.remove('bg-cyber-red/20', 'border-cyber-red/50', 'text-white', 'shadow-[0_0_20px_rgba(236,72,153,0.4)]');
                    }
                }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

        holaObserver.observe(holaSection);
    }
});
