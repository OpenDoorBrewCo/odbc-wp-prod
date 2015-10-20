<?php
/**
 * Class: WPGMP_Model_Settings
 * @author Flipper Code <hello@flippercode.com>
 * @version 3.0.0
 * @package Maps
 */

if ( ! class_exists( 'WPGMP_Model_Settings' ) ) {

	/**
	 * Setting model for Plugin Options.
	 * @package Maps
	 * @author Flipper Code <hello@flippercode.com>
	 */
	class WPGMP_Model_Settings extends WPGMP_Model_Base {
		/**
		 * Intialize Backup object.
		 */
		function __construct() {
		}
		/**
		 * Admin menu for Settings Operation
		 * @return array Admin menu navigation(s).
		 */
		function navigation() {
			return array(
				'wpgmp_manage_settings' => __( 'Settings', WPGMP_TEXT_DOMAIN ),
			);
		}
		/**
		 * Add or Edit Operation.
		 */
		function save() {

			if ( isset( $_REQUEST['_wpnonce'] ) ) {
				$nonce = sanitize_text_field( wp_unslash( $_REQUEST['_wpnonce'] ) ); }

			if ( isset( $nonce ) and ! wp_verify_nonce( $nonce, 'wpgmp-nonce' ) ) {

				die( 'Cheating...' );

			}

			$this->verify( $_POST );

			if ( is_array( $this->errors ) and ! empty( $this->errors ) ) {
				$this->throw_errors();
			}
			$extra_fields = array();
			if ( isset( $_POST['location_extrafields'] ) ) {
				foreach ( $_POST['location_extrafields'] as $index => $label ) {
					if ( $label != '' ) {
						$extra_fields[$index] = sanitize_text_field( wp_unslash( $label ) );
					}
				}
			}
			update_option( 'wpgmp_api_key',sanitize_text_field( wp_unslash( $_POST['wpgmp_api_key'] ) ) );
			update_option( 'wpgmp_scripts_place',sanitize_text_field( wp_unslash( $_POST['wpgmp_scripts_place'] ) ) );
			update_option( 'wpgmp_location_extrafields', serialize(  $extra_fields  ) );

			$response['success'] = __( 'Setting(s) saved successfully.',WPGMP_TEXT_DOMAIN );
			return $response;

		}
	}
}
