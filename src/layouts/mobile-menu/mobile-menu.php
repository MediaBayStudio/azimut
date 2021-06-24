<?php global $template_directory, $tel, $tel_dry ?>
<aside class="menu">
  <div class="menu__cnt">
    <a href="/" class="menu__logo" title="На главную">
      <img src="<?php echo $template_directory ?>/img/logo-white.svg" alt="Логотип Азимут Альянс" class="menu__logo-img">
    </a> <?php
    wp_nav_menu( [
      'theme_location'  => 'mobile_menu',
      'container'       => 'nav',
      'container_class' => 'menu__nav',
      'menu_class'      => 'menu__nav-list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <a href="<?php echo $tel_dry ?>" class="menu__tel"><?php echo $tel ?></a>
  </div>
</aside>