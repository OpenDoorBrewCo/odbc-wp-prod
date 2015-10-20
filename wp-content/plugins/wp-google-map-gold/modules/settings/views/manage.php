<?php
/**
 * This class used to manage settings page in backend.
 * @author Flipper Code <hello@flippercode.com>
 * @version 1.0.0
 * @package Maps
 */

$form  = new Responsive_Markup();
$form->set_header( __( 'General Setting(s)', WPGMP_TEXT_DOMAIN ), $response );
$form->add_element('text','wpgmp_api_key',array(
	'lable' => __( 'Business API Key',WPGMP_TEXT_DOMAIN ),
	'value' => get_option( 'wpgmp_api_key' ),
	'desc' => __( 'Please insert here Api Key if you signup for google maps business api.', WPGMP_TEXT_DOMAIN ),
	));

$form->add_element( 'radio', 'wpgmp_scripts_place', array(
	'lable' => __( 'Include Scripts in ', WPGMP_TEXT_DOMAIN ),
	'radio-val-label' => array( 'header' => __( 'Header',WPGMP_TEXT_DOMAIN ),'footer' => __( 'Footer (Recommanded)',WPGMP_TEXT_DOMAIN ) ),
	'current' => get_option( 'wpgmp_scripts_place' ),
	'class' => 'chkbox_class',
	'default_value' => 'footer',
));

$form->add_element( 'group', 'location_extra_fields', array(
	'value' => __( 'Extra Field(s)', WPGMP_TEXT_DOMAIN ),
	'before' => '<div class="col-md-11">',
	'after' => '</div>',
));

$data['location_extrafields'] = unserialize(get_option('wpgmp_location_extrafields'));
if ( isset( $data['location_extrafields'] ) ) {
	foreach ( $data['location_extrafields'] as $i => $label ) {
		$form->set_col( 2 );
		$form->add_element( 'text', 'location_extrafields['.$i.']', array(
			'value' => (isset( $data['location_extrafields'][ $i ] ) and ! empty( $data['location_extrafields'][ $i ] )) ? $data['location_extrafields'][ $i ] : '',
			'desc' => '',
			'class' => 'location_newfields form-control',
			'placeholder' => __( 'Field Label', WPGMP_TEXT_DOMAIN ),
			'before' => '<div class="col-md-4">',
			'after' => '</div>',
			'desc' => __( 'Placehoder - ',WPGMP_TEXT_DOMAIN ).'{'.sanitize_title( $data['location_extrafields'][ $i ] ).'}',
		));
		$form->add_element( 'button', 'location_newfields_repeat['.$i.']', array(
			'value' => __( 'Remove',WPGMP_TEXT_DOMAIN ),
			'desc' => '',
			'class' => 'repeat_remove_button btn btn-info btn-sm',
			'before' => '<div class="col-md-4">',
			'after' => '</div>',
		));
	}
}

$form->set_col( 2 );
if ( isset( $data['location_extrafields'] ) ) {
	$next_index = count( $data['location_extrafields'] ) + 1; } else {
	$next_index = 0;
	}
	$form->add_element( 'text', 'location_extrafields['.$next_index.']', array(
		'value' => (isset( $data['location_extrafields'][ $next_index ] ) and ! empty( $data['location_extrafields'][ $next_index ] )) ? $data['location_extrafields'][ $next_index ] : '',
		'desc' => '',
		'class' => 'location_newfields form-control',
		'placeholder' => __( 'Field Label', WPGMP_TEXT_DOMAIN ),
		'before' => '<div class="col-md-4">',
		'after' => '</div>',
	));

$form->add_element( 'button', 'location_newfields_repeat', array(
	'value' => __( 'Add More...',WPGMP_TEXT_DOMAIN ),
	'desc' => '',
	'class' => 'repeat_button btn btn-info btn-sm',
	'before' => '<div class="col-md-4">',
	'after' => '</div>',
));


$form->set_col( 1 );

$form->add_element('submit','wpgmp_save_settings',array(
	'value' => __( 'Save Setting',WPGMP_TEXT_DOMAIN ),
	));
$form->add_element('hidden','operation',array(
	'value' => 'save',
	));
$form->add_element('hidden','page_options',array(
	'value' => 'wpgmp_api_key,wpgmp_scripts_place',
	));
$form->render();
