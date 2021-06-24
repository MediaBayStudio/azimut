<section class="contacts-hero">
  <h1 class="contacts-hero__title"><?php echo $sect['sect_title'] ?></h1>
  <div class="contacts-hero__wrap">
    <ul class="contacts-hero__list">
      <li class="contacts-hero__li"><b class="b">Отдел технической поддержки</b><?php echo $full_address ?></li>
      <li class="contacts-hero__li"><b class="b">Отдел разработки</b><?php echo $dev_address ?></li>
      <li class="contacts-hero__li">тел./факс: <a href="tel:<?php echo $tel_dry ?>" class="contacts-hero__tel"><?php echo $tel ?></a><br>тел. службы технической поддержки:<br><a href="tel:<?php echo $tel_support_1_dry ?>" class="contacts-hero__tel"><?php echo $tel_support_1 ?></a>, <br class="br3"><a href="tel:<?php echo $tel_support_2_dry ?>" class="contacts-hero__tel"><?php echo $tel_support_2 ?></a></li>
      <li class="contacts-hero__li"><a href="mailto:<?php echo $email_1 ?>" class="contacts-hero__email"><?php echo $email_1 ?></a><br><a href="mailto:<?php echo $email_2 ?>" class="contacts-hero__email"><?php echo $email_2 ?></a></li>
    </ul>
    <img src="#" data-src="<?php echo $template_directory ?>/img/contacts-hero-img.jpg" alt="" class="contacts-hero__img lazy">
  </div>
  <div class="contacts-hero__map" id="map" data-targets="2"></div>
</section>