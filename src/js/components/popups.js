(function() {
  let productsBlock = id('products');

  if (productsBlock) {
    productPopup = new Popup('#product-popup', {
      closeButtons: '.product-popup__close'
    });


    let installationLink = q('.product-popup__link', productPopup),
      currentLink,
      currentLinkIndex,
      prevLink,
      nextLink,
      productsLinks,
      productPopupCnt = q('.product-popup__cnt', productPopup),
      productPopupNav = q('.product-popup__nav', productPopup),
      productPopupTitle = q('.product-popup__title', productPopup),
      productPopupText = q('.product-popup__text', productPopup),
      productPopupPrev = productPopupNav.children[0],
      productPopupNext = productPopupNav.children[1],
      openProductPopup = function() {
        let hash = location.hash;
        if (hash !== '' && hash.search(/#[0-9]+/) !== -1) {
          if (!productPopup.classList.contains('active')) {
            productPopup.openPopup();
          }
          productPopup.scrollTop = 0;
          productPopup.classList.add('loading');
          productPopupPrev.blur();
          productPopupNext.blur();

          if (!productsLinks) {
            productsLinks = qa('.product__link', productsBlock, true);
          }
          currentLink = q('[href="' + hash + '"]', productsBlock);
          currentLinkIndex = productsLinks.indexOf(currentLink);

          prevLink = currentLinkIndex === 0 ? 0 : prevLink = productsLinks[currentLinkIndex - 1];
          nextLink = currentLinkIndex === productsLinks.length - 1 ? 0 : productsLinks[currentLinkIndex + 1];

          if (prevLink) {
            productPopupPrev.href = prevLink.href;
            productPopupPrev.title = prevLink.textContent;
            productPopupPrev.classList.remove('disabled');
          } else {
            productPopupPrev.classList.add('disabled');
          }

          if (nextLink) {
            productPopupNext.href = nextLink.href;
            productPopupNext.title = nextLink.textContent;
            productPopupNext.classList.remove('disabled');
          } else {
            productPopupNext.classList.add('disabled');
          }

          let xhr = new XMLHttpRequest(),
            data = 'action=get_post_by_id&post_id=' + hash.slice(1);

          xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(data);

          xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              let post = xhr.response;
              if (post) {
                post = JSON.parse(post);

                productPopup.classList.remove('loading');

                let postCnt = post.post_content;

                if (!postCnt) {
                  postCnt = 'Страница находится в разработке';
                  installationLink.setAttribute('hidden', '');
                } else {
                  installationLink.removeAttribute('hidden');
                }

                productPopupTitle.innerHTML = post.post_title;
                productPopupText.innerHTML = postCnt;
                // setTimeout(function() {
                //   productPopupCnt.style.maxHeight = productPopupCnt.scrollHeight + 'px';
                // }, 500);
              }
            }
          });
        }
      };

    installationLink.addEventListener('click', function() {
      productPopup.closePopup();
    });

    productsBlock.addEventListener('click', function(e) {
      let target = e.target;

      if (target.tagName === 'A') {
        e.preventDefault();
        history.pushState(0, 0, target.href);
        openProductPopup();
      }
    });

    productPopupNav.addEventListener('click', function(e) {
      let target = e.target;

      if (target.tagName === 'A') {
        e.preventDefault();
        history.pushState(0, 0, target.href);
        openProductPopup();
      }
    });

    productPopup.addEventListener('popupbeforeclose', function() {
      history.replaceState(0, 0, window.location.pathname);
    });

    windowFuncs.load.push(openProductPopup);
  }

  // thanksPopup = new Popup('.thanks-popup', {
  //   closeButtons: '.thanks-popup__close'
  // });

  // thanksPopup.addEventListener('popupbeforeopen', function() {
  //   clearTimeout(thanksPopupTimer);
  // });

  // Закрытие всех попапов вместе с закрытием окна спасибо
  // thanksPopup.addEventListener('popupbeforeclose', function() {
  //   let otherPopups = [callbackPopup, orderPopup];

  //   for (let i = 0; i < otherPopups.length; i++) {
  //     if (otherPopups[i].classList.contains('active')) {
  //       otherPopups[i].closePopup();
  //     }
  //   }
  // });
})()