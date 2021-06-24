        <?php global $template_directory, $tel_dry, $tel, $full_address, $dev_address, $coords, $zoom ?>
        <footer class="ftr">
          <div class="ftr__top">
            <a href="/" class="ftr__logo">
              <img src="<?php echo $template_directory ?>/img/logo-blue.svg" alt="" class="ftr__logo-img">
            </a>
            <div class="ftr__copy">
              <span class="ftr__copy-top"><?php echo date( 'Y' ) ?> &copy; ЗАО <q>Азимут-Альянс</q></span>
              <span class="ftr__copy-bottom">Все права защищены</span>
            </div>
          </div> <?php
            wp_nav_menu( [
              'theme_location'  => 'footer_menu',
              'container'       => 'nav',
              'container_class' => 'ftr__nav',
              'menu_class'      => 'ftr__nav-list',
              'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
            ] ) ?>
          <ul class="ftr__contacts-list">
            <li class="ftr__contacts-li"><?php echo $full_address ?></li>
            <li class="ftr__contacts-li">тел./факс: <a href="tel:<?php echo $tel_dry ?>" class="ftr__contacts-tel"><?php echo $tel ?></a></li>
          </ul>
          <div class="ftr__bottom">
            <a href="/policy.pdf" rel="noopener noreferrer nofollow" target="_blank" class="ftr__policy" title="Посмотреть политику конфиденциальности">Политика конфиденциальности</a>
            <div class="ftr__dev">
            Дизайн и разработка – <a href="https://media-bay.ru" target="_blank" class="ftr__dev-link" title="Перейти на сайт разработчика">media bay</a>
            </div>
          </div>
        </footer>
      </div> <!-- sections-wrapper -->
    </div> <!-- page-wrapper -->
    <div id="fake-scrollbar"></div> <?php
    wp_footer();
    require 'template-parts/product-popup.php' ?>
    <script>
      var targetsNum,target1Coords,target2Coods,centerCords,target1Data,target2Data,mapZoom,mapBlock=document.getElementById("map");function ymapsOnload(){ymaps.ready(function(){1==targetsNum?(data=[target1Data],centerCords=target1Coords):data=[target1Data,target2Data];var t=new ymaps.Map("map",{center:[centerCords.a,centerCords.b],zoom:mapZoom,controls:["zoomControl"]},{searchControlProvider:"yandex#search",suppressMapOpenBlock:!0}),e=new ymaps.ObjectManager({clusterize:!1,gridSize:32,clusterDisableClickZoom:!0});e.objects.options.set("iconLayout","default#image"),e.objects.options.set("iconImageHref","<?php echo $template_directory ?>/img/placemark.svg"),e.objects.options.set("iconImageSize",[26,40]),t.geoObjects.add(e),e.add(data),t.panes.get("ground").getElement().style.filter="grayscale(100%)"})}mapBlock&&(targetsNum=mapBlock.getAttribute("data-targets"),target2Coods={a:"59.961191",b:"30.401919"},centerCords={a:"59.960225",b:"30.404312"},target1Data={type:"Feature",id:0,geometry:{type:"Point",coordinates:[(target1Coords={a:"59.959597",b:"30.406391"}).a,target1Coords.b]},properties:{balloonContentHeader:'<p style="color:#0B4560;font-size:15px;"><b>Отдел разработки ЗАО <q>Азимут-Альянс</q></b></p>',balloonContentBody:"<p>г. Санкт‑Петербург, пр. Пискаревский, д. 2, корп. З, лит. А, пом. 727</p>",hintContent:'<strong style="color:#0B4560;padding:5px;background:#fff">Отдел разработки</strong>'}},target2Data={type:"Feature",id:1,geometry:{type:"Point",coordinates:[target2Coods.a,target2Coods.b]},properties:{balloonContentHeader:'<p style="color:#0B4560;font-size:15px;"><b>Отдел технической поддержки ЗАО <q>Азимут-Альянс</q></b></p>',balloonContentBody:"<p>г. Санкт‑Петербург, Свердловская наб., д. 44, лит. Ю, БЦ «Зима», оф. 303</p>",hintContent:'<strong style="color:#0B4560;padding:5px;background:#fff">Отдел технической поддержки</strong>'}},mapZoom=15);
    </script>
  </body>
</html>