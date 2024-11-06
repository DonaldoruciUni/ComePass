<?php

// This is mandatory
$to = "mikeommen2@gmail.com"; 							// Email to send subscriptions to	
$subject = "Contact from ComePass";	// Email Subjec


/*==============================
		SMTP CONFIGURATION
================================*/
$host = 'smtp-relay.gmail.com';			// e.g. smtp.gmail.com
$smtp = true; 		// true if you are using smtp
$username = 'mikeommen2@gmail.com';  	// Username(your gmail address if you are using google smtp)
$password = 'test1234567'; 	// Password 
$secure = 'ssl';  	// SMTP Secure type 
$port = 587;  		// SMTP port

/*==============================
		    LABELS
================================*/
$LBL = [
	"email_not_valid" => "Email is not valid",
	"email_not_sent"  => "Email could not be sent,Please try again later",
	"email_sent" => "Email has been sent"
];
?>