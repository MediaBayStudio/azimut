<section class="partners-sect">
  <h2 class="partners-sect__title"><?php echo $sect['sect_title'] ?></h2>
  <div class="partners-sect__text-cnt"> <?php
    echo $sect['text'] ?>
  </div>
  <div class="partners-sect__partners"> <?php
    $partners = get_posts( [
      'post_type' => 'partners',
      'include' => $sect['partners'],
      'order' => 'asc'
    ] );

    foreach ( $partners as $partner ) : 
      $src = get_the_post_thumbnail_url( $partner );
      $alt = $partner->post_title;
      $title = get_field( 'title', $partner );
      if ( !$title ) {
        $title = $alt;
      } ?>
      <img src="<?php echo $src ?>" alt="<?php echo $alt ?>" title="<?php echo $title ?>" class="partners-sect__partner"> <?php
    endforeach ?>
  </div>
</section>