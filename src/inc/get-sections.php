<?php

function get_sections() {
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
    $zoom;
  
  $sections = get_field( 'sections' );

  foreach ( $sections as $sect ) {
    $sect_name = $sect['acf_fc_layout'];
    require $template_dir . '/template-parts/' . $sect_name . '.php';
  }

}