<?php
/**
 *  Export-Import Records in csv,xml,json and excel
 *  @package Maps
 *  @author Flipper Code <hello@flippercode.com>
 */

if ( ! class_exists( 'WP_Export_Import' ) ) {

	/**
	 * Import/Export Class
	 */
	class WP_Export_Import {
		/**
		* Header Columns
		* @var array
		*/
		var $columns = array();
		/**
		* Array of records
		* @var array
		*/
		var $data = array();
		/**
		 * Intialize Importer Object.
		 * @param array $columns  Header Columns.
		 * @param array $data   Records Data.
		 */
		public function __construct($columns = array(), $data = array()) {
			$this->columns = $columns;
			$this->data = $data;
		}
		/**
		 * Export CSV,JSON,XML or EXCEL
		 * @param  string $action     File type.
		 * @param  [type] $asFilename File name.
		 */
		function export($action, $asFilename) {

			if ( 'csv' == $action ) {

				header( 'Content-Type: text/csv' );
				header( 'Content-Disposition: attachment;filename="'.$asFilename.'.csv"' );
				$fp = fopen( 'php://output', 'w' );

				if ( ! empty( $this->data ) ) {
					$csv_array = $this->columns;
					fputcsv( $fp, $csv_array );
					foreach ( $this->data as $key => $result ) {
						fputcsv( $fp, array_values( $result ), ',', '"' );
					}
				}

				fclose( $fp );

			} elseif ( 'excel' == $action ) {
				header( 'Content-Type: application/xls' );
				header( 'Content-Disposition: attachment; filename="'.$asFilename.'.xls"' );
				if ( ! empty( $this->data ) ) {
					$separator = "\t";
					echo implode( $separator,$this->columns )."\n";
					foreach ( $this->data as $key => $result ) {
						echo implode( $separator,$result )."\n";
					}
				}
			} elseif ( 'xml' == $action ) {
				header( 'Content-type: text/xml' );
				header( 'Content-Disposition: attachment; filename="'.$asFilename.'.xml"' );

				if ( ! empty( $this->data ) ) {
					$wpgmp_tab = "\t";
					$wpgmp_br = "\n";
					$wpgmp_xml_writter  = '<?xml version="1.0" encoding="UTF-8"?>'.$wpgmp_br;
					$wpgmp_xml_writter .= '<items>'.$wpgmp_br;

					foreach ( $this->data as $key => $result ) {
						$wpgmp_xml_writter .= $wpgmp_tab.'<item>'.$wpgmp_br;
						foreach ( $result as $node_key => $node_value ) {
							$wpgmp_xml_writter .= $wpgmp_tab.$wpgmp_tab.'<'.$node_key.'>'.htmlspecialchars( stripslashes( $node_value ) ).'</'.$node_key.'>'.$wpgmp_br;
						}
						$wpgmp_xml_writter .= $wpgmp_tab.'</item>'.$wpgmp_br;
					}

					$wpgmp_xml_writter .= '</items>';
					echo $wpgmp_xml_writter;
				}
			} elseif ( 'json' == $action ) {

				header( 'Content-Type: text/json' );
				header( 'Content-Disposition: attachment;filename="'.$asFilename.'.json"' );
				$fp = fopen( 'php://output', 'w' );

				if ( ! empty( $this->data ) ) {
					foreach ( $this->data as $key => $result ) {
						$json_data[] = $result;
					}
				}

				$json_pretty_data = json_encode( $json_data, JSON_PRETTY_PRINT )."\n";
				fwrite( $fp, $json_pretty_data );
				fclose( $fp );
			}
		}
		/**
		 * Convert xml node to array.
		 * @param  xml $xml Xml file content object.
		 * @return array      array of xml data.
		 */
		public function wpgmp_xml_2array($xml) {

			$arr = array();

	        foreach ( $xml->children() as $r ) {
	            $t = array();
	            if ( count( $r->children() ) == 0 ) {
	                $arr[ $r->getName() ] = strval( $r );
	            } else {
	                $arr[ $r->getName() ][] = $this->wpgmp_xml_2array( $r );
	            }
	        }

	        return $arr;
		}
		/**
		 * Read xml,json,excel or csv file.
		 * @param  string $action   File Type.
		 * @param  string $filename File name.
		 * @return array           File Data.
		 */
		function import($action, $filename) {
			global $_FILES;

			$file_data = array();
			$file_datas = array();
			if ( 'csv' == $action ) {
				ini_set( 'auto_detect_line_endings', true );
						$row = 1;

				if ( ($handle = fopen( $_FILES[ $filename ]['tmp_name'], 'r' )) !== false ) {
					while ( ($data = fgetcsv( $handle )) !== false ) {
						$num = count( $data );

						++$row;
						for ( $c = 0; $c < $num; ++$c ) {
							$data[ $c ]."<br />\n";
						}

						$file_data[] = $data;
					}

					fclose( $handle );

				}
			} else if ( 'xml' == $action ) {

				$wpgmp_xml_datas = simplexml_load_file( $_FILES[ $filename ]['tmp_name'] );
				$file_data = $this->wpgmp_xml_2array( $wpgmp_xml_datas );
				$file_datas = $file_data['item'];

			} else if ( 'xls' == $action ) {

				$file_data = array();
						$handle = fopen( $_FILES[ $filename ]['tmp_name'] , 'r' );

				if ( $handle ) {
					$array = explode( "\n", fread( $handle, filesize( $_FILES[ $filename ]['tmp_name'] ) ) );
					for ( $i = 0; $i < count( $array ); ++$i ) {
						if ( ! empty( $array[ $i ] ) ) {
							$exe_array = explode( "\t", $array[ $i ] );
							$file_data[] = $exe_array;
						}
					}
				}
			} else if ( 'json' == $action ) {
				$file_data = array();
				$wpgmp_json_datas = wp_remote_fopen( $_FILES[ $filename ]['tmp_name'] );
				if ( false === $wpgmp_json_datas ) {
					$wpgmp_json_datas = file_get_contents( $_FILES[ $filename ]['tmp_name'] );
				}
				$file_datas = json_decode( $wpgmp_json_datas, true );
			}

			if ( ! empty( $file_data ) and  empty( $file_datas ) ) {
				foreach ( $file_data[0] as $i => $key ) {
					$keys[] = $key;
				}
				$core_fields = array(
							'title',
							'address',
							'latitude',
							'longitude',
							'city',
							'state',
							'country',
							'postal-code',
							'message',
							'categories',
							);
				foreach ( $file_data as $i => $data ) {
					if ( 0 == $i ) {
						continue;
					}
					foreach ( $data as $d => $value ) {
						if(in_array(sanitize_title( $keys[ $d ] ), $core_fields))
						$file_datas[ $i -1 ][ sanitize_title( $keys[ $d ] ) ] = $value;
						else
						$file_datas[ $i -1 ][ $keys[ $d ] ] = $value;


					}
				}
			}
			return $file_datas;
		}
	}
}