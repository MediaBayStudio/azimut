<section class="docs-sect">
  <h2 class="docs-sect__title"><?php echo $sect['sect_title'] ?></h2>
  <div class="docs-sect__docs" id="docs"> <?php
    foreach ( $sect['files'] as $file ) : ?>
      <a href="<?php echo $file['file']['url'] ?>" target="_blank" class="docs-sect__doc doc">
        <img src="<?php echo $file['img'] ?>" alt="<?php echo $file['title'] ?>" class="doc__img">
        <span class="doc__title"><?php echo $file['title'] ?></span>
      </a> <?php
    endforeach ?>
  </div>
  <div class="docs-sect__nav"></div>
</section>