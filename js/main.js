;(function($){
    "use strict";
    //* Navbar Fixed  
    function navbarFixed(){
        if ( $('#header').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll){
                    $("#header").addClass("navbar_fixed");
                } else {
                    $("#header").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();

    //popup js
    var popup_video = $('.video_popup');
    if(popup_video.length){
        popup_video.magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    }
        
    
    
    
    /*---------------navbar js ---------------*/
    $('#header ul li a,.scrolls,.menu_top').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 75
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.close_icon').on('click', function() {
        $('.body_wrapper').removeClass('promotion').find('.promo_banner').css({
            top: '-80px',
            WebkitTransition : 'all 0.3s ease-in-out',
            MozTransition    : 'all 0.3s ease-in-out',
            MsTransition     : 'all 0.3s ease-in-out',
            OTransition      : 'all 0.3s ease-in-out',
            transition       : 'all 0.3s ease-in-out'
        });

         $('.body_wrapper').find('.navbar').css({
            top: '0px',
        });
        
    })
    /*---------------password popup js ---------------*/
    $('.btn-popup-password').on('click', function(event) {
        var th = $(this).attr("href");
        if ($('#password-popup-link').length) {
            $.magnificPopup.open({
                items: {
                    src: '#password-popup-link'
                },
                type: 'inline',
                mainClass: "t4s-password-popup mfp-zoom-in",
                closeMarkup: '<button type="button" class="mfp-close t4s-close"><svg class="t4smfp-icon-close" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>',
                closeBtnInside: true,
                callbacks: {
                    open: function () {
                        $(".mfp-content #password-popup-link").show(), $(".mfp-content #password-popup-link a").attr({ href: th });
                        $('.t4s-close').on('click',function(e){
                          e.preventDefault();
                          $.magnificPopup.close();
                        }); 
                    },
                },
            });
        }
        event.preventDefault();
    });
    
    /*=============================================== 
	       Parallax Init
	  ================================================*/
	if ($('#apps_craft_animation').length > 0 ) {
        $('#apps_craft_animation').parallax({
            scalarX: 10.0,
            scalarY: 0.0,
        }); 
	}
    
    function bodyScrollAnimation() {
        new WOW({
            animateClass: 'animated', // animation css class (default is animated)
            offset:       100,          // distance to the element when triggering the animation (default is 0)
            mobile:       false, 
            duration:     1000,
        }).init()
    }
    bodyScrollAnimation();
    
    
    $('.slick.marquee').slick({
        speed: 8000,
        autoplay: true,
        autoplaySpeed: 1000,
        centerMode: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
        initialSlide: 1,
        arrows: false,
        pauseOnHover:true,
        buttons: false
    });
    
    function slider(){
        $('.utility_slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '40px',
            arrows: false,
            dots: false,
            speed: 1000,
            autoplay: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 570,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '0px',
                    }
                }
            ]
        })
    }
    slider();
    
    function sliderTwo(){
        $('.shop_slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true
        })
    }
    sliderTwo();
    
    function BlogSlider(){
        $('.blog_slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrow: false,
            cssEase: 'linear',
            fade: true,
            infinite: true,
            prevArrow: ('.prev'),
            nextArrow: ('.next'),
        })
    }
    BlogSlider();
    
    
    function portfolioSlider(){
        $('.portfolio_slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrow: true,
            centerMode: true,
            centerPadding: '450px',
            speed: 800,
            autoplay: true,
            infinite: true,
            prevArrow: ('.prevs'),
            nextArrow: ('.nexts'),
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '250px',
                    }
            },
                {
                    breakpoint: 1008,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '150px',
                    }
            },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '50px',
                    }
            }
            ]
        })
    }
    portfolioSlider();
    
    
    function portfolioSliderTwo(){
        $('.portfolio_slider_two').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false,
            arrow: false,
            centerMode: true,
            centerPadding: '150px',
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerPadding: '100px',
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '150px',
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerPadding: '0px',
                    }
                },
                {
                    breakpoint: 577,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '0px',
                    }
                }
            ]
        })
    }
    portfolioSliderTwo();
    
    $('.testimonial_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        arrow: true,
        centerMode: true,
        centerPadding: '0px',
        speed: 1000,
        autoplay: true,
        infinite: true,
        lazyLoad:'ondemand',
        pauseOnHover:true,
        prevArrow: ('.tprevs'),
        nextArrow: ('.tnexts'),
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerPadding: '80px',
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                }
            }
        ]
    })

    // $(function() {
    //     var $el = $('.footer_part');
    //     $(window).on('scroll', function () {
    //         var scroll = $(document).scrollTop();
    //         $el.css({
    //             'background-position':'10% '+(+.4*scroll)+'px'
    //         });
    //     });
    // });
    
                     
    /*===========Portfolio isotope js===========*/
    function portfolioMasonry(){
        var portfolio = $(".faq_masonry");
        if( portfolio.length ){
            portfolio.imagesLoaded( function() {
              // images have loaded
                // Activate isotope in container
                portfolio.isotope({
//                    itemSelector: ".portfolio_item",
                    layoutMode: 'masonry',
                    filter:"*",
                    animationOptions :{
                        duration:1000
                    },
                    transitionDuration: '0.5s',
                    masonry: {
                       
                    }
                });
            })
        }
    }
    portfolioMasonry();

    var heading = $(".typed");
    if(heading.length){
        heading.typed({
            strings: ["Fashion", "Furniture", "Electronics"],
            // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
            stringsElement: null,
            typeSpeed: 100,
            startDelay: 500,
            backSpeed: 100,
            backDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: "|",
            attr: null,
            contentType: 'html',
            callback: function() {},
            preStringTyped: function() {},
            onStringTyped: function() {},
            resetCallback: function() {}
        });
    }
    
})(jQuery)