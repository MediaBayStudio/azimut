<section class="about-hero">
  <h2 class="about-hero__title"><?php echo $sect['sect_title'] ?></h2>
  <p class="about-hero__descr"><?php echo $sect['sect_descr'] ?></p>
  <div class="about-hero__feats feats"> <?php
    foreach ( $sect['features'] as $feat ) : ?>
      <div class="feat">
        <span class="feat__top"><?php echo $feat['top_text'] ?></span>
        <span class="feat__bottom"><b><?php echo $feat['text_bottom'] ?></b></span>
      </div> <?php
    endforeach ?>
  </div>
</section>