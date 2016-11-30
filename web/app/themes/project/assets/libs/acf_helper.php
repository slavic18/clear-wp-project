<?php
/**
 * Created by PhpStorm.
 * User: slavic
 * Date: 19.10.2015
 * Time: 17:33
 */

class Acf_Helper {
	public $file = null;
	public function __construct($fileName){
		$this->file = self::getFileObjectFields($fileName);
	}

	public function getFieldObj($fieldName){
		foreach($this->file as $field){
			if($fieldName == $field->name){
				return $field;
			}
		}
		return false;
	}

	public static function getFileContents($file){
		return json_decode( file_get_contents( get_template_directory_uri() . '/acf-json/' . $file ) );
	}

	public static function getFileObjectFields($file){
		return self::getFileContents($file)->fields;
	}

	/**
	 * @param $file acf json file
	 */
	public static function  getObjectsKeyAssociation($file){
		$fields = array();
		foreach(self::getFileObjectFields($file) as $field){
			$fields[ $field->name ] = $field->key;
		}
		return $fields;
	}

	public function updateFields($fields, $values,  $postId){
//		var_dump($this->file);die;
		foreach($fields as $acfField){
			$fieldObj = $this->getFieldObj($acfField);
			if (!$fieldObj) continue;

			switch($fieldObj->type){
				case 'true_false': // update bool fields
					update_field($fieldObj->key,(isset($values[$acfField])) ? 1 : 0, $postId);
					break;
				case 'checkbox':
					$value = [];
					$choices = array_keys((array)$fieldObj->choices);
					$formValues = array_values($values[$acfField]);
					if (empty($formValues) && !empty($fieldObj->default_value)) {
						$value = (array)$fieldObj->default_value;
					}
					else {
						foreach ($choices as $choice) {
							if (in_array($choice, $formValues)) {
								$value[] = $choice;
							}
						}
					}

					if (!empty($value)) {
						update_field($fieldObj->key,  $value, $postId);
					}
					break;
				case 'radio':
					$value = null;
					$choices = array_keys((array)$fieldObj->choices);
					if (empty($values[$acfField]) && !empty($fieldObj->default_value)) {
						$value = (array)$fieldObj->default_value;
					}
					else {
						foreach ($choices as $choice) {
							if ($choice == $values[$acfField]) {
								$value = $choice;
							}
						}
					}

					if (!is_null($value)) {
						update_field($fieldObj->key,  $value, $postId);
					}
					break;
				case 'select':
					if($fieldObj->multiple == 1)    {
						$value = (isset($values[$acfField]))? (array) $values[$acfField] : [];
					}else {
						$value = (isset($values[$acfField]))? (string) $values[$acfField] : '';
					}
					update_field($fieldObj->key,  $value, $postId);
					break;
				case 'date_picker':
					$value = (isset($values[$acfField]))? sanitize_text_field($values[$acfField]) : '';
					$date = date_create_from_format($fieldObj->return_format, $value);
					if ($date) {
						update_field($fieldObj->key, $date->format('Ymd'), $postId);
					}
					break;
				default:
					$value = (isset($values[$acfField]))? sanitize_text_field($values[$acfField]) : '';
					update_field($fieldObj->key, $value, $postId);
			}

		}
	}
}