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
  // // scroll spy tabs_demos scroll
  // const nav = document.querySelector('#tabs_scroll_wrap');
  // const wrapper = document.querySelector('#tabs_scroll .wrapper')
  // const h = document.documentElement;

  // wrapper.addEventListener('scroll', function () {
  //   nav.scrollTo(nav.querySelector('.active').offsetLeft - 50, 0);
  // });

  //  packery featured_packery
  // $('#featured_packery').isotope({
  //   layoutMode: 'packery',
  //   itemSelector: '.item'
  // });
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
        $(rows.splice(index0, 300)).slideDown();
      } else {
        $(this).hide();
        $(this).parents('.pm').find('.container .table_content').addClass('loaded')
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

  $('.featured .box_sticky').attr('style', `--header-height: ${header_height}px;`);
  // // Lấy ra phần tử mục tiêu
  // let targetElement = document.querySelector('.b_t_i');
  // let thresholds = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  // // Khởi tạo Intersection Observer với một callback
  // let observer = new IntersectionObserver(function (entries, observer) {
  //   entries.forEach(function (entry) {
  //     // Khi phần tử mục tiêu nằm trong tầm nhìn
  //     if (entry.isIntersecting) {
  //       let scalex = entry.intersectionRatio;
  //       let opacity = entry.intersectionRatio;
  //       entry.target.style.opacity = opacity;
  //       if (scalex <= 0.7) {
  //         return
  //       }
  //       entry.target.style.transform = `scale(${entry.intersectionRatio})`;
  //     }
  //   });
  // }, { threshold: thresholds, rootMargin: '-50px 0px' }); // threshold 0.5 có nghĩa là khi ít nhất 50% của phần tử nằm trong tầm nhìn

  // Bắt đầu theo dõi phần tử mục tiêu
  // observer.observe(targetElement);

  let box_anime = () => {
    const wrapper = document.getElementById('scrollWrapper');
    const boxes = document.querySelectorAll('.box-text');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When the wrapper is in view
          let tranx = Math.floor(Math.random() * entry.intersectionRatio * 500);
          boxes[0].style.transform = `translateX(${tranx}px)`;
          boxes[1].style.transform = `translateX(-${tranx}px)`;
          // boxes[2].style.transform = 'scale(1.6)';
          boxes[2].style.transform = `translateX(${tranx}px)`;
          boxes[3].style.transform = `translateX(-${tranx}px)`;
        } else {
          boxes[0].style.transform = `translateX(0)`;
          boxes[1].style.transform = `translateX(0)`;
          // boxes[2].style.transform = 'scale(0.6)';
          boxes[2].style.transform = `translateX(0)`;
          boxes[3].style.transform = `translateX(0)`;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(wrapper);
  }
  // box_anime();
})

// ==================
//    Modal popup
// ==================
const modalPopup = () => {
  $(document).on('click', '[m-modal] .box-popup_click', function (e) {
    e.preventDefault();
    let parent = $(this).parents('[m-modal]');
    let pop_item = {
      ratio: parent.find('.ratio').attr('style'),
      img: parent.find('[m-img]').attr('src'),
      title: parent.find('[m-title]').html(),
      content: parent.find('[m-body]').html()
    }
    // console.log(pop_item);
    contentModal(pop_item);
    openModal('.custom_modal')
  });
  $(document).on('click', '.custom_modal .overlay,.custom_modal .close-btn', function () {
    closeModal('.custom_modal')
  })
}
const openModal = (modal) => {
  $(modal).addClass('show');
}
const closeModal = (modal) => {
  $(modal).removeClass('show');
}
const contentModal = (content) => {
  let ratio = $('.custom_modal').find('.ratio');
  let img = $('.custom_modal').find('img');
  let title = $('.custom_modal').find('.title');
  let body_content = $('.custom_modal').find('.m-body');

  if (!content) {
    console.log("Modal: content is blank");
    return;
  }
  // ratio.attr('style',content.ratio)
  img.attr('src', `${content.img}`);
  title.html(content.title);
  body_content.html(content.content);
}
modalPopup()

// ==================
//    open popup link
// ==================

const openPopupLink = () => {
  let flag = false;

  $(document).on('click', '[openPopupLink] a', function (e) {
    if (flag == true) {
      return;
    }
    e.preventDefault();
    let url = $(this).attr('href');
    $('password-popup').addClass('open');
    $('password-popup button.view_now').attr('data-location', url);
    flag = true;
  })
}


openPopupLink();
