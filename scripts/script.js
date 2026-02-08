//for mute and unmute video icon
const mute = document.querySelector('.hero__icon.mute');
const unmute = document.querySelector('.hero__icon.unmute');
const video = document.querySelector('.hero__wrapper--video video');
const heroSection = document.querySelector('.hero');

//didnt noticed this earlier so eventually to fix that i did this
window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY > heroBottom - 100) {
        mute.style.visibility = 'hidden';
        unmute.style.visibility = 'hidden';
    } else {
        mute.style.visibility = 'visible';
        unmute.style.visibility = 'visible';
    }
});

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

// Carousel text update on slide change 
const carShowcase = document.getElementById('carShowcase');
const showcaseTitle = document.querySelector('.showcase__info--title');
const showcaseTagline = document.querySelector('.showcase__info--tagline');

// Function to update the car info text 
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

if (carShowcase) {
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
const hamburger1 = document.querySelector('.header__nav--hamburger1');
const hamburger2 = document.querySelector('.header__nav--hamburger2');
const carNightImages = document.querySelectorAll('.showcase__car--image.night');
const carDayImages = document.querySelectorAll('.showcase__car--image.day');

let isDayMode = false;

console.log('Toggle element found:', showcaseToggle);

if (showcaseToggle) {
    showcaseToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Toggle clicked!');
        isDayMode = !isDayMode;

        if (isDayMode) {
            // Switch to day mode
            dayIcon.style.opacity = '1';
            nightIcon.style.opacity = '0';
            dayBg.style.opacity = '1';
            nightBg.style.opacity = '0';
            logoLight.classList.remove('active');
            logoDark.classList.add('active');
            hamburger1.classList.add('day-mode');
            hamburger2.classList.add('day-mode');
            carDayImages.forEach(img => img.style.opacity = '1');
            carNightImages.forEach(img => img.style.opacity = '0');
        } else {
            // Switch to night mode
            nightIcon.style.opacity = '1';
            dayIcon.style.opacity = '0';
            nightBg.style.opacity = '1';
            dayBg.style.opacity = '0';
            logoDark.classList.remove('active');
            logoLight.classList.add('active');
            hamburger1.classList.remove('day-mode');
            hamburger2.classList.remove('day-mode');
            carNightImages.forEach(img => img.style.opacity = '1');
            carDayImages.forEach(img => img.style.opacity = '0');
        }
    });
}
else {
    console.log('Toggle element NOT found!');  //it was not working earlier so i used this to debug
}

//fix
const welcomeTagline = document.querySelector(".welcome__container--mid__wrapper-tagline");
const welcomeParagraph = document.querySelector(".welcome__container--mid__wrapper-paragraph");
welcomeTagline.addEventListener('scroll', () => {
    welcomeTagline.style.opacity = '0';
    welcomeParagraph.style.opacity = '1';
});

