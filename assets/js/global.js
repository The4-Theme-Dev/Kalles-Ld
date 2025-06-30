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


class stickyBanner extends HTMLElement{
  constructor(){
    super();
    this.btn =this.querySelector('button.close');

    this.btn.addEventListener('click',()=>{
      this.querySelector('.banner-wrap').setAttribute('hide','')
      setTimeout(() => {
        this.setAttribute('hide','');
      }, 500);
    })
  }
}
customElements.define('sticky-banner',stickyBanner)

// ============================
//      big update popup
// ============================

class BigUpdatePopup extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>        
        .wrapper{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease, transform 0.8s ease;
          z-index: 888;
          opacity: 0;
        }
        
        slot[name="background"]{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .popup-content{
          opacity: 0;
          transform: translateY(80%);
          transition: opacity 0.5s ease 0.5s, transform 0.8s ease 0.5s;
        }
        
        button.close{
          position: absolute;
          top: var(--top,8vh);
          right: clamp(15px,5vw,77.5px);
          width: 16px;
          height: 16px;
          background: transparent;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          transition: opacity 0.3s ease, transform 0.6s ease;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.5s ease 0.8s, transform 0.6s ease 0.8s;
          &:hover{
            opacity: 0.8;
          }
        }
      </style>
      <div class="wrapper">
      <button class="close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5459 13.9541C15.7572 14.1654 15.876 14.4521 15.876 14.7509C15.876 15.0498 15.7572 15.3365 15.5459 15.5478C15.3346 15.7592 15.0479 15.8779 14.749 15.8779C14.4501 15.8779 14.1635 15.7592 13.9521 15.5478L7.99996 9.59375L2.0459 15.5459C1.83455 15.7573 1.54791 15.876 1.24902 15.876C0.950136 15.876 0.663491 15.7573 0.452147 15.5459C0.240802 15.3346 0.12207 15.0479 0.12207 14.7491C0.12207 14.4502 0.240803 14.1635 0.452147 13.9522L6.40621 8L0.454022 2.04594C0.242677 1.83459 0.123945 1.54795 0.123945 1.24906C0.123945 0.950177 0.242677 0.663532 0.454022 0.452188C0.665366 0.240843 0.95201 0.122111 1.2509 0.122111C1.54978 0.122111 1.83643 0.240843 2.04777 0.452188L7.99996 6.40625L13.954 0.45125C14.1654 0.239906 14.452 0.121174 14.7509 0.121174C15.0498 0.121174 15.3364 0.239906 15.5478 0.45125C15.7591 0.662594 15.8778 0.949239 15.8778 1.24813C15.8778 1.54701 15.7591 1.83366 15.5478 2.045L9.59371 8L15.5459 13.9541Z" fill="white" fill-opacity="0.64"/>
        </svg>
      </button>
      <slot name="background"></slot>
        <div class="popup-content">
          <slot name="body"></slot>
        </div>
      </div>
    `;
    
    // Định nghĩa các phần tử dùng chung một lần
    this.btn_close = this.shadowRoot.querySelector('button.close');
    this.overlay = this.shadowRoot.querySelector('slot[name="background"]');
    this.wrapper = this.shadowRoot.querySelector('.wrapper');
    this.popupContent = this.shadowRoot.querySelector('.popup-content');
    this.background = this.shadowRoot.querySelector('slot[name="background"]');
    this.header = document.querySelector('header-custom');
    this.topbar = document.querySelector('header');
    this.html = document.querySelector('html');
    
    this.init();
    this.setUpEventListeners();
  }
  static get observedAttributes() {
    return ['open'];
  }
  get Open(){
    return this.hasAttribute('open');
  }
  show(){
    const popupClosed = sessionStorage.getItem('popupClosed');
    if (popupClosed === 'true') {
      return;
    }
    this.animateOpen();
  }
  hide(){
     if(this.Open) {
      sessionStorage.setItem('popupClosed', 'true');
      this.animateClose();
     }
  }
  animateClose(){
    this.html.style.removeProperty('overflow');
    this.btn_close.style.setProperty('opacity', '0');
    this.btn_close.style.setProperty('transform', 'translateX(20px)');
    
    this.popupContent.style.setProperty('opacity', '0');
    this.popupContent.style.setProperty('transform', 'translateY(80%)');
    
    setTimeout(() => {
      this.background.style.setProperty('opacity', '0');
    }, 500);
    setTimeout(() => {
      this.wrapper.style.setProperty('opacity', '0');
      this.wrapper.style.setProperty('pointer-events', 'none');
      this.removeAttribute('open');
    }, 800);
    
    setTimeout(() => {
      this.wrapper.style.setProperty('display', 'none');
    }, 1100);

    this.removeZIndex();
  }
  animateOpen(){
    this.calcClose();
    this.html.style.setProperty('overflow', 'hidden');
    this.style.setProperty('display', 'block');
    this.wrapper.style.setProperty('display', 'flex');
    
    setTimeout(() => {
      this.setAttribute('open', '');
      this.wrapper.style.setProperty('opacity', '1');
      this.wrapper.style.setProperty('pointer-events', 'auto');
      
      this.background.style.setProperty('opacity', '1');
      
      setTimeout(() => {
        this.popupContent.style.setProperty('opacity', '1');
        this.popupContent.style.setProperty('transform', 'translateY(0)');
        
        setTimeout(() => {
          this.btn_close.style.setProperty('opacity', '1');
          this.btn_close.style.setProperty('transform', 'translateX(0)');
        }, 300);
      }, 500);
    }, 300);
  }
  calcClose(){
    this.header.style.setProperty('z-index', '1000');
    this.topbar.style.setProperty('z-index', '1000');
    let top = this.header.querySelector('.cta.light_skew');

    if(window.innerWidth < 767){
      this.wrapper.style.setProperty('--top',`10vh`);
    }else{
      this.wrapper.style.setProperty('--top',`${top.getBoundingClientRect().top + top.getBoundingClientRect().height + 30}px`);
    }
    
  }
  removeZIndex(){
    this.header.style.removeProperty('z-index');
    this.topbar.style.removeProperty('z-index');
  }
  setUpEventListeners(){
    this.btn_close.addEventListener('click',()=>{
      this.hide();
    })
    this.overlay.addEventListener('click',()=>{
      this.hide();
    })
  }
  init(){
    setTimeout(() => {
      this.show();
    }, 500);
  }
}
customElements.define('big-update-popup', BigUpdatePopup)