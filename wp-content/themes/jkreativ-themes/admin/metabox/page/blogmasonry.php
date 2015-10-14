<?php

return array(
	'id'          => 'jkreativ_page_blogmasonry',
	'types'       => array('page'),
	'title'       => 'Jkreativ Blog Masonry',
	'priority'    => 'high',
	'template'    => array(		
		array(
			'type' => 'toggle',
			'name' => 'hide_filter',
			'label' => 'Hide Blog Masonry Filter',
			'description' => 'Check this option to hide filter Head',
		),
	),
);