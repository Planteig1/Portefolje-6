
    const menuHamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav');

    menuHamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });