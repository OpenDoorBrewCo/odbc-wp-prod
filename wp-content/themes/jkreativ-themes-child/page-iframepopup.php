<?php
	/*
		Template Name: iFrame Popup
	*/
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
	
		<!--ID Check Files-->
		<!--<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/ODBC_Master_Styles.css">-->
		<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/css/Id_Check.css">
		<!--link rel="stylesheet" href="<?php get_stylesheet_directory_uri() ; ?>/js/jquery/jquery-1.11.0.min.js">-->
	</head>
	<?php the_post(); ?>

	<div id='main-content'>
		<div class="entry">

			<?php the_content(); ?>

		</div>
	</div>

</html>