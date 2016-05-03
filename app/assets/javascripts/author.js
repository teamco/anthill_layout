//= require jquery
//= require jquery_ujs
//= require data-confirm-modal
//= require scripts/core/lib/packages/bootstrap/bootstrap.min
//= require scripts/core/lib/packages/html2canvas.min
//= require scripts/core/lib/jquery/metis.menu/metisMenu.min
//= require scripts/core/lib/jquery/jquery.slimscroll.min

(function () {

    $(document).ready(function () {

        var $body = $('body');

        // Add body-small class if window less than 768px
        $body[($(this).width() < 769 ? 'add' : 'remove') + 'Class']('body-small');

        $('#side-menu').metisMenu();

        // Initialize slimscroll for right sidebar
        $('.sidebar-container').slimScroll({
            height: '100%',
            railOpacity: 0.4,
            wheelStep: 10
        });

        // Minimalize menu
        $('.navbar-minimalize').click(function () {
            $body.toggleClass("mini-navbar");
            SmoothlyMenu();
        });

        // Move modal to body
        // Fix Bootstrap backdrop issu with animation.css
        $('.modal').appendTo("body");

        // Full height of sidebar
        function fix_height() {
            var heightWithoutNavbar = $("body > #wrapper").height() - 61;
            $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

            var $pageWrapper = $('#page-wrapper'),
                $navBar = $('nav.navbar-default'),
                navbarHeigh = $navBar.height(),
                wrapperHeigh = $pageWrapper.height();

            if (navbarHeigh > wrapperHeigh) {
                $pageWrapper.css("min-height", navbarHeigh + "px");
            }

            if (navbarHeigh < wrapperHeigh) {
                $pageWrapper.css("min-height", $(window).height() + "px");
            }

            if ($body.hasClass('fixed-nav')) {
                $pageWrapper.css("min-height", $(window).height() - 60 + "px");
            }
        }

        fix_height();

        // Fixed Sidebar
        $(window).bind("load", function () {
            if ($body.hasClass('fixed-sidebar')) {
                $('.sidebar-collapse').slimScroll({
                    height: '100%',
                    railOpacity: 0.9
                });
            }
        });

        // Move right sidebar top after scroll
        $(window).scroll(function () {
            if ($(window).scrollTop() > 0 && !$body.hasClass('fixed-nav')) {
                $('#right-sidebar').addClass('sidebar-top');
            } else {
                $('#right-sidebar').removeClass('sidebar-top');
            }
        });

        $(window).bind("load resize scroll", function () {
            if (!$body.hasClass('body-small')) {
                fix_height();
            }
        });

        $("[data-toggle=popover]").popover();

        // Add slimscroll to element
        $('.full-height-scroll').slimscroll({
            height: '100%'
        });

        $(window).trigger('resize');
    });


// Minimalize menu when screen is less than 768px
    $(window).bind("resize", function () {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    });

// For demo purpose - animation css script
    function animationHover(element, animation) {
        element = $(element);
        element.hover(
            function () {
                element.addClass('animated ' + animation);
            },
            function () {
                //wait for animation to finish before removing classes
                window.setTimeout(function () {
                    element.removeClass('animated ' + animation);
                }, 2000);
            });
    }

    function SmoothlyMenu() {
        var $body = $('body');
        if (!$body.hasClass('mini-navbar') || $body.hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(500);
                }, 100);
        } else if ($body.hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(500);
                }, 300);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    }

})();