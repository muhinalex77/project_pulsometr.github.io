// $(document).ready(function() {
//     $('.carousel__inner').slick({
//         speed: 1200,
//         prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="img/icons/right.png"></button>',
//         slidesToShow: 1,
//         adaptiveHeight: false,
//         responsive: [{
//                 breakpoint: 992,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: true,
//                     arrows: false
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     dots: true,
//                     arrows: false
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     dots: true,
//                     arrows: false
//                 }
//             }
//             // You can unslick at a given breakpoint now by adding:
//             // settings: "unslick"
//             // instead of a settings object
//         ]
//     });
// });



const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    controls: false,
    nav: false,
    dots: false,
    autoplay: false,
    autoplayButton: false,
    responsive: {
        1100: {
            autoWidth: true,
        }
    }

});
document.querySelector('.prev').addEventListener('click', function() {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function() {
    slider.goTo('next');
});

$(document).ready(function() {

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });



    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });


    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
    // smooth scroll and page up

    $("a[href^='#']").click(function() {
        var _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });


});