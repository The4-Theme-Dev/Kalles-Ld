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
          z-index: 1000001;
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
    this.external_close = this.querySelector('button[name="close"]');
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
    
    // Reset fade effects
    this.resetFadeEffects();
    
    setTimeout(() => {
      this.background.style.setProperty('opacity', '0');
    }, 500);
    setTimeout(() => {
      this.wrapper.style.setProperty('opacity', '0');
      this.wrapper.style.setProperty('pointer-events', 'none');
      this.removeAttribute('open');
      this.removeZIndex();
    }, 800);
    
    setTimeout(() => {
      this.wrapper.style.setProperty('display', 'none');
    }, 1100);


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
        // Trigger fade effects after content is visible
        this.triggerFadeEffects();
        
        setTimeout(() => {
          this.btn_close.style.setProperty('opacity', '1');
          this.btn_close.style.setProperty('transform', 'translateX(0)');
        }, 300);
      }, 500);
    }, 300);
  }
  
  // Thêm các method mới để xử lý fade effects
  triggerFadeEffects() {
    // Các hiệu ứng fade sẽ được kích hoạt tự động thông qua CSS
    // khi attribute 'open' được thêm vào
    console.log('Fade effects triggered');
  }
  
  resetFadeEffects() {
    // Reset các hiệu ứng fade khi đóng popup
    const fadeElements = this.querySelectorAll('[lmt-fade-down], [lmt-fade-left], [lmt-fade-up]');
    fadeElements.forEach(element => {
      element.style.transitionDelay = '0s';
      element.style.opacity = '0';
    });
  }
  
  calcClose(){
    
    if(window.innerWidth < 1200){
      // this.wrapper.style.setProperty('--top',`10vh`);
    }else{
      let top = this.header.querySelector('.cta.light_skew');
      // this.header.style.setProperty('z-index', '1000002');
      // this.topbar.style.setProperty('z-index', '1000002');
      // this.wrapper.style.setProperty('--top',`${top.getBoundingClientRect().top + top.getBoundingClientRect().height + 30}px`);
    }
    
  }
  removeZIndex(){
    // this.header.style.removeProperty('z-index');
    // this.topbar.style.removeProperty('z-index');
  }
  setUpEventListeners(){
    this.btn_close.addEventListener('click',()=>{
      this.hide();
    })
    this.overlay.addEventListener('click',()=>{
      this.hide();
    })
    this.external_close.addEventListener('click',()=>{
      this.hide();
    })
  }
  init(){
    setTimeout(() => {
      this.show();
    }, 1500);
  }
}
customElements.define('big-update-popup', BigUpdatePopup)



// Banner popup
class bannerPopup extends HTMLElement{
  static get observedAttributes(){
    return ['open'];
  }
  get open(){
    return this.hasAttribute('open');
  }
  constructor(){
    super();
    // return;
    this._id = this.getAttribute('id');
    this.shown = JSON.parse(sessionStorage.getItem(this._id));
    console.log(this.shown)
    if(this.shown) return;
    this.attachShadow({mode:'open'});
    const template = `
      <style>
        :host{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }
        .wrap{
            pointer-events:auto;
        }
        .overlay{
          position: absolute;
          inset:0;
            background-color: rgba(0,0,0,0.3);
            -webkit-backdrop-filter: blur(3px);
            backdrop-filter: blur(3px);
          opacity: 0;
          transition: .2s ease-in-out;
          cursor: url('./assets/images/cursor-close.svg') 25 25, auto;
        }
        .content{

          z-index: 1;
          position: relative;
          transform: translateX(-20px);
          opacity: 0;
          transition: .3s ease-in-out;
        }
        .body{
          width: min(700px, 95vw);
          aspect-ratio: 1;
          border-radius: 10px;
          overflow:hidden;
        }
        button.close{
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 2;
          color: #fff;
          font-zise: 1rem;
          transition: .3s ease-in-out;
        }
        button.close:hover{
          color: #db1512;
        }
      </style>
      <div class="wrap">
        <div class="overlay"></div>
        <div class="content">
          <button part="close" class="close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
          </button>
          <div class="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `
    this.shadowRoot.innerHTML = template;

    this.close = this.shadowRoot.querySelector('.close');
    this.overlay = this.shadowRoot.querySelector('.overlay');
    this.content = this.shadowRoot.querySelector('.content');
    this.close.addEventListener('click',()=>{
      this.closePopup();
    });
    this.overlay.addEventListener('click',()=>{
      this.closePopup();
    });
    
    let timeout = setTimeout(() => {
      this.openPopup();
      clearTimeout(timeout);
    },5000);

  }
  openPopup(){
    this.style.setProperty('display','flex');
    setTimeout(() => {      
      this.overlay.style.setProperty('opacity','1');
      document.querySelector('html').style.setProperty('overflow','hidden');
    }, 300);
    setTimeout(() => {
      this.content.style.setProperty('transform','translate(0,0)');
      this.content.style.setProperty('opacity','1');
    }, 500);
  }
  closePopup(){
    this.content.style.setProperty('transform','translateX(20px)');
    this.content.style.setProperty('opacity','0');
    setTimeout(() => {      
      this.overlay.style.setProperty('opacity','0');
      document.querySelector('html').style.removeProperty('overflow');
    }, 300);
    setTimeout(() => {
      this.style.setProperty('display','none');
    }, 500);

    sessionStorage.setItem(this._id, true);
  }

}
customElements.define('clx-banner-popup',bannerPopup);

