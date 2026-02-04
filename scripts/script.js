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