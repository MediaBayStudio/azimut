<?php 
  $sect_title = $sect['sect_title'];
  $btn_text = $sect['btn_text'];
  $btn_target = $sect['btn_target'];
 ?>
<section class="index-hero container">
  <h1 class="index-hero__title"><?php echo $sect_title ?></h1>
  <button type="button" class="index-hero__btn" data-scroll-target="<?php echo $btn_target ?>"><?php echo $btn_text ?></button>
</section>