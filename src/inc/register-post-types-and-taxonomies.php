<?php

add_action( 'init', function() {

  register_post_type( 'products', [
    'label'  => null,
    'labels' => [
      'name'               => 'Продукция',
      'singular_name'      => 'Продукт',
      'add_new'            => 'Добавить',
      'add_new_item'       => 'Добавление',
      'edit_item'          => 'Редактирование',
      'new_item'           => 'Новое ',
      'view_item'          => 'Смотреть',
      'search_items'       => 'Искать',
      'not_found'          => 'Не найдено',
      'not_found_in_trash' => 'Не найдено в корзине',
      'parent_item_colon'  => '',
      'menu_name'          => 'Продукция',
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null,
    'show_in_rest'        => null,
    'rest_base'           => null,
    'menu_position'       => null,
    'menu_icon'           => null,
    'hierarchical'        => false,
    'supports'            => [ 'title', 'editor' ],
    'taxonomies'          => [ 'products_category' ],
    'has_archive'         => false,
    'rewrite'             => true,
    'query_var'           => true
  ] );

  register_taxonomy( 'products_category', [ 'products' ], [ 
    'label'                 => '',
    'labels'                => [
      'name'              => 'Категории',
      'singular_name'     => 'Категория',
      'search_items'      => 'Искать',
      'all_items'         => 'Показать все',
      'view_item '        => 'Показать',
      'parent_item'       => 'Роидетель',
      'parent_item_colon' => 'Роидетель:',
      'edit_item'         => 'Редактирование',
      'update_item'       => 'Обновить',
      'add_new_item'      => 'Добавить новый',
      'new_item_name'     => 'Имя',
      'menu_name'         => 'Категории',
    ],
    'description'           => '',
    'public'                => true,
    'hierarchical'          => true,
    'rewrite'               => true,
    'capabilities'          => [],
    'meta_box_cb'           => null,
    'show_admin_column'     => false,
    'show_in_rest'          => null,
    'rest_base'             => null
  ] );

  register_post_type( 'partners', [
    'label'  => null,
    'labels' => [
      'name'               => 'Партнеры',
      'singular_name'      => 'Партнер',
      'add_new'            => 'Добавить',
      'add_new_item'       => 'Добавление',
      'edit_item'          => 'Редактирование',
      'new_item'           => 'Новое ',
      'view_item'          => 'Смотреть',
      'search_items'       => 'Искать',
      'not_found'          => 'Не найдено',
      'not_found_in_trash' => 'Не найдено в корзине',
      'parent_item_colon'  => '',
      'menu_name'          => 'Партнеры',
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null,
    'show_in_rest'        => null,
    'rest_base'           => null,
    'menu_position'       => null,
    'menu_icon'           => null,
    'hierarchical'        => false,
    'supports'            => [ 'title', 'thumbnail' ],
    'taxonomies'          => [],
    'has_archive'         => false,
    'rewrite'             => true,
    'query_var'           => true
  ] );



});