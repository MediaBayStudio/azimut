<?php
/*
Template name: О компании
*/

get_header();

if ( is_front_page() ) {
  $route_class = 'index';
} else if ( is_page( 'about' ) ) {
  $route_class = 'about';
} else {
  $route_class = '';
}

if ( $route_class ) : ?>
  <div class="<?php echo $route_class ?>-airplane-route">
    <div class="<?php echo $route_class ?>-airplane-route__route"></div>
    <img src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane">
    <img src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane">
    <img src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane">
    <img src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane">
    <img src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane">
  </div> <?php
endif;

$sections = get_field( 'sections' );

foreach ( $sections as $sect ) {
  $sect_name = $sect['acf_fc_layout'];
  require $template_dir . '/template-parts/' . $sect_name . '.php';
}

get_footer();