<?php
header('Content-type: application/json');

require_once "mailer/vendor/autoload.php";
require_once "config.php";
use PHPMailer\PHPMailer;

/**
 *
 * Send email using SMTP
 *
 * @param  [string] from - seander's email
 * @param  [stringn] message - message content
 * @return [json] - response
 */
function withSMTP($from,$message) {
	global $host,$smtp,$username,$password,$secure,$port,$to,$subject,$body,$LBL;

	$mail = new PHPMailer\PHPMailer;
	$mail->isSMTP();
	$mail->Host = $Host;
	$mail->SMTPAuth = $Smtp;
	$mail->Username = $Username;
	$mail->Password = $Password;
	$mail->SMTPSecure = $Secure;
	$mail->Port = $Port;

	$mail->setFrom($from);
	$mail->addAddress($to);
	$mail->isHTML(true);
	$mail->Subject = $subject;
	$mail->Body = $message;

	if(!$mail->send()) {
	    echo json_encode(array("status"=>400,"message"=>$LBL['email_not_sent']));
	} else {
	   echo json_encode(array("status"=>200,"message"=>$LBL['email_sent']));
	}
}

/**
 *
 * Send email using defaut mail function
 *
 * @param  [string] from - seander's email
 * @param  [stringn] message - message content
 * @return [json] - response
 */
function withMail($from,$message) {
	global $to,$subject,$body,$LBL;

	$headers = 'From: '. $from. "\r\n";
	if( mail($to, $subject, $message, $headers) )
		echo json_encode(array("status"=>200,"message"=>$LBL['email_sent']));
	else
		echo json_encode(array("status"=>400,"message"=>$LBL['email_not_sent']));

}

/**
 * @param  [string] str - string to be validated
 * @return [string] validated vtring
 */
function validateString($str) {

	$str = filter_var ( trim($str), FILTER_SANITIZE_STRING);
	return ucwords(strtolower($str));

}

/**
 * Contact form handle
 */
if(isset($_REQUEST['email']) && isset($_REQUEST['name']) && isset($_REQUEST['subject'])) {
	$error = array();
	if( filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL) )
		$email = $_REQUEST['email'];
	else
		$error = $LBL['email_not_valid'];

	$full_name = validateString($_REQUEST['name']);
	$subject = validateString($_REQUEST['subject']);

	if($error) {
		echo json_encode(array("status"=>401,"message"=>$error));
	} else {

		$message = "Name : " . $full_name ."\n" . "Subject : " . $subject;

		if( !empty($Host) && !empty($Username) && !empty($Password) ) {
			withSMTP($email,$message);
		} else {
			withMail($email,$message);
		}

	}
}

?>