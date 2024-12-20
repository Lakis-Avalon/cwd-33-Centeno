document.addEventListener('DOMContentLoaded', function () {
    const snelems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(snelems);

    const sliderElem = document.querySelector('.slider');
    const sliderInstance = M.Slider.init(sliderElem, {
        fullWidth: true,
        indicators: false,
        interval: 10000,
        duration: 500
    });

    // Get all navigation tabs (left and right sides)
    const allNavLinks = Array.from(document.querySelectorAll('.nav-content a'));

    // Get the brand-logo separately
    const brandLogo = document.querySelector('.brand-logo');

    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    let currentSlide = 3; // Start at the 4th slide (index 3)

    // Helper function to show a specific slide
    function showSlide(index) {
        sliderInstance.set(index);

        allNavLinks.forEach((link, idx) => {
            const slideNumber = parseInt(link.getAttribute('data-slide'), 10) - 1;
            if (slideNumber === index) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });

        // Highlight brand-logo if its slide is active
        if (index === 3) {
            brandLogo.classList.add('active');
        } else {
            brandLogo.classList.remove('active');
        }

        currentSlide = index;
    }

    // Initialize by showing the default slide
    showSlide(currentSlide);

    // Event listener for navigation tabs
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const slideIndex = parseInt(link.getAttribute('data-slide'), 10) - 1;
            showSlide(slideIndex);
        });
    });

    // Event listener for brand-logo
    if (brandLogo) {
        brandLogo.addEventListener('click', (e) => {
            e.preventDefault();
            const slideIndex = parseInt(brandLogo.getAttribute('data-slide'), 10) - 1;
            showSlide(slideIndex);
        });
    }

    // Event listener for Previous button
    prevButton.addEventListener('click', () => {
        sliderInstance.prev();
    });

    // Event listener for Next button
    nextButton.addEventListener('click', () => {
        sliderInstance.next();
    });

});
