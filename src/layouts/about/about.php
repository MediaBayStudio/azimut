<?php 
  $sect_title = $sect['sect_title'];
  $sect_descr = $sect['sect_descr'];
  $gallery = $sect['gallery'];
  $features = $sect['features'];
  $partners = $sect['partners'] ?>
<section class="about">
  <div class="about__gallery" id="about-gallery">
    <div class="about-gallery__nav"></div> <?php
    $gallery_count = count( $gallery );
    foreach ( $gallery as $image ) : 
      $src = $image['url'];
      $alt = $image['alt'];

      // if ( $gallery_count > 1 ) {
      //   $img_lazy_attr = 'data-lazy="' . $src . '"';
      //   $lazy_class = '';
      // } else {
        $img_lazy_attr = 'data-src="' . $src . '"';
        $lazy_class = ' lazy';
      // }

      if ( !$alt ) {
        $alt = $sect_title;
      } ?>
      <img src="#" <?php echo $img_lazy_attr ?> alt="<?php echo $alt ?>" class="about-gallery__img<?php echo $lazy_class ?>"> <?php
    endforeach ?>
  </div>
  <h2 class="about__title"><?php echo $sect_title ?></h2>
  <p class="about__descr"><?php echo $sect_descr ?></p>
  <div class="about__feats feats"> <?php
    foreach ( $features as $feat ) : ?>
      <div class="feat">
        <span class="feat__top"><?php echo $feat['top_text'] ?></span>
        <span class="feat__bottom"><b><?php echo $feat['bottom_text'] ?></b></span>
      </div> <?php
    endforeach ?>
  </div>
  <div class="about__partners">
    <span class="partners__title">Компании-партнеры</span>
    <div class="partners-slider" id="partners-slider"> <?php
      $partners_count = count( $partners );
      foreach ( $partners as $partner ) :
        $src = get_the_post_thumbnail_url( $partner );
        $alt = $partner->post_title;
        $title = get_field( 'title', $partner );
        if ( !$title ) {
          $title = $alt;
        }
        // if ( $partners_count > 1 ) {
        //   $img_lazy_attr = 'data-lazy="' . $src . '"';
        //   $lazy_class = '';
        // } else {
          $img_lazy_attr = 'data-src="' . $src . '"';
          $lazy_class = ' lazy';
        // } ?>
        <img src="#" <?php echo $img_lazy_attr ?> alt="<?php echo $alt ?>" title="<?php echo $title ?>" class="partners-slider__slide<?php echo $lazy_class ?>"> <?php
      endforeach ?>
      <div class="partners-slider__nav"></div>
    </div>
  </div>
</section>