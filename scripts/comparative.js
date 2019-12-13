module.exports = function(selector = '.comparative') {
  return function() {

    const comparativeElements = document.querySelectorAll(selector);

    // cria folha de estilos e anexa no head
    if (comparativeElements.length > 0) {
      const styleEl = document.createElement('style');
      styleEl.innerHTML = `
      .comparative {
        position: relative;
        overflow: hidden;
        --alpha: 0.5;
        user-select: none;
      }
      .comparative > p {
        position: relative;
        width: 100%;
        overflow: hidden;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        box-shadow: 3px 3px 6px #0006;
      }
      .comparative > img,
      .comparative > p > img {
        user-select: none;
        pointer-events: none;
        width: 100%;
      }
      .comparative > img:first-child,
      .comparative > p > img:first-child {
        z-index: 1;
      }
      .comparative > img:not(:first-child),
      .comparative > p > img:not(:first-child) {
        position: absolute;
        left: 0;
        top: 0;
      }
      .comparative-handle {
        position: absolute;
        left: calc(100% * var(--alpha));
        top: calc(50% - var(--handle-size) * 0.5);
        --handle-size: 50px;
        width: var(--handle-size);
        height: var(--handle-size);
        margin-left: calc(var(--handle-size) * (-0.5));
        border: 3px solid white;
        border-radius: 50%;
        cursor: move;
        z-index: 2;
      }
      .comparative-handle::before,
      .comparative-handle::after {
        content: " ";
        display: inline-block;
        position: absolute;
        left: calc(50% - 2px);
        width: 4px;
        height: 9999px;
        background-color: white;
        user-select: none;
      }
      .comparative-handle::before {
        top: calc(var(--handle-size) - 3px);
      }
      .comparative-handle::after {
        bottom: calc(var(--handle-size) - 3px);
      }
      .comparative figcaption {
        font-size: 0.75em;
      }
      .comparative figcaption .push-left,
      .comparative figcaption .push-right {
        background-color: #fff9;
        border-radius: 10px;
        padding: 5px;
        position: absolute;
        bottom: 3em;
        z-index: 2;
      }
      .comparative figcaption .push-left {
        left: 0.5em;
      }
      .comparative figcaption .push-right {
        right: 0.5em;
      }
      `;
      document.head.appendChild(styleEl);
    }

    comparativeElements.forEach(el => {
      const handleEl = el.querySelector('.comparative-handle');
      const firstImageEl = el.querySelector('img:first-child');
      const figCaptionEl = el.querySelector('figcaption');

      if (!handleEl) {
        console.warn('Foi criado um .comparative mas não há um .comparative-handle dentro dele');
        return;
      }
      if (!firstImageEl) {
        console.warn('Foi criado um .comparative mas não há uma imagem dentro dele');
        return;
      }

      const rect = {};
      setSize();
      firstImageEl.addEventListener('load', setSize);
      el.addEventListener('touchstart', dragStart, false);
      el.addEventListener('touchend', dragEnd, false);
      el.addEventListener('touchmove', drag, false);

      el.addEventListener('mousedown', dragStart, false);
      el.addEventListener('mouseup', dragEnd, false);
      el.addEventListener('mousemove', drag, false);

      let isDragging = false;
      function dragStart(e) {
        if (e.target === handleEl) {
          isDragging = true;
        }
      }

      function dragEnd() {
        isDragging = false;
      }

      const scaleParent = el.closest('.bespoke-scale-parent');
      function drag(e) {
        if (isDragging) {
          e.preventDefault();
          const scale = scaleParent ? scaleParent.style.transform.substr('scale('.length, scaleParent.style.transform.indexOf(')')-'scale('.length) : 1;
          rect.left = el.getBoundingClientRect().left;
          const x = (e.pageX - rect.left)/parseFloat(scale);
          const alpha = x/rect.width;
          e.currentTarget.style.setProperty('--alpha', alpha);
          firstImageEl.style.clip = `rect(0px, ${alpha * rect.width}px, ${rect.height}px, 0px)`;
        }
      }

      function setSize() {
        firstImageEl.removeEventListener('load', setSize);
        rect.width = el.style.width.substr(0, el.style.width.length-2);
        rect.height = el.style.height.substr(0, el.style.height.length-2);
        el.firstElementChild.style.height = rect.height + 'px';
        firstImageEl.style.position = 'absolute';
        firstImageEl.style.clip = `rect(0px, ${0.5 * rect.width}px, ${rect.height}px, 0px)`;
        el.firstElementChild.appendChild(handleEl);
        if (figCaptionEl) {
          figCaptionEl.style.width = rect.width + 'px';
        }
      }
    });
  };
};
