$(document).on('DOMContentLoaded', function() {
  // wowjs
  new WOW({
    mobile: true,
  }).init();
  // topbar

  
  
  // active link
  $(document).on('click', '.header .nav_link', function() {
    $('.header').find('.nav_link.active').removeClass('active');
    $(this).addClass('active')
  })

  // // active link on mobile
  $(document).on('click', '#menu_mobile .nav_link', function() {
    $('#menu_mobile').find('.nav_link.active').removeClass('active');
    $(this).addClass('active')
  })

  $(window).on('resize', function() {
    if (window.innerWidth > 1149) {
      $('#menu_mobile,.cta_menu_mb.open').removeClass('open');
    }
  })
  $(window).on('load', function() {
    $('header-custom').addClass('open');
    $('header-custom .logo_brand').addClass('effect-running');
  });

  //  isotope  demos 
  let $grid = $("#demo_layout").isotope({
    itemSelector: ".isotope-item",
    layoutMode: "fitRows",
    filter: "*",
  });
  $(document).on("click", "[filter-tabs] a.demos_tab_item", function(e) {
    e.preventDefault();
    $('[filter-tabs] a.demos_tab_item.active').removeClass('active')
    $(this).addClass('active')
    let filterValue = $(this).attr("data-filter");
    $grid.isotope({
      filter: filterValue
    });
  });

  //  tabs_demos scroll

  $(document).on('click', '#tabs_scroll ul li .control-scroll', function() {
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
    let in_space = 9;
    $('.tb_row').hide();
    $(rows.splice(index0, in_space)).show();
    $(document).on('click', '[table_loadmore]', function(e) {
      e.preventDefault();
      $(rows.splice(index0, 300)).slideDown();
      $(this).hide();
      $(this).parents('.pm').find('.container .table_content').addClass('loaded')
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

  $(document).on('click', '.vt button', function() {
    $('.vt button.active').removeClass('active');
    vid_tes.slideTo($(this).data("index"));
    $(this).addClass('active')
  })

  // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  // sticky featured
  let header_height = $('header-custom').height();

  $('.featured .box_sticky').attr('style', `--header-height: ${header_height + 10}px;`);
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


  // ==================
  //    Modal popup
  // ==================
  const modalPopup = () => {
    $(document).on('click', '[m-modal] .box-popup_click', function(e) {
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
    $(document).on('click', '.custom_modal .overlay,.custom_modal .close-btn', function() {
      closeModal('.custom_modal')
      resetModal();
    })
  }
  const openModal = (modal) => {
    $(modal).addClass('show');
  }
  const closeModal = (modal) => {
    $(modal).removeClass('show');
  }
  const contentModal = (content) => {
    // let ratio = $('.custom_modal').find('.ratio');
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
  const resetModal =()=>{
    let img = $('.custom_modal').find('img');
    img.attr('src','data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==')
  }
  modalPopup()

  // ==================
  //    open popup link
  // ==================

  const openPopupLink = () => {
    let flag = false
    $(document).on('click', '[openPopupLink] a', function(e) {

      let url = $(this).attr('href');
      $('password-popup button.view_now').attr('data-location', url);
      if(flag == true){
        return;
      }
      e.preventDefault();
      $('password-popup').addClass('open');
      flag= true;
    })
  }

  openPopupLink();


  // reveal when scroll clean text
  const rClear = () => {
    if (window.innerWidth < 1150) {
      return;
    }
    let reveals = document.querySelectorAll('[text-animate-reveal]');
    // attr parent
    $('[text-reaveals-parent]').css({
      'perspective': '700px',
      'transformStyle': 'preserve-3d',
      'perspectiveOrigin': '100% 0%'
    })
    if (window.innerWidth > 768) {
      $(window).on('scroll', function() {
        reveals.forEach((el, index) => {
          const windowHeight = window.innerHeight;
          const revealTop = el.getBoundingClientRect().top;
          const elHeight = $(this).height();
          const revealPoint = 150;
          // position & speed 

          // attr node
          el.style.transformOrigin = '50% 0';
          el.style.translate = 'none';
          el.style.rotate = 'none';
          el.style.scale = 'none';
          el.style.transition = 'transform .25s linear';
          el.style.willChange = 'transform';
          // console.log(revealTop > windowHeight - revealPoint);
          if (revealTop > windowHeight - revealPoint) {
            if (index == 0) {
              el.style.transform = `translateX(-8%)`;
            }
            if (index == 1) {

              el.style.transform = `scale(1)`;
            }
            if (index == 2) {
              el.style.transform = `translateX(4%)`;
            }
          }
          if (revealTop < windowHeight - revealPoint) {
            if (revealTop > -50) {
              let schemas = revealTop / windowHeight * 100;

              if (index == 0) {
                console.log();
                el.style.transform = `translateX(${-schemas / 10 + 0.55}%)`;
              }
              if (index == 2) {
                el.style.transform = `translateX(${schemas / 10 - 7}%)`;
              }

            } else {
              el.style.transform = `translate(0,0)`
            }
          }

        })
      })
    }
  }
  rClear();


})