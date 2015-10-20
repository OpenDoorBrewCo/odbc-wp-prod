<?php 
/**
 * This function used to import export all locations for this plugins.
 * @author Flipper Code <hello@flippercode.com>
 * @version 1.0.0
 * @package Maps
 */

$export_array = array(
  'location_title'        				=> 'Title',
  'location_address'      				=> 'Address',
  'location_latitude'     				=> 'Latitude',
  'location_longitude'    				=> 'Longitude',
  'location_city'         				=> 'City',
  'location_state'        				=> 'State',
  'location_country'      				=> 'Country',
  'location_postal_code'  				=> 'Postal Code',
  'location_messages'     				=> 'Message',
  'location_group_map'    				=> 'Category',
  'location_draggable'    				=> 'Draggable',
  'location_settings'     				=> 'Disable Infowindow',
  'location_infowindow_default_open'    => 'Infowindow Default Open',
  'location_zoom'         				=> 'Zoom',
  'location_animation'    				=> 'Animation',
  'location_term'         				=> 'Terms'
);

//$column_query = "SHOW COLUMNS FROM ".TBL_LOCATION."";
//$show_column_query = $wpdb->get_results( $wpdb->prepare($column_query, NULL) );
?>
<div class="wpgmp-wrap">
  	<div class="col-md-11">
  		<div class="wpgmp_main_container">

		<div class="wpgmp_menu_title">
	    <h3>
	    	<span class="glyphicon glyphicon-asterisk"></span>
	      	<?php _e('Export Locations', WPGMP_TEXT_DOMAIN ) ?>
	    </h3>
	    </div> 
    	<div class="wpgmp-overview">
    		<?php require_once(WPGMP_INC.'success_or_errors.php'); ?>
    		<div class="form-horizontal">
		      	<form method="post" action="" enctype="multipart/form-data">
		          	<fieldset>
		          		<blockquote>
			                <?php _e('Please click below if you want to export all locations.', WPGMP_TEXT_DOMAIN)?>
			            </blockquote>
		          		<div class="row">
			              <div class="col-md-10">
			                <input type="submit" name="wpgmp_export_all_locations" id="wpgmp_export_all_locations" class="btn btn-primary" value="<?php _e('Export All Locations', WPGMP_TEXT_DOMAIN ); ?>"/>              
			              </div>
			            </div>	          
			            <blockquote>
			                <?php _e('Please choose if you want to export specific fields from locations.', WPGMP_TEXT_DOMAIN)?>
			            </blockquote> 
			          	<table class="table table-hover wpgmp_google_map_location_table">
			                <tbody>    
			                  <?php 
			                    if($export_array)
			                    {
			                      foreach ($export_array as $key => $value)
			                      {                       
			                      ?> 
			                      <tr>        
			                        <td>
			                          <div class="wpgmp_style_checkbox" style="margin-right:30px; float:left;">
			                            <input type="checkbox" style="display:none;" id="checkbox_style_export<?php echo $key; ?>" value="<?php echo $key; ?>" name="wpgmp_export_locations[]">
			                            <label for="checkbox_style_export<?php echo $key; ?>"></label>
			                          </div>
			                          <?php echo ucwords($value); ?>
			                        </td>
			                      </tr>  
			                      <?php
			                      }
			                    }  
			                  ?>                                                          
			                </tbody>
			          	</table>
			          	<div class="row">
			              <div class="col-md-10">
			                <input type="submit" name="wpgmp_export_specific_locations" id="wpgmp_export_specific_locations" class="btn btn-primary" value="<?php _e('Export Specific Fields', WPGMP_TEXT_DOMAIN ); ?>"/>              
			              </div>
			            </div>		            
		          	</fieldset> 
		        </form>
    		</div>

    		</div>
    		
    	</div>
  	</div>
</div>      