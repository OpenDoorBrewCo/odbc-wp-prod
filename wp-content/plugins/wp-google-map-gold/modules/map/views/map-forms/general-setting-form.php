<?php
/**
 * Map's general setting(s).
 * @package Maps
 */

$form->add_element( 'text', 'map_title', array(
	'lable' => __( 'Map Title', WPGMP_TEXT_DOMAIN ),
	'value' => $data['map_title'],
	'desc' => __( 'Enter here the map title.', WPGMP_TEXT_DOMAIN ),
	'required' => true,
	'placeholder' => '',
));
$form->add_element( 'text', 'map_width', array(
	'lable' => __( 'Map Width', WPGMP_TEXT_DOMAIN ),
	'value' => $data['map_width'],
	'desc' => __( 'Enter here the map width in pixel. Leave it blank for 100% width.', WPGMP_TEXT_DOMAIN ),
	'placeholder' => '',
));
$form->add_element( 'text', 'map_height', array(
	'lable' => __( 'Map Height', WPGMP_TEXT_DOMAIN ),
	'value' => $data['map_height'],
	'desc' => __( 'Enter here the map height in pixel.', WPGMP_TEXT_DOMAIN ),
	'required' => true,
	'placeholder' => '',
));

$language = array(
'en' => __( 'ENGLISH', WPGMP_TEXT_DOMAIN ),
'ar' => __( 'ARABIC', WPGMP_TEXT_DOMAIN ),
'eu' => __( 'BASQUE', WPGMP_TEXT_DOMAIN ),
'bg' => __( 'BULGARIAN', WPGMP_TEXT_DOMAIN ),
'bn' => __( 'BENGALI', WPGMP_TEXT_DOMAIN ),
'ca' => __( 'CATALAN', WPGMP_TEXT_DOMAIN ),
'cs' => __( 'CZECH', WPGMP_TEXT_DOMAIN ),
'da' => __( 'DANISH', WPGMP_TEXT_DOMAIN ),
'de' => __( 'GERMAN', WPGMP_TEXT_DOMAIN ),
'el' => __( 'GREEK', WPGMP_TEXT_DOMAIN ),
'en-AU' => __( 'ENGLISH (AUSTRALIAN)', WPGMP_TEXT_DOMAIN ),
'en-GB' => __( 'ENGLISH (GREAT BRITAIN)', WPGMP_TEXT_DOMAIN ),
'es' => __( 'SPANISH', WPGMP_TEXT_DOMAIN ),
'fa' => __( 'FARSI', WPGMP_TEXT_DOMAIN ),
'fi' => __( 'FINNISH', WPGMP_TEXT_DOMAIN ),
'fil' => __( 'FILIPINO', WPGMP_TEXT_DOMAIN ),
'fr' => __( 'FRENCH', WPGMP_TEXT_DOMAIN ),
'gl' => __( 'GALICIAN', WPGMP_TEXT_DOMAIN ),
'gu' => __( 'GUJARATI', WPGMP_TEXT_DOMAIN ),
'hi' => __( 'HINDI', WPGMP_TEXT_DOMAIN ),
'hr' => __( 'CROATIAN', WPGMP_TEXT_DOMAIN ),
'hu' => __( 'HUNGARIAN', WPGMP_TEXT_DOMAIN ),
'id' => __( 'INDONESIAN', WPGMP_TEXT_DOMAIN ),
'it' => __( 'ITALIAN', WPGMP_TEXT_DOMAIN ),
'iw' => __( 'HEBREW', WPGMP_TEXT_DOMAIN ),
'ja' => __( 'JAPANESE', WPGMP_TEXT_DOMAIN ),
'kn' => __( 'KANNADA', WPGMP_TEXT_DOMAIN ),
'ko' => __( 'KOREAN', WPGMP_TEXT_DOMAIN ),
'lt' => __( 'LITHUANIAN', WPGMP_TEXT_DOMAIN ),
'lv' => __( 'LATVIAN', WPGMP_TEXT_DOMAIN ),
'ml' => __( 'MALAYALAM', WPGMP_TEXT_DOMAIN ),
'it' => __( 'ITALIAN', WPGMP_TEXT_DOMAIN ),
'mr' => __( 'MARATHI', WPGMP_TEXT_DOMAIN ),
'nl' => __( 'DUTCH', WPGMP_TEXT_DOMAIN ),
'no' => __( 'NORWEGIAN', WPGMP_TEXT_DOMAIN ),
'pl' => __( 'POLISH', WPGMP_TEXT_DOMAIN ),
'pt' => __( 'PORTUGUESE', WPGMP_TEXT_DOMAIN ),
'pt-BR' => __( 'PORTUGUESE (BRAZIL)', WPGMP_TEXT_DOMAIN ),
'pt-PT' => __( 'PORTUGUESE (PORTUGAL)', WPGMP_TEXT_DOMAIN ),
'ro' => __( 'ROMANIAN', WPGMP_TEXT_DOMAIN ),
'ru' => __( 'RUSSIAN', WPGMP_TEXT_DOMAIN ),
'sk' => __( 'SLOVAK', WPGMP_TEXT_DOMAIN ),
'sl' => __( 'SLOVENIAN', WPGMP_TEXT_DOMAIN ),
'sr' => __( 'SERBIAN', WPGMP_TEXT_DOMAIN ),
'sv' => __( 'SWEDISH', WPGMP_TEXT_DOMAIN ),
'tl' => __( 'TAGALOG', WPGMP_TEXT_DOMAIN ),
'ta' => __( 'TAMIL', WPGMP_TEXT_DOMAIN ),
'te' => __( 'TELUGU', WPGMP_TEXT_DOMAIN ),
'th' => __( 'THAI', WPGMP_TEXT_DOMAIN ),
'tr' => __( 'TURKISH', WPGMP_TEXT_DOMAIN ),
'uk' => __( 'UKRAINIAN', WPGMP_TEXT_DOMAIN ),
'vi' => __( 'VIETNAMESE', WPGMP_TEXT_DOMAIN ),
'zh-CN' => __( 'CHINESE (SIMPLIFIED)', WPGMP_TEXT_DOMAIN ),
'zh-TW' => __( 'CHINESE (TRADITIONAL)', WPGMP_TEXT_DOMAIN ),
);

