<?php 
  global 
    $template_directory,
    $template_dir,
    $tel,
    $tel_dry,
    $tel_support_1,
    $tel_support_1_dry,
    $tel_support_2,
    $tel_support_2_dry,
    $address,
    $full_address,
    $email_1,
    $email_2,
    $coords,
    $zoom ?>
<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, user-scalable=no, viewport-fit=cover">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="preload" href="<?php echo $template_directory ?>/css/style.css" as="style" />
  <!-- <link rel="preload" href="..." as="font" type="font/woff" crossorigin="anonymous"/> -->
  <!-- fonts preload -->
  <!-- favicons --> <?php
  wp_head() ?>
</head>

<body> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <div class="page-wrapper">
    <header class="hdr container">
      <a href="/" class="hdr__logo" title="Перейти на главную">
        <img src="<?php echo $template_directory ?>/img/logo.svg" alt="" class="hdr__logo-img">
      </a>
      <button type="button" class="hdr__burger">
        <span class="hdr__burger-box">
          <span class="hdr__burger-inner"></span>
        </span>
      </button> <?php 
      wp_nav_menu( [
        'theme_location'  => 'header_menu',
        'container'       => 'nav',
        'container_class' => 'hdr__nav',
        'menu_class'      => 'nav__list',
        'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
      ] ) ?>
    </header>
    <div class="sections-wrapper">