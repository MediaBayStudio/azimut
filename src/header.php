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
    $dev_address,
    $email_1,
    $email_2,
    $coords,
    $site_url,
    $zoom ?>
    
<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- fonts preload --> <?php
  $fonts = [
    'NotoSans-Bold.woff',
    'NotoSans-Regular.woff',
    'Rubik-Bold.woff',
    'Rubik-Regular.woff',
    'SegoeUI-SemiBold.woff'
  ];
  foreach ( $fonts as $font ) : ?>
    
  <link rel="preload" href="<?php echo $template_directory . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
  endforeach ?>

  <!-- css preload -->
  <link rel="preload" href="<?php echo $template_directory ?>/style.css" as="style"/>
  <link rel="preload" href="<?php echo $template_directory ?>/css/style.css" as="style"/> <?php
  if ( is_page( 'contacts' ) ) {
    echo "
  <link rel=\"preload\" href=\"{$template_directory}/css/fancybox.min.css\" as=\"style\"/>
";
  } ?>
  <!-- favicons -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#f57019">
  <meta name="theme-color" content="#ffffff">
  <style>
    #preloader.loaded {
      opacity:0;
      visibility:hidden;
    }
  </style>
  <?php
  wp_head() ?>
</head>

<body class="loading" data-page-url="<?php echo $site_url ?>" data-template-directory="<?php echo $template_directory ?>" id="<?php echo $post->post_name ?>"> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <div id="preloader" style="display:flex;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0b4560;z-index:102;transition:opacity.5s,visibility.5s;">
    <img src="<?php echo $template_directory ?>/img/logo-white.svg" alt="" style="margin:auto;flex-shrink:0;object-fit:contain;">
  </div>
  <div class="page-wrapper">
    <header class="hdr container" id="hdr">
      <p class="hdr__address"><?php echo $dev_address ?></p>
      <a href="tel:<?php echo $tel_dry ?>" class="hdr__tel"><?php echo $tel_dry ?></a>
      <a href="/" class="hdr__logo" title="Перейти на главную">
        <img src="#" data-src="<?php echo $template_directory ?>/img/logo-blue.svg" alt="Логотип Азимут Альянс" class="hdr__logo-img lazy">
      </a>
      <button type="button" class="hdr__burger" id="hdr-burger">
        <span class="hdr__burger-box">
          <span class="hdr__burger-inner"></span>
        </span>
      </button> <?php
      require 'template-parts/mobile-menu.php' ?>
    </header>
    <div class="sections-wrapper">