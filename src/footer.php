        <footer class="ftr container">
          <a href="/" class="ftr__logo">
            <img src="<?php echo $template_directory ?>/img/logo.svg" alt="" class="ftr__logo-img">
          </a>
        </footer>
      </div> <!-- sections-wrapper -->
    </div> <!-- page-wrapper -->
    <div id="fake-scrollbar"></div> <?php
    wp_footer();
    require 'layouts/overlay/overlay.php';
    require 'layouts/product-popup/product-popup.php';
    require 'layouts/thanks-popup/thanks-popup.php' ?>
  </body>
</html>