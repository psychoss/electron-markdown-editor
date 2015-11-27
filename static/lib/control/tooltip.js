'use strict';
module.exports = (elements) => {
  var tooltip = (text) => {
    var t = document.createElement('div');
    t.className = 'tooltip';
    var ta = document.createElement('div');
    ta.className = 'tooltip-arrow';
    t.appendChild(ta);
    var ti = document.createElement('div');
    ti.className = 'tooltip-inner';
    ti.innerHTML = text;
    t.appendChild(ti);
    return t;
  }
  elements = [].slice.call(elements, 0);
  for (var ele of elements) {
    ele.addEventListener('mouseenter', (event) => {
      var el = event.target;

      var rects = el.getBoundingClientRect();

      console.log(rects);
      var ox = rects.left + rects.width / 2;
      console.log(ox);
      var t = tooltip(el.getAttribute('aria-label'));
      document.body.appendChild(t)
      t.style.top=(rects.top + rects.height + 2)+'px';
      t.style.left = (ox - (t.clientWidth / 2)) + 'px'

      t.classList.add('in');
      // setTimeout(()=>{
      //   var t = document.querySelector('.tooltip');
      //   if (t) {
      //     t.remove();
      //   }
      // },2000)
    });
    ele.addEventListener('mouseleave', () => {
      var t = document.querySelector('.tooltip');
      if (t) {
        t.remove();
      }
    })
  }
};
