// Mute/Unmute Logic
const mute = document.querySelector('.hero__icon.mute');
const unmute = document.querySelector('.hero__icon.unmute');
const video = document.querySelector('.hero__wrapper--video video');
const heroSection = document.querySelector('.hero');

if (mute && unmute && video) {
    mute.addEventListener('click', () => {
        mute.style.opacity = '0';
        mute.style.pointerEvents = 'none';
        unmute.style.opacity = '1';
        unmute.style.pointerEvents = 'auto';
        video.muted = false;
        video.removeAttribute('controls');
    });

    unmute.addEventListener('click', () => {
        unmute.style.opacity = '0';
        unmute.style.pointerEvents = 'none';
        mute.style.opacity = '1';
        mute.style.pointerEvents = 'auto';
        video.muted = true;
        video.removeAttribute('controls');
    });
}
//swiper js
document.addEventListener('DOMContentLoaded', () => {
    const swiperElement = document.querySelector('.swiper');
    if (swiperElement && typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            centeredSlides: true,
            bgImage: true,
            breakpoints: {
                768: {
                    spaceBetween: 50,
                }
            }
        });
    }

    // Carousel Logic
    const carShowcase = document.getElementById('carShowcase');
    const showcaseTitle = document.querySelector('.showcase__info--title');
    const showcaseTagline = document.querySelector('.showcase__info--tagline');

    if (carShowcase) {
        const updateCarInfo = () => {
            const activeItem = carShowcase.querySelector('.carousel-item.active');
            if (activeItem) {
                const carName = activeItem.dataset.carName;
                const carTagline = activeItem.dataset.carTagline;

                if (showcaseTitle && carName) {
                    showcaseTitle.textContent = carName;
                }
                if (showcaseTagline && carTagline) {
                    showcaseTagline.textContent = carTagline;
                }
            }
        };

        const carousel = new bootstrap.Carousel(carShowcase);

        const autoSlide = () => {
            setTimeout(() => {
                carousel.next();
                autoSlide();
            }, 7000);
        };
        autoSlide();

        carShowcase.addEventListener('slid.bs.carousel', () => {
            updateCarInfo();
        });
    }

    // Day/Night Toggle functionality
    const showcaseToggle = document.querySelector('.showcase__toggle');
    const nightIcon = document.querySelector('.showcase__toggle--icon.night');
    const dayIcon = document.querySelector('.showcase__toggle--icon.day');
    const nightBg = document.querySelector('.showcase__bg--image.night');
    const dayBg = document.querySelector('.showcase__bg--image.day');
    const logoLight = document.querySelector('.header__nav--logo-main.logo-light');
    const logoDark = document.querySelector('.header__nav--logo-main.logo-dark');
    const hamburgerStrokes = document.querySelectorAll('.header__nav--hamburger-stroke');
    const carNightImages = document.querySelectorAll('.showcase__car--image.night');
    const carDayImages = document.querySelectorAll('.showcase__car--image.day');

    let isDayMode = false;

    if (showcaseToggle) {
        showcaseToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isDayMode = !isDayMode;

            if (isDayMode) {
                // Switch to day mode
                if (dayIcon) dayIcon.style.opacity = '1';
                if (nightIcon) nightIcon.style.opacity = '0';
                if (dayBg) dayBg.style.opacity = '1';
                if (nightBg) nightBg.style.opacity = '0';
                if (logoLight) logoLight.classList.remove('active');
                if (logoDark) logoDark.classList.add('active');
                hamburgerStrokes.forEach(stroke => stroke.classList.add('day-mode'));
                if (carDayImages) carDayImages.forEach(img => img.style.opacity = '1');
                if (carNightImages) carNightImages.forEach(img => img.style.opacity = '0');
            } else {
                // Switch to night mode
                if (nightIcon) nightIcon.style.opacity = '1';
                if (dayIcon) dayIcon.style.opacity = '0';
                if (nightBg) nightBg.style.opacity = '1';
                if (dayBg) dayBg.style.opacity = '0';
                if (logoDark) logoDark.classList.remove('active');
                if (logoLight) logoLight.classList.add('active');
                hamburgerStrokes.forEach(stroke => stroke.classList.remove('day-mode'));
                if (carNightImages) carNightImages.forEach(img => img.style.opacity = '1');
                if (carDayImages) carDayImages.forEach(img => img.style.opacity = '0');
            }
        });
    }

    // Welcome Section Transition
    const welcomeTagline = document.querySelector(".welcome__container--mid__wrapper-tagline");
    const welcomeParagraph = document.querySelector(".welcome__container--mid__wrapper-paragraph");
    if (welcomeTagline && welcomeParagraph) {
        welcomeTagline.addEventListener('scroll', () => {
            welcomeTagline.style.opacity = '0';
            welcomeParagraph.style.opacity = '1';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const targetSection = document.getElementById("hide-logo");
    if (targetSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.body.classList.add("third-section-active");
                    } else {
                        document.body.classList.remove("third-section-active");
                    }
                });
            },
            {
                threshold: 0.5
            }
        );
        observer.observe(targetSection);
    }

    const hamburger = document.querySelector('.header__nav--hamburger');
    const navModal = document.querySelector('.nav-modal');
    const body = document.body;

    if (hamburger && navModal) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navModal.classList.toggle('active');

            if (navModal.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    } else {
        console.warn('Hamburger or Nav Modal not found', { hamburger, navModal });
    }

    const navCarItems = document.querySelectorAll('.nav-modal__car-item');
    const navCarTitle = document.querySelector('.nav-modal__car-title-large');
    const navCarDesc = document.querySelector('.nav-modal__car-desc');
    const navCarImage = document.querySelector('.nav-modal__car-image');

    const carData = {
        'CYBERSTER': {
            desc: 'Meet the boldest expressions of MG innovation.',
            image: './media/cybie-header.webp',
            price: 'Ex-showroom price: ₹ 74,99,000'
        },
        'M9': {
            desc: 'Experience the pinnacle of luxury and comfort.',
            image: './media/m9-burger-menu.webp',
            price: 'Ex-showroom price: ₹ 70,90,000'
        }
    };

    if (navCarItems.length > 0) {
        navCarItems.forEach(item => {
            item.addEventListener('click', () => {
                navCarItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                const carName = item.querySelector('.nav-modal__car-name').textContent.trim();
                const data = carData[carName];

                if (data && navCarTitle && navCarDesc && navCarImage) {
                    navCarTitle.style.opacity = '0';
                    navCarDesc.style.opacity = '0';
                    navCarImage.style.opacity = '0';

                    setTimeout(() => {
                        navCarTitle.textContent = carName;
                        navCarDesc.textContent = data.desc;
                        navCarImage.src = data.image;

                        navCarTitle.style.opacity = '1';
                        navCarDesc.style.opacity = '1';
                        navCarImage.style.opacity = '1';
                    }, 300);
                }
            });
        });
    }

    if (navCarTitle) navCarTitle.style.transition = 'opacity 0.3s ease';
    if (navCarDesc) navCarDesc.style.transition = 'opacity 0.3s ease';
    if (navCarImage) navCarImage.style.transition = 'opacity 0.3s ease';
});
