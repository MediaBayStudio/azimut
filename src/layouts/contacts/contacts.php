<?php

$sect_title = $sect['sect_title'] ?>

<section class="contacts">
  <h2 class="contacts__title"><?php echo $sect_title ?></h2>
  <div class="contacts__wrap">
    <ul class="contacts__list">
      <li class="contacts__li">тел./факс: <a href="tel:<?php echo $tel_dry ?>" class="contacts__tel"><?php echo $tel ?></a></li>
      <li class="contacts__li"><a href="mailto:<?php echo $email_1 ?>" class="contacts__email"><?php echo $email_1 ?></a></li>
      <li class="contacts__li"><b class="b">Отдел технической поддержки</b><?php echo $full_address ?></li>
      <li class="contacts__li"><b class="b">Отдел разработки</b><?php echo $dev_address ?></li>
    </ul>
    <div class="contacts__map" id="map" data-targets="2"></div>
  </div>
</section>