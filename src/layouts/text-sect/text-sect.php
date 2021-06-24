<section class="text-sect">
  <h2 class="text-sect__title"><?php echo $sect['sect_title'] ?></h2> <?php
  if ( $sect['link'] ) :?>
    <a href="<?php echo $sect['link']['url'] ?>" class="text-sect__link" target="_blank"><span class="text-sect__link-text"><?php echo $sect['link']['title'] ?></span><svg class="text-sect__link-img"><use xlink:href="<?php echo $template_directory ?>/img/icon-up-arrow.svg#i"></use></svg></a> <?php
  endif ?>
  <div class="text-sect__text"> <?php
    foreach ( $sect['sect_text'] as $p ) : ?>
      <p class="text-sect__p"><?php echo $p['p'] ?></p> <?php
    endforeach ?>
  </div>
</section>