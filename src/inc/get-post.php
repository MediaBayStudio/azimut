<?php
if ( $_POST && $_POST['action'] === 'get_post_by_id') {
  add_action('wp_ajax_nopriv_get_post_by_id', 'get_post_by_id');
  add_action('wp_ajax_get_post_by_id', 'get_post_by_id');
}

function get_post_by_id() {
  $post = get_post( $_POST['post_id'] );
  if ( $post ) {
    echo json_encode( $post );
  } else {
    echo 0;
  }
  if ( $_POST && $_POST['action'] === 'get_post_by_id') {
    die();
  }
}