$form->add_element( 'select', 'map_all_control[wpgmp_language]', array(
	'lable' => __( 'Map Language', WPGMP_TEXT_DOMAIN ),
	'current' => $data['map_all_control']['wpgmp_language'],
	'desc' => __( 'Choose your language for map. Default is English.', WPGMP_TEXT_DOMAIN ),
	'options' => $language,
));

$zoom_level = array();
for ( $i = 1; $i < 20; $i++ ) {
	$zoom_level[ $i ] = $i;
}
$form->add_element( 'select', 'map_zoom_level', array(
	'lable' => __( 'Map Zoom Level', WPGMP_TEXT_DOMAIN ),
	'current' => $data['map_zoom_level'],
	'desc' => __( 'Available options 1 to 19.', WPGMP_TEXT_DOMAIN ),
	'options' => $zoom_level,
));
$map_type = array( 'ROADMAP' => 'ROADMAP','SATELLITE' => 'SATELLITE','HYBRID' => 'HYBRID','TERRAIN' => 'TERRAIN' );
$form->add_element( 'select', 'map_type', array(
	'lable' => __( 'Map Type', WPGMP_TEXT_DOMAIN ),
	'current' => $data['map_type'],
	'desc' => __( 'Available options 1 to 19.', WPGMP_TEXT_DOMAIN ),
	'options' => $map_type,
));

$form->add_element( 'checkbox', 'map_scrolling_wheel', array(
	'lable' => __( 'Turn Off Scrolling Wheel', WPGMP_TEXT_DOMAIN ),
	'value' => 'false',
	'id' => 'wpgmp_map_scrolling_wheel',
	'current' => $data['map_scrolling_wheel'],
	'desc' => __( 'Please check to disable scroll wheel zoom.', WPGMP_TEXT_DOMAIN ),
	'class' => 'chkbox_class ',
));
$form->add_element( 'checkbox', 'map_all_control[map_draggable]', array(
	'lable' => __( 'Map Draggable', WPGMP_TEXT_DOMAIN ),
	'value' => 'false',
	'id' => 'wpgmp_map_draggable',
	'current' => $data['map_all_control']['map_draggable'],
	'desc' => __( 'Please check to disable map draggable.', WPGMP_TEXT_DOMAIN ),
	'class' => 'chkbox_class',
));

$form->add_element( 'checkbox', 'map_45imagery', array(
	'lable' => __( '45&deg; Imagery', WPGMP_TEXT_DOMAIN ),
	'value' => '45',
	'id' => 'wpgmp_map_45imagery',
	'current' => $data['map_45imagery'],
	'desc' => __( 'Apply 45&deg; Imagery ? (only available for map type SATELLITE and HYBRID).', WPGMP_TEXT_DOMAIN ),
	'class' => 'chkbox_class',
));