// render demos 
/**
 * Format listing demo
 * [
 *  {
 *    "name": "Home Fashion Default",
 *    "image": "./assets/images/demos/img/home-default.jpeg",
 *    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=156490727680&pb=0",
 *    "type": "fashion" => from class="col col-12 col-sm-6 col-md-6 col-lg-4 fashion isotope-item" 
 *    "version": 5.2 => from  "<div class="hdt-version-text"> Version 5.0 </div>",
 *    "label": "Hot, New" => from class="demos_label",
 *  }
 * ]
 */
const demoListing =[
  {
    "name": "Home Fashion Default",
    "handle": "home-fashion-default",
    "image": "./assets/images/demos/img/home-default.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=156490727680&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Multi Brand",
    "handle": "multi-brand",
    "image": "./assets/images/demos/img/multi_brand.jpg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=178968330540&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Halloween",
    "handle": "home-halloween",
    "image": "./assets/images/demos/img/home-haloween.jpg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=179804307756&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Bags 2",
    "handle": "home-bags-2",
    "image": "./assets/images/demos/img/home-bag-2.jpg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=155554709760&pb=0",
    "type": "more",
    "version": 5.0,
  },
  {
    "name": "Home Tea",
    "handle": "home-tea",
    "image": "./assets/images/demos/img/home_tea.jpg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=156224323840&pb=0",
    "type": "more",
    "version": 5.0,
  },
  {
    "name": "Home Scooter",
    "handle": "home-scooter",
    "image": "./assets/images/demos/img/home-scooter.jpg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=156081488128&pb=0",
    "type": "sport",
    "version": 5.0,
  },
  {
    "name": "Home POD",
    "handle": "home-pod",
    "image": "./assets/images/demos/img/home_pod.jpg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=177438720300&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Decor 2",
    "handle": "home-decor-2",
    "image": "./assets/images/demos/img/home-decor2.jpeg",
    "url": "http://kalles-5-2.myshopify.com/?preview_theme_id=156563243264&pb=0",
    "type": "furniture",
    "version": 5.0,
  },
  {
    "name": "Home Handmade 2",
    "handle": "home-handmade-2",
    "image": "./assets/images/demos/img/landing-handmade2.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=155836383488&pb=0",
    "type": "more",
    "version": 5.0,
  },
  {
    "name": "Home Bakery",
    "handle": "home-bakery",
    "image": "./assets/images/demos/img/home-bakery.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=155463221504&pb=0",
    "type": "more",
    "version": 5.0,
  },
  {
    "name": "Home Furniture 3",
    "handle": "home-furniture-3",
    "image": "./assets/images/demos/img/home-furniture-2.jpeg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=179742048556&pb=0",
    "type": "furniture",
    "version": 5.0,
  },
  {
    "name": "Home Lingeries",
    "handle": "home-lingeries",
    "image": "./assets/images/demos/img/home-lingeries.jpeg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=179842023724&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Blanket Pillow",
    "handle": "home-blanketpillow",
    "image": "./assets/images/demos/img/home-blanketpillow.jpg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=179784089900&pb=0",
    "type": "furniture",
    "version": 5.0,
  },
  {
    "name": "Home Pizzas",
    "handle": "home-pizzas",
    "image": "./assets/images/demos/img/home_pizzas.jpg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=179570180396&pb=0",
    "type": "more",
    "version": 5.0,
  },
  {
    "name": "Home Fashion 15",
    "handle": "home-fashion-15",
    "image": "./assets/images/demos/img/home-fashion-15.png",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=177245847852&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Furniture 4",
    "handle": "home-furniture-4",
    "image": "./assets/images/demos/img/home-furniture-4.jpeg",
    "url": "https://demo-kalles-4-4.myshopify.com/?preview_theme_id=132177625253",
    "type": "furniture",
    "version": 4.0,
  },
  {
    "name": "Home Fashion Simple",
    "handle": "home-fashion-simple",
    "image": "./assets/images/demos/img/home-fashion-simple.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-fashion-simple/?preview_theme_id=168748745004",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Lookbook Collection",
    "handle": "home-lookbook-collection",
    "image": "./assets/images/demos/img/home-lookbook-collection.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-lookbook-collection?preview_theme_id=168748745004&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Categories Links",
    "handle": "home-categories-links",
    "image": "./assets/images/demos/img/home-categories-links.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-categories-links/?preview_theme_id=168748745004&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Electronic 4",
    "handle": "home-electronic-4",
    "image": "./assets/images/demos/img/home-electronic.jpeg",
    "url": "https://demo-kalles-4-4.myshopify.com/?preview_theme_id=132174381221",
    "type": "electronics",
    "version": 4.0,
  },
  {
    "name": "Home Video Banner",
    "handle": "home-video-banner",
    "image": "./assets/images/demos/img/home-video-banner.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-video-banner/?preview_theme_id=168748745004",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Watches",
    "handle": "home-watches",
    "image": "./assets/images/demos/img/home-watches.jpeg",
    "url": "https://kalles-5-3.myshopify.com/?preview_theme_id=180798816529&pb=0",
    "type": "electronics",
    "version": 5.2,
  },
  {
    "name": "Home Parallax",
    "handle": "home-parallax",
    "image": "./assets/images/demos/img/home-parallax.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-parallax/?preview_theme_id=168748745004",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Static Image",
    "handle": "home-static-image",
    "image": "./assets/images/demos/img/home-static-image.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-static-image/?preview_theme_id=168748745004",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Instagram Shop",
    "handle": "home-instagram-shop",
    "image": "./assets/images/demos/img/home-instagram-shop.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-instagram-shop?preview_theme_id=168748745004&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home LookBook",
    "handle": "home-lookbook",
    "image": "./assets/images/demos/img/home-lookbook.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-lookbook?preview_theme_id=168748745004&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Classic",
    "handle": "home-classic",
    "image": "./assets/images/demos/img/home-classic.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-classic/?preview_theme_id=168748745004&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home New Furniture",
    "handle": "home-new-furniture",
    "image": "./assets/images/demos/img/home-furniture-modern.jpeg",
    "url": "https://demo-kalles-4-1.myshopify.com/?preview_theme_id=128696221902",
    "type": "furniture",
    "version": 4.0,
  },
  {
    "name": "Home Metro",
    "handle": "home-metro",
    "image": "./assets/images/demos/img/home-metro.jpeg",
    "url": "https://kalles-5.myshopify.com/pages/home-metro/?preview_theme_id=168748745004&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Fashion 9",
    "handle": "home-fashion-9",
    "image": "./assets/images/demos/img/home-fashion9.jpeg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=169121808684",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Fashion 10",
    "handle": "home-fashion-10",
    "image": "./assets/images/demos/img/home-fashion-10.jpeg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=177229496620&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Fashion 11",
    "handle": "home-fashion-11",
    "image": "./assets/images/demos/img/home-fashion-11.jpeg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=177264361772&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Home Ergonomic",
    "handle": "home-ergonomic",
    "image": "./assets/images/demos/img/home-ergonomic.jpg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=179483476268&pb=0",
    "type": "furniture",
    "version": 5.0,
  },
  {
    "name": "Skincare",
    "handle": "skincare",
    "image": "./assets/images/demos/img/home-skincare.jpg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=179532726572&pb=0",
    "type": "more",
    "version": 5.0,
  },
  {
    "name": "Furniture 5",
    "handle": "furniture-5",
    "image": "./assets/images/demos/img/home-furniture-5.jpeg",
    "url": "https://demo-kalles-4-4.myshopify.com/?preview_theme_id=137841574053",
    "type": "furniture",
    "version": 4.0,
  },
  {
    "name": "Home Organic",
    "handle": "home-organic",
    "image": "./assets/images/demos/img/home-organic.jpeg",
    "url": "https://demo-kalles-4-1.myshopify.com/?preview_theme_id=128713982158",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "Fashion 22",
    "handle": "fashion-22",
    "image": "./assets/images/demos/img/home-fashion-22.jpeg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=178675188012&pb=0",
    "type": "fashion",
    "version": 5.0,
  },
  {
    "name": "Nutri-Vitamin",
    "handle": "nutri-vitamin",
    "image": "./assets/images/demos/img/home-nutri-vitamin.jpeg",
    "url": "https://demo-kalles-4-4.myshopify.com/?preview_theme_id=132611768485",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "Home Pets",
    "handle": "home-pets",
    "image": "./assets/images/demos/img/home-pets.png",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=179728482604&pb=0",
    "type": "more",
    "version": 5.0,
  },
  {
    "name": "Home Tee Store",
    "handle": "home-tee-store",
    "image": "./assets/images/demos/img/home-tee.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=130070708381",
    "type": "fashion",
    "version": 4.0,
  },
  {
    "name": "Home Fashion Vertical",
    "handle": "home-fashion-vertical",
    "image": "./assets/images/demos/img/home-fashion-vertical.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132676976878",
    "type": "fashion",
    "version": 4.0,
  },
  {
    "name": "Home Fashion Trend",
    "handle": "home-fashion-trend",
    "image": "./assets/images/demos/img/home-fashion-trend.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132698669294",
    "type": "fashion",
    "version": 4.0,
  },
  {
    "name": "Home New Fashion",
    "handle": "home-new-fashion",
    "image": "./assets/images/demos/img/home-new-fashion.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132700602606",
    "type": "fashion",
    "version": 4.0,
  },
  {
    "name": "Home Decor",
    "handle": "home-decor",
    "image": "./assets/images/demos/img/home-decor.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132703748334",
    "type": "furniture",
    "version": 4.0,
  },
  {
    "name": "Home Furniture",
    "handle": "home-furniture",
    "image": "./assets/images/demos/img/home-furniture-1.jpeg",
    "url": "https://demo-kalles-4-1.myshopify.com/?preview_theme_id=128672530638",
    "type": "furniture",
    "version": 4.0,
  },
  {
    "name": "Home Furniture 2",
    "handle": "home-furniture-2",
    "image": "./assets/images/demos/img/home-furniture.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=157264544000&pb=0",
    "type": "furniture",
    "version": 5.2,
  },
  {
    "name": "Home Electric",
    "handle": "home-electric",
    "image": "./assets/images/demos/img/home-electric.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132719673582",
    "type": "electronics",
    "version": 4.0,
  },
  {
    "name": "Home Electric Vertical",
    "handle": "home-electric-vertical",
    "image": "./assets/images/demos/img/home-electric-2.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=157035790592&pb=0",
    "type": "electronics",
    "version": 5.2,
  },
  {
    "name": "Home Digital",
    "handle": "home-digital",
    "image": "./assets/images/demos/img/home-digital.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132721180910",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "One Product Store",
    "handle": "one-product-store",
    "image": "./assets/images/demos/img/home-single-product.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132722163950",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "Home Hi Tech",
    "handle": "home-hitech",
    "image": "./assets/images/demos/img/home-hitech.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=157194977536&pb=0",
    "type": "electronics",
    "version": 5.2,
  },
  {
    "name": "Home Phonecase 4",
    "handle": "home-phonecase-4",
    "image": "./assets/images/demos/img/home-phonecase.jpeg",
    "url": "https://demo-kalles-4-4.myshopify.com/?preview_theme_id=132229365925",
    "type": "electronics",
    "version": 4.0,
  },
  {
    "name": "Home Handmade",
    "handle": "home-handmade",
    "image": "./assets/images/demos/img/home-handmade.jpeg",
    "url": "https://kalles-5.myshopify.com/?preview_theme_id=178560893228&pb=0",
    "type": "more",
    "version": 5.0,
  },
  {
    "name": "Home Bag",
    "handle": "home-bag",
    "image": "./assets/images/demos/img/home-bag.jpeg",
    "url": "https://demo-kalles-4-1.myshopify.com/?preview_theme_id=128697729230",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "Home Shoes",
    "handle": "home-shoes",
    "image": "./assets/images/demos/img/home-shoes.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=157077373184&pb=0",
    "type": "more",
    "version": 5.2,
  },
  {
    "name": "Home Medical",
    "handle": "home-medical",
    "image": "./assets/images/demos/img/home-medical.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=129857487005",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "Home Flowers",
    "handle": "home-flowers",
    "image": "./assets/images/demos/img/home-flower.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=157067706624&pb=0",
    "type": "flower",
    "version": 5.2,
  },
  {
    "name": "Home Jewelry",
    "handle": "home-jewelry",
    "image": "./assets/images/demos/img/home-jewelry.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=129857683613",
    "type": "jewelry",
    "version": 4.0,
  },
  {
    "name": "Home Bicycle",
    "handle": "home-bicycle",
    "image": "./assets/images/demos/img/home-bicycle.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=129859158173",
    "type": "sport",
    "version": 4.0,
  },
  {
    "name": "Home Baby",
    "handle": "home-baby",
    "image": "./assets/images/demos/img/home-baby.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=129744044189",
    "type": "kids",
    "version": 4.0,
  },
  {
    "name": "Home Kid & Accessories",
    "handle": "home-kid-accessories",
    "image": "./assets/images/demos/img/home-kid-accessories.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132724195566",
    "type": "kids",
    "version": 4.0,
  },
  {
    "name": "Home Yoga",
    "handle": "home-yoga",
    "image": "./assets/images/demos/img/home-yoga.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=129859027101",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "Home Hiking",
    "handle": "home-hiking",
    "image": "./assets/images/demos/img/home-hiking.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=129844314269",
    "type": "sport",
    "version": 4.0,
  },
  {
    "name": "Home Glasses",
    "handle": "home-glasses",
    "image": "./assets/images/demos/img/home-glasses.jpeg",
    "url": "https://demo-kalles-4-1.myshopify.com/?preview_theme_id=128703398094",
    "type": "fashion",
    "version": 4.0,
  },
  {
    "name": "Home Sport Accessories",
    "handle": "home-sport-accessories",
    "image": "./assets/images/demos/img/home-sport-accessories.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=129857978525",
    "type": "sport",
    "version": 4.0,
  },
  {
    "name": "Home Sport",
    "handle": "home-sport",
    "image": "./assets/images/demos/img/home-sport-fitness.jpeg",
    "url": "https://demo-kalles-4-3.myshopify.com/?preview_theme_id=132747329774",
    "type": "sport",
    "version": 4.0,
  },
  {
    "name": "Home Spa",
    "handle": "home-spa",
    "image": "./assets/images/demos/img/home-spa.jpeg",
    "url": "https://kalles-5-3.myshopify.com/?preview_theme_id=180731445521&pb=0",
    "type": "more",
    "version": 5.2,
  },
  {
    "name": "Home Barber",
    "handle": "home-barber",
    "image": "./assets/images/demos/img/home-barber.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=156666364160&pb=0",
    "type": "more",
    "version": 5.2,
  },
  {
    "name": "Home Plant",
    "handle": "home-plant",
    "image": "./assets/images/demos/img/home-plant.jpeg",
    "url": "https://kalles-5-3.myshopify.com/?preview_theme_id=180780990737&pb=0",
    "type": "more",
    "version": 5.2,
  },
  {
    "name": "Home Plant 2",
    "handle": "home-plant-2",
    "image": "./assets/images/demos/img/home-plant-2.jpeg",
    "url": "https://demo-kalles-4-2.myshopify.com/?preview_theme_id=129844379805",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "Home Cosmetic",
    "handle": "home-cosmetic",
    "image": "./assets/images/demos/img/home-cosmetic.jpeg",
    "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=156823552256&pb=0",
    "type": "more",
    "version": 5.2,
  },
  {
    "name": "Home Organic 2",
    "handle": "home-organic-2",
    "image": "./assets/images/demos/img/home-organic-2.jpeg",
    "url": "https://demo-kalles-4-1.myshopify.com/?preview_theme_id=128714473678",
    "type": "more",
    "version": 4.0,
  },
  {
    "name": "Home Drone",
     "handle": "home-drone",
     "image": "./assets/images/demos/img/home-drone.jpeg",
     "url": "https://kalles-5-2.myshopify.com/?preview_theme_id=157374808320&pb=0",
     "type": "electronics",
     "version": 5.2,
  }
]

