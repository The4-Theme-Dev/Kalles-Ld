// ===============================
//  JAVASCRIPT EFFECT VERSION 1.0
// ===============================


// ===============================
//  fill text when scrolling
// ===============================

// STRUCT
// <fillText>
//  <span class="text">lorem isum ....</span>
// </fillText>
// 

// window.addEventListener('scroll', () => {
//   let scroll = getScrollFraction();
//   let words_highlighted = scroll * words.length;

//   text.innerHTML = words
//   .map((w, i) => `<span ${i < words_highlighted ? HIGHLIGHT : ''}>${w}</span>`)
//   .join(' ');
// })

// from https://stackoverflow.com/a/8028584/2931840
//
// function getScrollFraction() {
//     var h = document.documentElement, 
//         b = document.body,
//         st = 'scrollTop',
//         sh = 'scrollHeight';
//     return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
// }

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
    this.EffNum = this.getAttribute('eff-num');
    this.container = this.querySelector('div[effect-parent]');
    this.background = 'none';
    this.createChild();
    this.addEventListener('mousemove', (e) => {
      this.onHover(e);
    })
    this.addEventListener('mouseleave', () => {
      this.leaveHover();
    })
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



// ===============================
//  ripple Effect
// ===============================

// struct
//    <ripple-effect>
//      <canvas id="canvas" width="100" height="400"></canvas>
//    </ripple-effect>
class RippeEffect extends HTMLElement {
  constructor() {
    super();

    this.canvas = this.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.step = -4;
    this.config = JSON.parse(this.getAttribute('config'))
    console.log(this.config);

    this.start()
  }
  start() {
    requestAnimationFrame(() => {
      this.start()
    });
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawWave(2, "cos");
    this.drawWave(4, "cos");
    this.drawWave(5, "cos");
    this.drawWave(6, "cos");
    this.drawWave(10, "cos");
    this.drawWave(12, "cos");
    this.drawWave(14, "cos");
    this.step += 5;
  }
  drawWave(amplitude, trig) {
    // trig is the trigonometric function to be used: sin or cos
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.config.color;
    this.x = 0;
    this.y = 0;
    //this.amplitude = 10;
    this.frequency = this.height / (2 * Math.PI);
    this.ctx.save();
    this.ctx.translate(-amplitude * Math[trig](this.step / this.frequency), 0);
    while (this.y < this.height) {
      this.x = this.width / 2 + amplitude * Math[trig]((this.y + this.step) / this.frequency);
      this.ctx.lineTo(this.x, this.y);
      this.y++;
    }
    this.ctx.stroke();
    this.ctx.restore();
  }
}
customElements.define('ripple-effect', RippeEffect)

class galaxy extends HTMLElement {
  constructor() {
    super();
    this.cnv = this.querySelector('canvas');
    this.ctx = this.cnv.getContext('2d')
    this.star_num = 200;
    this.r = 3;
    this.w = this.cnv.width;
    this.h = this.cnv.height;
    this.speed = 5;
    this.arrPos = [{
      x: 0,
      y: 0,
      color: '#fff'
    }];
    // this.randomPos()
    // this.render();
  }
  render() {
    for (let i = 0; i < this.arrPos.length; i++) {
      this.star(this.arrPos[i].x, this.arrPos[i].y, this.r, this.arrPos[i].color)
    }
    requestAnimationFrame(() => {
      this.render()
    })
  }
  randomPos() {
    for (let i = 0; i < this.star_num; i++) {
      let x = Math.random() * this.w;
      let y = Math.random() * this.h;
      let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      this.arrPos.push({ x: x, y: y, color: color })
    }
    requestAnimationFrame(() => {
      this.randomPos()
    })

  }
  star(x, y, r, color) {

    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
customElements.define('canvas-galaxy', galaxy)
