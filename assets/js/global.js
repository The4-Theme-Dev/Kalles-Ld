// ============================
// Header
// ============================
class Header extends HTMLElement {
  constructor() {
    super();
    this.config = JSON.parse(this.getAttribute('config'));
    this.cta_mb = this.querySelector('.cta_menu_mb');
    this.menu_mobile = document.querySelector('#menu_mobile');
    this.cta_close_mobile = document.querySelector('.cta_close_menu');
    if (!this.config) {
      return
    };
    if (this.config.isSticky) {
      this.stickyHeader();
    }
    if (this.config.isTransparent) {

      this.transparentHeader()
    }
    this.menuMobile();
  }
  menuMobile() {
    let overlay = this.menu_mobile.querySelector('.overlay');
    if (!this.cta_mb) {
      return;
    }
    if (!this.menu_mobile) {
      return;
    }
    if (!this.cta_close_mobile) {
      return
    }
    this.cta_mb.addEventListener('click', () => {
      // this.cta_mb.classList.toggle('open');
      this.menu_mobile.classList.toggle('open')
    })
    overlay.addEventListener('click', () => {
      // this.cta_mb.classList.toggle('open');
      this.menu_mobile.classList.toggle('open')
    })
    this.cta_close_mobile.addEventListener('click', () => {
      // this.cta_mb.classList.toggle('open');
      this.menu_mobile.classList.toggle('open')
    })


  }
  stickyHeader() {

    if (!this.config) {
      return;
    }
    let self = this;
    window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 56 || document.documentElement.scrollTop > 56) {
        // console.log(self);
        self.classList.add('header-sticky')
      } else {
        self.classList.remove('header-sticky')
      }
    })
  }
  transparentHeader() {

    this.classList.add('header-transparent')
  }

}
customElements.define('header-custom', Header)



// ============================
// Banner tabs-builder
// ============================

class tabsBuilder extends HTMLElement {
  constructor() {
    super();
    this.tabs = this.querySelectorAll('.tab-item');
    if (!this.tabs) {
      return;
    }
    if (window.innerWidth < 992) {
      return;
    }
    this.paramsDesktop = {
      grabCursor: true,
      slidesPerView: 'auto',
      initialSlide: 0,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [180, 0, 0],
        },
        next: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [-180, 0, 0],
        },
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: false,
        clickable: true,
      },
      on: {
        init: function() {
          // console.log(" init");
        },
        update: function() {
          // console.log('update');
        }
      },
    }
    this.paramsMobile = {
      grabCursor: true,
      slidesPerView: 'auto',
      initialSlide: 1,
      centeredSlides: true,
      effect: "cards",
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: false,
        clickable: true,
      },
      cardsEffect: {
        perSlideOffset: 25,
        perSlideRotate: 15,
      },
      on: {
        init: function() {
          console.log(" init");
        },
        update: function() {
          console.log('update');
        }
      },
    }
    this.swiper = this.initSwiper(this.paramsDesktop);
    this.mySwiper = this.querySelector('.tab_content_inner.active .swiper').swiper;
    this.tabsList();
    this.tabscontent();
  }
  tabsList() {
    let self = this;
    this.tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        let tabs_active = self.querySelector('.tab-item.active');
        if (tabs_active) {
          tabs_active.classList.remove('active');
        }
        tab.classList.add('active');
        self.querySelector('.tab_content_inner.active').classList.remove('active');
        self.querySelector(`${tab.getAttribute('data-tab-trigger')}.tab_content_inner`).classList.add('active');
        // console.log(tab.getAttribute('data-tab-trigger'));
        let btn = self.querySelector('.tab_content_inner.active button.item.active');
        if (btn.getAttribute('aria-controls') == 'mobile') {
          self.swiper.destroy(true, true);
          self.swiper = self.initSwiper(self.paramsMobile);
          // self.swiper.slideTo(self.swiper.activeIndex, 2)
          // console.log(self.swiper);
        } else {
          self.swiper.destroy(true, true);
          self.swiper = self.initSwiper(self.paramsDesktop);
          // self.swiper.slideTo(self.swiper.activeIndex, 1)
          // console.log(self.swiper);
        }
      })
    })
  }
  tabscontent() {
    let self = this;
    let content_active = self.querySelector('.tab_content_inner.active');
    if (content_active) {
      let btns = self.querySelectorAll('button.item');
      if (btns) {
        btns.forEach(btn => {
          btn.addEventListener('click', function() {

            self.querySelector('.tab_content_inner.active button.item.active').classList.remove('active');
            btn.classList.add('active');

            self.querySelector('.tab_content_inner.active .swiper').setAttribute('slider-type', btn.getAttribute('aria-controls'));

            if (btn.getAttribute('aria-controls') == 'mobile') {
              self.swiper.destroy(true, true);
              self.swiper = self.initSwiper(self.paramsMobile);
              // self.swiper.slideTo(self.swiper.activeIndex, 2)
              // console.log(self.swiper);
            } else {
              self.swiper.destroy(true, true);
              self.swiper = self.initSwiper(self.paramsDesktop);
              // self.swiper.slideTo(self.swiper.activeIndex, 1)
              // console.log(self.swiper);
            }
          })
        })
      }
    }
  }
  initSwiper(params) {
    return new Swiper('.tab_content_inner.active .swiper', params);
  }

}
customElements.define('tabs-builder', tabsBuilder)

