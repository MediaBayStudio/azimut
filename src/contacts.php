<?php
/*
Template name: Контакты
*/

get_header();

$sections = get_field( 'sections' );

foreach ( $sections as $sect ) {
  $sect_name = $sect['acf_fc_layout'];
  require $template_dir . '/template-parts/' . $sect_name . '.php';
}

get_footer();