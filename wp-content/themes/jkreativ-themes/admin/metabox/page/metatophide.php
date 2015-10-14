<?php

return array(
	'id'          => 'jkreativ_page_meta_top',
	'types'       => array('page'),
	'title'       => 'Jkreativ Page Meta (Top Meta)',
	'priority'    => 'high',
	'template'    => array(
		array(
			'type' => 'toggle',
			'name' => 'hide_top_meta',
			'label' => 'Hide Page Top Meta',
			'description' => 'this meta can contain date, author, and other',
		),
	),
);