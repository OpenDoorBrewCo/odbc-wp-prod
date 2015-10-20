<?php
/**
 * Import Location(s) Tool.
 * @package Maps
 * @author Flipper Code <hello@flippercode.com>
 */

$form = new Responsive_Markup();
$form->set_header( __( 'Import Locations', WPGMP_TEXT_DOMAIN ),$response );
$form->add_element('message','import_message',array(
	'value' => __( "You must have latitude and longitude in the file and columns should be match exactly with <a href='".WPGMP_URL.'assets/import_sample_files.zip'."'>sample file</a>." ),
	'class' => 'alert alert-success',
	'before' => '<div class="col-md-11">',
	'after' => '</div>'
));
$form->add_element( 'radio', 'wpgmp_import_mode', array(
	'lable' => __( 'Choose', WPGMP_TEXT_DOMAIN ),
	'radio-val-label' => array( 'wpgmp_delete' => __( 'Delete Current Locations',WPGMP_TEXT_DOMAIN ),'wpgmp_append' => __( 'Append to Current Locations',WPGMP_TEXT_DOMAIN ) ),
	'current' => $data['map_layer_setting']['temp'],
	'desc' => __( 'Please select temperature unit.', WPGMP_TEXT_DOMAIN ),
	'class' => 'chkbox_class inline',
	'show' => 'false',
));
$form->add_element('file','import_file',array(
	'label' => __( 'Choose File',WPGMP_TEXT_DOMAIN ),
	'class' => 'file_input',
	'desc' => __( 'Please upload CSV, XML, JSON OR EXCEL file. Download sample files for correct format of the files.',WPGMP_TEXT_DOMAIN ),
));
$form->add_element('submit','import_loc',array(
	'value' => __( 'Import Locations',WPGMP_TEXT_DOMAIN ),
));
$form->add_element('hidden','operation',array(
	'value' => 'import_location',
));
$form->add_element('hidden','import',array(
	'value' => 'location_import',
));
$form->render();
