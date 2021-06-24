<?php 
  $sect_title_tag = is_front_page() ? 'h2' : 'h1';
  $sect_title = $sect['sect_title'];
  $sect_link = $sect['sect_link'];
  $sect_descr = $sect['sect_descr'];
  $production_categories = $sect['sect_categories'] // Категории продуктов ?>
<section class="production"> <?php
  echo "<{$sect_title_tag} class=\"production__title\">{$sect_title}</{$sect_title_tag}>";
  if ( $sect_link && is_front_page() ) : ?>
  <a href="<?php echo $sect_link['url'] ?>" class="production__link"><?php echo $sect_link['title'] ?></a> <?php
  endif;
  if ( $sect_descr && !is_front_page() ) : ?>
    <p class="production__descr"><?php echo $sect_descr ?></p> <?php
  endif;

  $terms_ids = [
    'ids' => [],
    'names' => []
  ];

  $terms_obj = [];

  // Собираем ID таксономий в массив для запроса get_posts
  // Собираем таксономии в объект для легкого доступа по ID в дальнейшем
    /*
      $terms = [
        3 => [  // ID таксономии
          'term_obj' => WP_Object_Term, // Объект таксономии (для get_field)
          'posts' => [] // Массив записей для этой таксономии
        ]  
      ]
    */

  foreach ( $production_categories as $category ) {
    $cat_id = $category->term_id;

    $terms_ids[] = $cat_id;
    $terms_obj[ $cat_id ]['term_obj'] = $category;
    // Сразу получим индекс для сортировки
    $terms_obj[ $cat_id ]['index'] = get_field( 'index', $category );
  }

  // Получаем все записи, фильтруя по массиву таксономий
  $products = get_posts( [
    'post_type' => 'products',
    'numberposts' => -1,
    'order' => 'ASC',
    'tax_query' => [
      [
        'taxonomy' => 'products_category',
        'terms' => $terms_ids
      ]
    ]
  ] );

  // У каждой записи проверяем таксономию и записываем эту запись в объект $terms_obj по ID таксономии
  foreach ( $products as $product ) { 
    $product_terms = get_the_terms( $product->ID, 'products_category' );
    foreach ( $product_terms as $term ) {
      $terms_obj[ $term->term_id ]['posts'][] = $product;
    }
  }

  // Сортируем категории по индексу, установленному в админке
  usort( $terms_obj, function( $a, $b ) {
    $a = (int)$a['index'];
    $b = (int)$b['index'];

    if ($a === $b) {
      return 0;
    }
    return ( $a < $b ) ? -1 : 1;
  } ) ?>
  <div class="products production__products" id="products"> <?php
  // Выводим карточки с продукцией
  // Контент будем получать по ID записи
  // ID записи сохраним в href
    foreach ( $terms_obj as $term ) :
      $term_obj = $term['term_obj']; // Для сокращения записи
      $term_img = get_field( 'term_img', $term_obj ); // Иконка категории
      $products = $term['posts'];
      // Если в категории есть хотя бы 1 продукт, то будем выводить
      if ( $products ) : ?>
        <div class="product" id="cat-<?php echo $term_obj->term_id ?>">
          <img src="#" data-src="<?php echo $term_img ?>" alt="<?php echo $term_obj->name ?>" class="product__img lazy">
          <span class="product__title"><?php echo $term_obj->name ?></span>
          <div class="product__list-wrap">
            <span class="product__list-title"><?php echo $term_obj->name ?></span>
            <ul class="product__ul"> <?php
              foreach ( $products as $product ) : ?>
                <li id="i<?php echo $product->ID ?>" class="product__li"><a href="#<?php echo $product->ID ?>" class="product__link"><?php echo wrap_words( '<span class="product__text">', $product->post_title, '</span>' ) ?></a></li> <?php
              endforeach ?>
            </ul>
          </div>
        </div> <?php
      endif;
    endforeach ?>
  </div>
</section>