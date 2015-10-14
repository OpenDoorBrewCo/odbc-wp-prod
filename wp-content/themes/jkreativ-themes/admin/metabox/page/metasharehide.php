<?php

return array(
	'id'          => 'jkreativ_page_share',
	'types'       => array('page'),
	'title'       => 'Jkreativ Page Meta (Share Button)',
	'priority'    => 'high',
	'template'    => array(
		array(
			'type' => 'toggle',
			'name' => 'hide_share_button',
			'label' => 'Hide Share Button',
			'description' => 'hide share button',
		),	
	),
);