// ============================
// video custom
// ============================

// structor
// <video-custom config='{"time_start": 0}'>
//  html
//</video-custom>
class customVideo extends HTMLElement {
  constructor() {
    super();
    this.config = JSON.parse(this.getAttribute('config'));
    if (!this.config) {
      // return;
    }
    this.starttime = this.config.time_start;
    this.video = this.querySelector('.video');
    this.endtime = this.video.duration;
    this.playVideo();
  }
  playVideo() {
    let self = this;
    self.video.addEventListener('ended', function() {
      self.video.currentTime = self.starttime;
      // console.log();
      self.video.play();
    });

  }

}
customElements.define('custom-video', customVideo)

// ============================
// Text typing
// ============================
class textTyping extends HTMLElement {
  constructor() {
    super();
    if(window.innerWidth < 767){
      // return;
    }
    // Initialize variables
    this.typeJsText = this.querySelector(".animatedText");
    this.stringIndex = 0; // Index of the current string in the array
    this.charIndex = 0; // Index of the current character in the current string
    this.isTyping = true; // Whether we are currently typing or erasing
    // Define an array of strings to be displayed and erased
    this.textArray = [
      "Christmas sale!",
      "Fashion trending 2024",
      "Kalles trending product"
      // Add more strings as needed
    ];
    // Set an interval to call the typeJs function
    setInterval(() => {
      this.typeJs();
    }, 100); // You can adjust the animation speed as needed
  }
  typeJs() {
    if (this.stringIndex < this.textArray?.length) {
      // Check if there are more strings to display or erase
      const currentString = this.textArray[this.stringIndex];

      if (this.isTyping) {
        // Typing animation
        if (this.charIndex < currentString.length) {
          this.typeJsText.innerHTML += currentString.charAt(this.charIndex);
          this.charIndex++;
        } else {
          this.isTyping = false; // Switch to erasing mode
        }
      } else {
        // Erasing animation
        if (this.charIndex > 0) {
          this.typeJsText.innerHTML = currentString.substring(0, this.charIndex - 1);
          this.charIndex--;
        } else {
          this.isTyping = true; // Switch back to typing mode
          this.stringIndex++; // Move to the next string

          if (this.stringIndex >= this.textArray.length) {
            this.stringIndex = 0; // Reset to the beginning of the array
          }

          this.charIndex = 0; // Reset character index
          this.typeJsText.innerHTML = ""; // Clear the content for the new string
        }
      }
    }
  }
}
customElements.define('text-typing', textTyping)


// ============================
// Partner section
// ============================

class partner extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('.pn_slider');
    this.tabs = this.querySelectorAll('[partner-tab-item]');
    if (!this.tabs) {
      return;
    }
    // this.initSlider();
    this.tabsAction();

  }
  initSlider() {
    return new Swiper(this.slider, {
      loop: true,
      // autoplay: {
      //   delay: 0,
      //   disableOnInteraction: false,
      // },
      // speed: 0,
      // slidesPerView: 'auto',
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
  tabsAction() {
    let self = this
    self.tabs.forEach(el => {

      el.addEventListener('click', () => {
        self.querySelector('[partner-tab-item].active').classList.remove('active');
        self.querySelector('.b_x_it.active').classList.remove('active')
        el.classList.add('active');
        self.querySelector(`${el.getAttribute('aria-controls')}`).classList.add('active')
      })
    })
  }
}
customElements.define('partner-custom', partner)



// ============================
// back to top section
// ============================

class backTop extends HTMLElement {
  constructor() {
    super();
    this.backtop();
  }
  backtop() {
    let self = this;
    window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        self.classList.add('show')
      } else {
        self.classList.remove('show')
      }
    });
    self.addEventListener('click', function() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    });
  }
}
customElements.define('back-top', backTop);

// ============================
// custom modal
// ============================
class passPopup extends HTMLElement {
  constructor() {
    super();
    this.overlay = this.querySelector('.overlay');
    this.btn_close = this.querySelector('button.close');
    this.view_now = this.querySelector('button.view_now');
    this.close();
  }
  close() {
    let self = this;
    this.overlay.addEventListener('click', () => {
      self.classList.remove('open');
    })
    this.btn_close.addEventListener('click', () => {
      self.classList.remove('open');
    })
    this.view_now.addEventListener('click', () => {
      self.classList.remove('open');
      if (self.view_now.getAttribute('data-location')) {
        window.open(self.view_now.getAttribute('data-location'), '_blank');
      }
    })
  }
}
customElements.define('password-popup', passPopup)