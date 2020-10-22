<?phpphp

// Функция подключения стилей
function enqueue_style( $style_name, $widths ) {
  global $template_directory;

  if ( is_string( $widths ) ) {
    if ( $style_name === 'hover' ) {
      wp_enqueue_style( "{$style_name}", $template_directory . "/css/{$style_name}.css", [], null, "(hover), (min-width:1024px)" );
    } else {
      wp_enqueue_style( "{$style_name}", $template_directory . "/css/{$style_name}.css", [], null );
    }
  } else {
    foreach ( $widths as $width ) {
      if ( $width !== "0" ) {
        $media = $width - 0.02;
         // если размер файла равен 0, то не подключаем его
        if ( filesize( get_template_directory() . '/css/' . $style_name . '.' . $width . '.css' ) === 0 ) {
          continue;
        }
        wp_enqueue_style( "{$style_name}-{$width}px", $template_directory . "/css/{$style_name}.{$width}.css", [], null, "(min-width: {$media}px)" );
      } else {
        wp_enqueue_style( "{$style_name}-page", $template_directory . "/css/{$style_name}.css", [], null );
      }
    }
  }
}

// Подключаем свои стили и скрипты
add_action( 'wp_enqueue_scripts', function() {
  $screen_widths = ['0', '420', '576', '768', '1024', '1440']; // на каких экранах подключать css

  wp_enqueue_style( 'theme-style', get_stylesheet_uri(), [], null );        // подключить стиль темы (default)

  // подключаем стили с помощью своей функции
  enqueue_style( 'style', $screen_widths );

  #!!!styles

  enqueue_style( 'hover', '' ); // подключаем стили для эффектов при наведении

  // Подключаем скрипты циклом
  $scripts = [
				'slick.min',
			'lazy.min',
			'MobileMenu.min',
			'svg4everybody.min',
			'main'
		];

  foreach ( $scripts as $script_name ) {
    wp_enqueue_script( "{$script_name}", $template_directory . "/js/{$script_name}.js", [], null );
  }

  // Отключаем стандартные jquery, jquery-migrate
  // лучше подключать свой jquery
  wp_deregister_script( 'jquery-core' );
  wp_deregister_script( 'jquery' );

  // Подключаем свой jquery
  wp_register_script( 'jquery-core', $template_directory . '/js/jquery-3.4.1.min.js', false, null, true );
  wp_register_script( 'jquery', false, ['jquery-core'], null, true );
  wp_enqueue_script( 'jquery' );

} );

// Убираем id и type в тегах script, добавляем нужным атрибут defer
  add_filter( 'script_loader_tag',   function( $html, $handle ) {

    $defer_scripts = [
				'slick.min',
			'lazy.min',
			'MobileMenu.min',
			'svg4everybody.min',
			'main'
		];

    foreach( $defer_scripts as $id ) {
      if ( $id === $handle ) {
        $html = str_replace( ' src', ' defer src', $html );
      }
    }

    $html = str_replace( " id='$handle-js' ", '', $html );
    $html = str_replace( " type='text/javascript'", '', $html );

     return $html;
  }, 10, 2);

// Убираем id и type в тегах style
  add_filter( 'style_loader_tag', function( $html, $handle ) {
    // Подключаем стили гутенберга только в админке
    // global $is_admin;
    // if ( $hanlde === 'wp-block-library' && !$is_admin ) {
    //   return '';
    // }
    $html = str_replace( " id='$handle-css' ", '', $html );
    $html = str_replace( " type='text/css'", '', $html );
    return $html;
  }, 10, 2 );