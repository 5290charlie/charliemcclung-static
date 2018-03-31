$(document).ready(function () {

    /* Scroll hire me button to contact page */
    $('.hire-me').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    /* For Bootstrap current state on portfolio sorting */

    $('ul.nav-pills li a').click(function (e) {
        $('ul.nav-pills li.active').removeClass('active')
        $(this).parent('li').addClass('active')
    });

    /* portfolio mixitup */

    $(window).load(function () {
        var $container = $('.grid-wrapper');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.grid-controls li a').click(function () {
            $('.grid-controls .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

        $('#grid').find('.item').on('click', function () {
            if ($('.mfp-content').length > 0) {
                console.log('append');
                $('.mfp-content').append('<p>test</p>');
            } else {
                console.log('missing content');
            }
        });
    });


    /* Magnific Popup */
    $('.grid-wrapper').magnificPopup({
        delegate: 'a',
        type: 'iframe',
        gallery: {
            enabled: true
        }
    });

    $( window ).scroll(function() {
        $('#main-menu a').each(function(i, e) {
            if (window.pageYOffset >= document.getElementById(e.getAttribute('href').replace('#', '')).offsetTop) {
                $('#main-menu li').removeClass('active')
                $(this).closest('li').addClass('active')
            }
        })

        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('#main-menu li').removeClass('active')
            $('#main-menu li:last-child').addClass('active')
        }
    });

    /* Sticky menu */
    $(".navbar").sticky({topSpacing: 0});

    $('#main-menu a').on('click', function(e) {
        $('html, body').animate({
            scrollTop: ($($(this).attr('href')).offset().top)
        },500);
    });

    /* Scroll spy and scroll filter */
    // $('#main-menu').onePageNav({
    //     currentClass: "active",
    //     changeHash: false,
    //     scrollThreshold: 0.5,
    //     scrollSpeed: 750,
    //     filter: "",
    //     easing: "swing"
    // });

    /* Charts*/

    $('.chart').waypoint(function () {
        $(this).easyPieChart({
            barColor: '#3498db',
            size: '150',
            easing: 'easeOutBounce',
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
    }, {
        triggerOnce: true,
        offset: 'bottom-in-view'
    });


    /* VEGAS Home Slider */

    $.vegas('slideshow', {
        backgrounds: [

            { src: 'img/slider/cameronpass1.jpg', fade: 1000 },
            { src: 'img/slider/HARDWARE.jpg', fade: 1000 },
            { src: 'img/slider/nebula-space-wallpaper-1920x1080-red-nebula-space-2880x1800px-high-definition-wallpapers--space-shuttle.jpg', fade: 1000 },
            { src: 'img/slider/blocks-mathematics-wallpaper-camlib_blocks-mathematics_00259115.jpg', fade: 1000}
            // { src:'img/slider/04.jpg', fade:1000 }
        ]
    })('overlay', {
        src: 'img/overlays/16.png'
    });
    $("#vegas-next").click(function () {
        $.vegas('next');
    });
    $("#vegas-prev").click(function () {
        $.vegas('previous');
    });


    /*Contact form */
    $('#contact-form').on('submit', function () {
        var container = $('#contact-form-container');
        var oldHTML = container.html();
        container.find('button[type=submit]').html('<img src="img/loading.gif" />');

        $.ajax({
            url: 'contact.php',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    container.html('<h3>Thank you.</h3>');
                } else {
                    container.html(oldHTML);
                    container.find('.heading').text('Error, please try again.');

                    $.each(response.messages, function(index, msg) {
                        container.find('.heading').append('<p>'+msg+'</p>')
                    });
                }
            },
            error: function (response) {
                container.html(oldHTML);
                container.find('.heading').text('Error, please try again.')
                console.log(response);
            }
        });

        return false;
    }).validate({
        rules: {
            name: {
                minlength: 2,
                required: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                minlength: 2,
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            element.text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });
});
