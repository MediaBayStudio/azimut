<?php 
  $sect_title_tag = is_front_page() ? 'h2' : 'h1';
  $sect_title = $sect['sect_title'];
  $sect_link = $sect['sect_link'];
  $sect_descr = $sect['sect_descr'];
  $production_categories = $sect['sect_categories'] // Категории продуктов ?>
<section class="production container"> <?php
  echo "<{$sect_title_tag} class=\"production__title\">{$sect_title}</{$sect_title_tag}>";
  if ( $sect_link ) : ?>
  <a href="<?php echo $sect_link['url'] ?>" class="production__link"><?php echo $sect_link['title'] ?></a> <?php
  endif;
  if ( $sect_descr ) : ?>
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
  }

  // Получаем все записи, фильтруя по массиву таксономий
  $products = get_posts( [
    'post_type' => 'products',
    'numberposts' => -1,
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
  } ?>
  <div class="products"> <?php
  // Выводим карточки с продукцией
  // Контент будем получать по ID записи
  // ID записи сохраним в data-id
    foreach ( $terms_obj as $term ) :
      $term_obj = $term['term_obj']; // Для сокращения записи
      $term_img = get_field( 'term_img', $term_obj ) // Иконка категории ?>
      <div class="product">
        <img src="<?php echo $term_img ?>" alt="" class="product__img">
        <span class="product__title"><?php echo $term_obj->name ?></span>
        <div class="product__list-wrap">
          <ul class="product__list"> <?php
            foreach ( $term['posts'] as $post ) : ?>
              <li class="product__li" data-id="<?php echo $post->ID ?>"><?php echo $post->post_title ?></li> <?php
            endforeach ?>
          </ul>
        </div>
      </div> <?php
    endforeach ?>
  </div>
</section>