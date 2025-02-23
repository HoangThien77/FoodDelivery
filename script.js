$(document).ready(function() {
    // ===== Menu Toggle Functionality =====
    $('.menu-toggle').click(function(e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.nav-links').toggleClass('active');
    });

    $('.nav-links a').click(function() {
        $('.menu-toggle').removeClass('active');
        $('.nav-links').removeClass('active');
    });

    $(document).click(function(event) {
        const $navbar = $('.navbar');
        const $menuToggle = $('.menu-toggle');
        const $navLinks = $('.nav-links');
        
        if (!$navbar.is(event.target) && 
            !$navbar.has(event.target).length && 
            $navLinks.hasClass('active')) {
            $menuToggle.removeClass('active');
            $navLinks.removeClass('active');
        }
    });

    // ===== Categories Slider Functionality =====
    const categoryContainer = $('.category-container');
    const categories = $('.category');
    const prevButton = $('.nav-button.prev');
    const nextButton = $('.nav-button.next');
    const itemsToShow = 4;
    let currentIndex = 0;

    // Initial setup
    function initializeSlider() {
        categories.hide();
        categories.slice(currentIndex, currentIndex + itemsToShow).show().css('display', 'flex');
        updateButtons();
    }

    // Update button states
    function updateButtons() {
        prevButton.toggleClass('active', currentIndex > 0);
        nextButton.toggleClass('active', currentIndex + itemsToShow < categories.length);
        prevButton.prop('disabled', currentIndex === 0);
        nextButton.prop('disabled', currentIndex + itemsToShow >= categories.length);
    }

    // Handle next button click
    nextButton.click(function() {
        if (currentIndex + itemsToShow < categories.length) {
            categories.eq(currentIndex).fadeOut(300, function() {
                categories.eq(currentIndex + itemsToShow).fadeIn(300).css('display', 'flex');
                currentIndex += 1;
                updateButtons();
            });
        }
    });

    // Handle previous button click
    prevButton.click(function() {
        if (currentIndex > 0) {
            categories.eq(currentIndex + itemsToShow - 1).fadeOut(300, function() {
                categories.eq(currentIndex - 1).fadeIn(300).css('display', 'flex');
                currentIndex -= 1;
                updateButtons();
            });
        }
    });

    // ===== Responsive Handling =====
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.menu-toggle').removeClass('active');
            $('.nav-links').removeClass('active');
        } else {
            currentIndex = 0;
            initializeSlider();
        }
    });

    // ===== Animation Handling =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Initialize animations for all elements
    const animatedElements = document.querySelectorAll('.content-section, .category, .box, .card');
    animatedElements.forEach(element => observer.observe(element));

    // Initialize category animations and slider
    categories.each(function() {
        $(this).addClass('visible');
        observer.observe(this);
    });

    // Initialize the slider
    initializeSlider();

    // Commented out parallax effect code preserved for reference
    /*
    $(window).scroll(function() {
        const scrollPosition = $(window).scrollTop();
        $('#content-2 .soup-bowl').css('transform', `translateY(${scrollPosition * 0.1}px)`);
        $('#content-2 .soup-pot').css('transform', `translateY(${scrollPosition * 0.05}px)`);
        $('#content-2 .soup-bowl2').css('transform', `translateY(${scrollPosition * 0.08}px)`);
    });
    */
});