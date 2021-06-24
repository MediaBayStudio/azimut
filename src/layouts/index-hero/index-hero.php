<?php
  $sect_title = $sect['sect_title'];
  $sect_link = $sect['link'];
  $pl = 'url(' . $template_directory . '/img/img-placeholder.svg)';
  
  $data_src = 'url(' . $template_directory . '/img/index-hero.576.jpg),' . $pl;
  $data_media = '(min-width:575.98px){url(' . $template_directory . '/img/index-hero.768.jpg),' . $pl . '}(min-width:767.98px){url(' . $template_directory . '/img/index-hero.1024.jpg),' . $pl . '}(min-width:1023.98px){url(' . $template_directory . '/img/index-hero.1440.jpg),' . $pl . '}';
  // Если iOS, то будем скрывать самолеты, т.к. движение по траектории не поддерживается (offset-path)
  $user_agent = $_SERVER['HTTP_USER_AGENT'];
  if ( preg_match( '/iPhone|iPad|iPod/i', $user_agent ) || strpos( $user_agent, 'Safari' ) && !strpos( $user_agent, 'Chrome' )) {
    $airpale_class = ' hidden';
    $airplane_src = 'airplane-placeholder-';
    $route_class = ' no-scale';
  } else {
    $airpale_class = '';
    $airplane_src = 'airplane-route-hero-';
    $route_class = '';
  }
  if ( $webp_support ) {
    // $data_src = str_replace( '.jpg', '.webp', $data_src );
    // $data_media = str_replace( '.jpg', '.webp', $data_media );
  } ?>
  
<section class="index-hero lazy" data-src="<?php echo $data_src ?>" data-media="<?php echo $data_media ?>">
  <div class="index-hero__airplane-route">
    <div class="index-hero__route"></div>
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane.svg" alt="" class="index-hero__airplane lazy">
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane.svg" alt="" class="index-hero__airplane lazy">
  </div>
  <div class="index-hero__airplane-route">
    <div class="index-hero__route"></div>
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane.svg" alt="" class="index-hero__airplane lazy">
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane.svg" alt="" class="index-hero__airplane lazy">
  </div>
  <div class="index-hero__airplane-route">
    <div class="index-hero__route"></div>
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane.svg" alt="" class="index-hero__airplane lazy">
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane.svg" alt="" class="index-hero__airplane lazy">
  </div>
  <h1 class="index-hero__title"><?php echo $sect_title ?></h1> <?php
  if ( $sect_link ) : ?>
    <a href="<?php echo $sect_link['url'] ?>" class="index-hero__btn btn btn_orange"><?php echo $sect_link['title'] ?></a> <?php
  endif ?>
  <img src="#" data-src="<?php echo $template_directory ?>/img/index-hero-img.png" alt="" class="index-hero__img lazy">
</section> <?php
unset( $data_src );
unset( $data_media ) ?>