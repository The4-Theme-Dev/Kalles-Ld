// ===============================
//  JAVASCRIPT EFFECT VERSION 1.0
// ===============================



class fillTextScrolling extends HTMLElement {
  constructor() {
    super();
    this.text = this.querySelector('.text');
    this.words = this.text.textContent.split(" ");
    this.highlight = 'class="highlight"'
    this.run();
    window.addEventListener('scroll', () => {
      let scroll = this.getScrollFraction();
      let words_highlighted = scroll * this.words.length;
      this.text.innerHTML = this.words.map((w, i) => `<span ${i < words_highlighted ? this.highlight : ''}>${w}</span>`).join(' ');
    })

  }
  run() {
    this.text.innerHTML = this.words.map(w => `<span >${w}</span>`).join(' ')
  }
  getScrollFraction() {
    var h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
  }
}
customElements.define('fill-text', fillTextScrolling)


// ===============================
//  Button effect when hover
// ===============================

// <effect-custom type='button' eff-num="6">
//    <div effect-parent>
//      
//    </div>
//    <button>See more</button>
//  </effect-custom> 
class Effect extends HTMLElement {
  constructor() {
    super();
    if (this.getAttribute('type') !== 'button') {
      return;
    }
    if (!this.querySelector('[effect-parent]')) {
      return
    }
    if (window.innerWidth < 767) {
      return;
    }
    // this.EffNum = this.getAttribute('eff-num');
    this.EffNum = 3;
    this.container = this.querySelector('div[effect-parent]');
    this.background = 'none';
    this.createChild();

    if (window.innerWidth > 1149) {
      this.addEventListener('mousemove', (e) => {
        this.onHover(e);
      })
      this.addEventListener('mouseleave', () => {
        this.leaveHover();
      })
    }
  }
  createChild() {
    // console.log("if > 3 item => Random color is running");
    for (let i = 0; i < this.EffNum; i++) {
      if (i > 2) {
        // random position
        this.randomPos = this.randomRangeInt(30, 100);
        //  random color background linear
        this.randomColor();
        //  add element item
        this.span = document.createElement('span');
        this.span.style.background = `${this.background}`;
        this.container.append(this.span);
        continue;
      }
      this.span = document.createElement('span');
      this.container.append(this.span);
    }
  }
  randomRangeInt(min, max) {
    // console.log(Math.floor(Math.random() * (max - min)) + min);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  onHover(e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
    // console.log(this.x,this.y);
    this.classList.add('is-hover')
    this.arr = this.querySelectorAll('div[effect-parent] span');
    this.arr.forEach((el, index) => {
      el.style.setProperty('--top', `${this.y}px`)
      el.style.setProperty('--left', `${this.x}px`)
    })
  }
  leaveHover() {
    this.arr = this.querySelectorAll('div[effect-parent] span');
    this.arr.forEach((el, index) => {
      el.style.removeProperty('--top');
      el.style.removeProperty('--left');
      // console.log(index);
    })
  }
  randomColor() {
    const direction = Math.round(Math.random() * 360);
    const r1 = Math.round(Math.random() * 255);
    const g1 = Math.round(Math.random() * 255);
    const b1 = Math.round(Math.random() * 255);
    const a1 = Math.round(Math.random() * 10) / 10;
    const r2 = Math.round(Math.random() * 255);
    const g2 = Math.round(Math.random() * 255);
    const b2 = Math.round(Math.random() * 255);
    const a2 = Math.round(Math.random() * 10) / 10;
    this.background = `linear-gradient(${direction}deg, rgba(${r1},${g1},${b1},${a1}), rgba(${r2},${g2},${b2},${a2}))`;
  }
}
customElements.define('effect-custom', Effect);