class demoGrid extends HTMLElement{
  constructor(){
    super();
    this.buyUrl = "https://1.envato.market/nL6xBa";    
  }
  connectedCallback(){
    let contentCache = localStorage.getItem('demo-grid-content');
    
    if(contentCache && !this.needRenderNewContent){
      this.innerHTML = contentCache;
    }else{
      let content = this.renderContent;
      this.innerHTML = content;
      localStorage.setItem('demo-grid-content', content);
    }
    
  }
  get newDemo(){
    return ["home-watches", "home-spa", "home-shoes", "home-plant", "home-hitech", "home-furniture-2", "home-flowers", "home-electric-vertical", "home-drone", "home-cosmetic", "home-barber"]
  }

  get needRenderNewContent(){
    const newDemoCache = localStorage.getItem('demo-grid-new-demo')?.toString() | '';
    return newDemoCache === this.parseData(this.newDemo.join(','),'string');
  }
  get sortDemo(){ 
    const sorted = [...demoListing].sort((a, b) => {
      const indexA = this.newDemo.indexOf(a.handle);
      const indexB = this.newDemo.indexOf(b.handle);
      
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
    return sorted;
  }

  get renderContent(){
    return this.sortDemo.map(item => this.renderItem(item)).join('');
  }
  includeNewDemo(handle){
    return this.newDemo.indexOf(handle) !== -1;
  }
  parseData(data,type){
    switch(type){
      case 'string': 
        return JSON.stringify(data);
      default: 
       return data;
    }
  }
  renderItem(item){
    const { name, image, url, type, version, handle } = item;
    return `
      <div class="col col-12 col-sm-6 col-md-6 col-lg-4 ${type} isotope-item">
        <div class="col-inner">
          <div class="img_wrap">
            <div class="ratio" style="--aspect-ratioapt:405/286">
              <img loading="lazy" src="${image}" alt="Demos">
            </div>
            <div class="btn_demo_groups">
              <effect-custom type="button" config='{"num":3}' class="call_to_action demo_demos">
                <div effect-parent="">
                </div>
                <a href="${url}" target="_blank"
                  class="cta effect-border btn_demos light_skew">
                  <span class="cta_text">
                    Demo
                  </span>
                </a>
              </effect-custom>
              <effect-custom type="button" config='{"num":3}' class="call_to_action demo_ec_demos">
                <div effect-parent="">
                </div>
                <a href="#" target="_blank" class="cta effect-border btn_demos light_skew">
                  <span class="cta_text">
                    EC Demo
                  </span>
                </a>
              </effect-custom>
              <effect-custom type="button" config='{"num":3}' class="call_to_action buy_theme">
                <div effect-parent="">
                </div>
                <a href="${this.buyUrl}" target="_blank" class="cta effect-border btn_demos light_skew" no-popup>
                  <span class="cta_text">
                    Buy Kalles
                  </span>
                </a>
              </effect-custom>
            </div>
          </div>
          <div class="content">
            <a class="title" href="${url}"
              target="_blank">${name}</a>
            <div class="d-flex align-items-center" style="gap: 10px;">
              <div class="hdt-version v-2">
                <div class="hdt-version-text">
                  Version ${version}
                </div>
              </div>
              ${this.includeNewDemo(handle) ? `<span class="demos_label">New</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `
  }
}
customElements.define('demo-grid',demoGrid);