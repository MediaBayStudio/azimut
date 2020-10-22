<?php 
global
  $tel,
  $tel_dry,
  $address,
  $email_1,
  $coords,
  $zoom;

$sect_title = $sect['sect_title'] ?>

<section class="contacts">
  <h2 class="contacts__title"><?php echo $sect_title ?></h2>
  <ul class="contacts__list">
    <li class="contacts__li">тел./факс: <a href="tel:<?php echo $tel_dry ?>" class="contacts__tel"><?php echo $tel ?></a></li>
    <li class="contacts__li"><a href="mailto:<?php echo $email_1 ?>" class="contacts__tel"><?php echo $email_1 ?></a></li>
    <li class="contacts__li"><?php echo $address ?></li>
  </ul>
</section>