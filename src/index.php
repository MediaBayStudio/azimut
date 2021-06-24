<?php
/*
Template name: Главная
*/

get_header();

if ( is_front_page() ) {
  $route_class = 'index';
} else if ( is_page( 'contacts' ) ) {
  $route_class = 'contacts';
} else {
  $route_class = '';
}

if ( $route_class ) : ?>
  <div class="<?php echo $route_class ?>-airplane-route">
    <div class="<?php echo $route_class ?>-airplane-route__route"></div>
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane lazy">
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane lazy">
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane lazy">
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane lazy">
    <img src="#" data-src="<?php echo $template_directory ?>/img/airplane-lightblue.svg" alt="" class="<?php echo $route_class ?>-airplane-route__airplane lazy">
  </div> <?php
endif;
$sections = get_field( 'sections' );

foreach ( $sections as $sect ) {
  $sect_name = $sect['acf_fc_layout'];
  require $template_dir . '/template-parts/' . $sect_name . '.php';
}

get_footer();