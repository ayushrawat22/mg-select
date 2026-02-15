document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const headerNav = document.querySelector('.header__nav');
    const logoLight = document.querySelector('.header__nav--logo-main.logo-light');
    const logoDark = document.querySelector('.header__nav--logo-main.logo-dark');
    const hamburger = document.querySelector('.header__nav--hamburger');
    const hamburgerStrokes = document.querySelectorAll('.header__nav--hamburger-stroke');
    const navModal = document.querySelector('.nav-modal');

    const showcaseToggle = document.querySelector('.showcase__toggle');
    const nightIcon = document.querySelector('.showcase__toggle--icon.night');
    const dayIcon = document.querySelector('.showcase__toggle--icon.day');
    const nightBg = document.querySelector('.showcase__bg--image.night');
    const dayBg = document.querySelector('.showcase__bg--image.day');
    const carNightImages = document.querySelectorAll('.showcase__car--image.night');
    const carDayImages = document.querySelectorAll('.showcase__car--image.day');

    let isDayMode = false;

    //logo change whenstate change
    const updateLogo = (forceBlack = false) => {
        if (forceBlack || isDayMode) {
            logoLight?.classList.remove('active');
            logoDark?.classList.add('active');
            hamburgerStrokes.forEach(s => s.classList.add('day-mode'));
        } else {
            logoDark?.classList.remove('active');
            logoLight?.classList.add('active');
            hamburgerStrokes.forEach(s => s.classList.remove('day-mode'));
        }
    };

    // Intersection Observer for Sections 
    const sections = {
        hero: document.querySelector('.hero'),
        showcase: document.querySelector('.showcase'),
        welcome: document.querySelector('.welcome'),
        experience: document.querySelector('.experience'),
        history: document.querySelector('.history'),
        footer: document.querySelector('.footer-wrapper')
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const target = entry.target;

            if (target === sections.hero || target === sections.showcase) {
                headerNav.style.opacity = '1';
                headerNav.style.pointerEvents = 'auto';
                headerNav.style.visibility = 'visible';
                updateLogo(false);
            }

            if (target === sections.welcome) {
                headerNav.style.opacity = '0';
                headerNav.style.pointerEvents = 'none';
                headerNav.style.visibility = 'hidden';
            }


            if (target === sections.experience || target === sections.history) {
                headerNav.style.opacity = '1';
                headerNav.style.pointerEvents = 'auto';
                headerNav.style.visibility = 'visible';
                updateLogo(true);
            }

            if (target === sections.footer) {
                headerNav.style.opacity = '0';
                headerNav.style.pointerEvents = 'none';
                headerNav.style.visibility = 'hidden';
            }
        });
    }, { threshold: 0.2 });

    Object.values(sections).forEach(s => s && observer.observe(s));

    // Day/Night Toggle
    if (showcaseToggle) {
        showcaseToggle.addEventListener('click', (e) => {
            e.preventDefault();
            isDayMode = !isDayMode;

            if (isDayMode) {
                if (dayIcon) dayIcon.style.opacity = '1';
                if (nightIcon) nightIcon.style.opacity = '0';
                if (dayBg) dayBg.style.opacity = '1';
                if (nightBg) nightBg.style.opacity = '0';
                carDayImages.forEach(img => img.style.opacity = '1');
                carNightImages.forEach(img => img.style.opacity = '0');
            } else {
                if (nightIcon) nightIcon.style.opacity = '1';
                if (dayIcon) dayIcon.style.opacity = '0';
                if (nightBg) nightBg.style.opacity = '1';
                if (dayBg) dayBg.style.opacity = '0';
                carNightImages.forEach(img => img.style.opacity = '1');
                carDayImages.forEach(img => img.style.opacity = '0');
            }

            const rect = sections.showcase?.getBoundingClientRect() || sections.hero?.getBoundingClientRect();
            if ((rect && rect.top < window.innerHeight && rect.bottom > 0) &&
                !(sections.experience.getBoundingClientRect().top < window.innerHeight && sections.experience.getBoundingClientRect().bottom > 0)) {
                updateLogo(false);
            }
        });
    }

    // Hamburger
    if (hamburger && navModal) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navModal.classList.toggle('active');

            if (navModal.classList.contains('active')) {
                body.style.overflow = 'hidden';
                updateLogo(true);
            } else {
                body.style.overflow = '';
                const isDarkSection = (sections.experience.getBoundingClientRect().top < window.innerHeight && sections.experience.getBoundingClientRect().bottom > 0) ||
                    (sections.history.getBoundingClientRect().top < window.innerHeight && sections.history.getBoundingClientRect().bottom > 0);
                updateLogo(isDarkSection);
            }
        });
    }

    // Mute Logic
    const mute = document.querySelector('.hero__icon.mute');
    const unmute = document.querySelector('.hero__icon.unmute');
    const video = document.querySelector('.hero__wrapper--video video');

    if (mute && unmute && video) {
        mute.addEventListener('click', () => {
            mute.style.opacity = '0';
            mute.style.pointerEvents = 'none';
            unmute.style.opacity = '1';
            unmute.style.pointerEvents = 'auto';
            video.muted = false;
        });

        unmute.addEventListener('click', () => {
            unmute.style.opacity = '0';
            unmute.style.pointerEvents = 'none';
            mute.style.opacity = '1';
            mute.style.pointerEvents = 'auto';
            video.muted = true;
        });
    }

    // Nav Modal Car Logic
    const navCarItems = document.querySelectorAll('.nav-modal__car-item');
    const navCarTitle = document.querySelector('.nav-modal__car-title-large');
    const navCarDesc = document.querySelector('.nav-modal__car-desc');
    const navCarImage = document.querySelector('.nav-modal__car-image');

    const carData = {
        'CYBERSTER': {
            desc: 'Meet the boldest expressions of MG innovation.',
            image: './media/cybie-header.webp'
        },
        'M9': {
            desc: 'Meet the boldest expressions of MG innovation.',
            image: './media/m9-burger-menu.webp'
        }
    };

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

    // Swiper
    if (typeof Swiper !== 'undefined') {
        const historyEl = document.querySelector('.history-swiper');

        if (historyEl) {
            new Swiper(historyEl, {
                slidesPerView: 'auto',
                centeredSlides: true,
                loop: true,
                initialSlide: 2,
                spaceBetween: 60,
                speed: 700,
                grabCursor: false,
                watchSlidesProgress: true,
                slideToClickedSlide: true,

                breakpoints: {
                    768: { spaceBetween: 80 }
                }
            });
        }
    }

});


