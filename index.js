$(document).on('DOMContentLoaded', function () {
  // wowjs
  new WOW().init();
  // topbar
  let swiperOptions = {
    speed: 10000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    loop: true,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    spaceBetween: 0,
    grabCursor: false,
    allowTouchMove: false
  };
  let topbar = new Swiper(".topbar .swiper", swiperOptions);

  // active link
  $(document).on('click', '.header .nav_link', function () {
    console.log(1);
    $('.header').find('.nav_link.active').removeClass('active');
    $(this).addClass('active')
  })
  // active link on mobile
  $(document).on('click', '#menu_mobile .nav_link', function () {
    console.log(1);
    $('#menu_mobile').find('.nav_link.active').removeClass('active');
    $(this).addClass('active')
  })
  $(window).on('resize', function () {
    if (window.innerWidth > 1149) {
      $('#menu_mobile,.cta_menu_mb.open').removeClass('open');
    }
  })
  $(window).on('load', function () {
    $('.header .header_wrap').addClass('open');
    $('.header .logo_brand').addClass('effect-running');
  });

  //  isotope  demos 
  let $grid = $("#demo_layout").isotope({
    itemSelector: ".isotope-item",
    layoutMode: "fitRows",
    filter: "*",
  });
  $("[filter-tabs]").on("click", "a.demos_tab_item", function (e) {
    e.preventDefault();
    $(this).parents('[filter-tabs]').find('a.demos_tab_item.active').removeClass('active')
    $(this).toggleClass('active')
    let filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });

  //  tabs_demos scroll

  $('#tabs_scroll').on('click', 'ul li .control-scroll', function () {
    $(this).parents('ul').find('.control-scroll.active').removeClass('active');
    $(this).addClass('active')
  })
  // scroll spy tabs_demos scroll
  const nav = document.querySelector('#tabs_scroll_wrap');
  const wrapper = document.querySelector('#tabs_scroll .wrapper')
  const h = document.documentElement;

  wrapper.addEventListener('scroll', function () {
    nav.scrollTo(nav.querySelector('.active').offsetLeft - 50, 0);
  });

  //  packery featured_packery
  $('#featured_packery').isotope({
    layoutMode: 'packery',
    itemSelector: '.item'
  });
  //  packery featured_packery
  $('#booster_packery').isotope({
    layoutMode: 'packery',
    itemSelector: '.item'
  });
  //  packery featured_packery
  $('#featured2_packery').isotope({
    layoutMode: 'packery',
    itemSelector: '.item'
  });

  // loadmore table
  if (window.innerWidth > 1149) {
    let rows = $('.tb_row').toArray();
    let index0 = 0;
    let in_space = 3;
    $('.tb_row').hide();
    $(rows.splice(index0, in_space)).show();
    $(document).on('click', '[table_loadmore]', function (e) {
      e.preventDefault();
      if (index0 < rows.length) {
        $(rows.splice(index0, in_space)).slideDown();
      } else {
        $(this).hide();
        $(this).parents('.pm').find('.container').addClass('loaded')
      }

    })
  }

  // slider real live

  let real_live_1 = new Swiper("#real_live_1", {
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    slidesPerView: 3,
    spaceBetween: 24,
    speed: 10000,
    grabCursor: true,
    mousewheelControl: true,
    keyboardControl: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      525: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1600: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    }
  });
  let real_live_2 = new Swiper("#real_live_2", {
    loop: true,
    direction: 'horizontal',
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: true,
      pauseOnMouseEnter: true
    },
    slidesPerView: 3,
    spaceBetween: 24,
    speed: 10000,
    grabCursor: true,
    mousewheelControl: true,
    keyboardControl: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      525: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1600: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    }
  });


  // video tes
  var vid_tes = new Swiper(".t_swiper", {
    effect: "slide",
    loop: false,
    effect: "flip",
    grabCursor: true,
    initialSlide: 1,
    allowTouchMove: false,
  });

  $(document).on('click', '.vt button', function () {
    $('.vt button.active').removeClass('active');
    vid_tes.slideTo($(this).data("index"));
    $(this).addClass('active')
  })

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  // sticky featured
  let header_height = $('header-custom').height();
  $('.featured .box_sticky').attr('style', `--header-height: ${header_height + 80}px;`)
})