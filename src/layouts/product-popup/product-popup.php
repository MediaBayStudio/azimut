<div class="product-popup" id="product-popup">
  <div class="product-popup__cnt">
    <button type="button" class="product-popup__close">
      <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-popup__close-svg">
        <path d="M15.5 1L1 15.5M15.5 15.5L1 1" class="product-popup__close-path"/>
      </svg>
    </button>
    <span class="product-popup__title"></span>
    <div class="product-popup__text"></div>
    <div class="product-popup__nav">
      <a href="#" class="product-popup__prev arrow arrow__prev"><svg class="arrow__svg" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5.23529L1 9" stroke="currentColor"/></svg></a>
      <a href="#" class="product-popup__next arrow arrow__next"><svg class="arrow__svg" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5.23529L1 9" stroke="currentColor"/></svg></a>
    </div>
    <a href="<?php echo get_site_url() ?>/production/#installation" class="product-popup__link" hidden>Инсталляция</a>
    <div class="loader hidden">
      <div class="loader__circle"></div>
    </div>
  </div>
</div>