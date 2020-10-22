<?php
$template_directory = get_template_directory_uri();
$template_dir = get_template_directory();
// $wp_content_dir = content_url();
// $site_url = site_url();
// $is_front_page = is_front_page();
// $is_404 = is_404();
// $is_category = is_category();

$tel = get_option( 'contacts_tel' );
$tel_dry = preg_replace( '/\s/', '', $tel );

$tel_support_1 = get_option( 'contacts_tel_support_1' );
$tel_support_1_dry = preg_replace( '/\s/', '', $tel_support_1 );

$tel_support_2 = get_option( 'contacts_tel_support_2' );
$tel_support_2_dry = preg_replace( '/\s/', '', $tel_support_2 );

$address = get_option( 'contacts_address' );
$full_address = get_option( 'contacts_full_address' );
$email_1 = get_option( 'contacts_email_1' );
$email_2 = get_option( 'contacts_email_2' );
$coords = get_option( 'contacts_coords' );
$zoom = get_option( 'contacts_zoom' );

// Проверка поддержки webp браузером
if ( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], ' Chrome/' ) !== false ) {
  $webp_support = true; // webp поддерживается
} else {
  $webp_support = false; // webp не поддерживается
}

// Удаление разных скриптов и стилей от wp
// Отключаем гутенберг
// Отключаем emoji
// Отключаем весь css-файл CF7
// Отключаем генерацию некоторых лишнех тегов
require $template_dir . '/inc/disable-wp-scripts-and-styles.php';

// Поддержки темой, настройка thumbnails
require $template_dir . '/inc/theme-support-and-thumbnails.php';

// Подключение стилей и скриптов, чистка лишнего в html-тегах, настройка атрибутов
require $template_dir . '/inc/enqueue-styles-and-scripts.php';

// Настройка доп. полей в панели настройки->общее
require $template_dir . '/inc/options-fields.php';

// Подключение и настройка меню, атрибутов, классов, id
require $template_dir . '/inc/menus.php';

// Вставка секций в тело страниц
require $template_dir . '/inc/get-sections.php';

// Регистрация новых типов - продукция и категории
require $template_dir . '/inc/register-post-types-and-taxonomies.php';

