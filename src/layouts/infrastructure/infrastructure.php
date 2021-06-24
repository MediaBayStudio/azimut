<section class="infrastructure">
  <h2 class="infrastructure__title"><?php echo $sect['sect_title'] ?></h2> <?php
  foreach ( $sect['sect_text'] as $p ) : ?>
    <p class="infrastructure__p"><?php echo $p['p'] ?></p> <?php
  endforeach ?>
  <div class="infrastructure__images" id="infrastructure-slider"> <?php
    foreach ( $sect['images'] as $img ) : ?>
      <a data-fancybox="images" href="<?php echo $img['big'] ?>" class="infrastructure__img-wrap"><img src="<?php echo $img['small'] ?>" alt="" class="infrastructure__img"></a> <?php
    endforeach ?>
    <div class="infrastructure-slider__nav"></div>
  </div>
  <img src="<?php echo $template_directory ?>/img/map.jpg" alt="" class="infrastructure__map">
</section>