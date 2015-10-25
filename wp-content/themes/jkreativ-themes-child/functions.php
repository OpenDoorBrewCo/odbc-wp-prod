<?php

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style( 'child-style', get_stylesheet_uri(), array( 'parent-style' ) );
}
// Load jQuery
if ( !is_admin() ) {
   wp_deregister_script('jquery');
   wp_register_script('jquery', ("https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"), false);
   wp_enqueue_script('jquery');
}

//wp_register_script('AgeCheck', get_stylesheet_directory_uri()."/js/AgeCheck.js");
//wp_enqueue_script('AgeCheck');

wp_register_script('jqueryCookie', get_stylesheet_directory_uri()."/js/jquery/jquery.cookie.js");
wp_enqueue_script('jqueryCookie');

wp_register_script('jquerySimpleModal', get_stylesheet_directory_uri()."/js/jquery/jquery.simplemodal.1.4.4.min.js");
wp_enqueue_script('jquerySimpleModal');

