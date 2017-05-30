<?php 

	$nameErr = $emailErr = $subjectErr = $messageErr = "";
  $name = $email = $subject = $message = "";

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
  	if(empty($_POST["name"])) {
  		$nameErr = "Name is required";
  	}	else {
  		$name = test_input($_POST["name"]);
  	}

  	if(empty($_POST["email"])) {
  		$emailErr = "Email is required";
  	} else {
  		$email = test_input($_POST["email"]);
  	}

  	if(empty($_POST["subject"])) {
  		$subjectErr = "Subject is required";
  	} else {
  		$subject = test_input($_POST["subject"]);
  	}

  	if(empty($_POST["message"])) {
  		$messageErr = "Message is required";
  	} else {
  		$message = test_input($_POST["message"]);
  	}
	}
	
	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}

	$full_details = "Sender: " . $name . "<br>" .
									"Email: " . $email . "<br>" .
									"Message: <br>" . $message;

	/**
	 * This example shows settings to use when sending via Google's Gmail servers.
	 */
	//SMTP needs accurate times, and the PHP time zone MUST be set
	//This should be done in your php.ini, but this is how to do it if you don't have access to that
	date_default_timezone_set('Etc/UTC');
	require 'PHPMailer/PHPMailerAutoload.php';
	//Create a new PHPMailer instance
	$mail = new PHPMailer;
	//Tell PHPMailer to use SMTP
	$mail->isSMTP();
	//Enable SMTP debugging
	// 0 = off (for production use)
	// 1 = client messages
	// 2 = client and server messages
	$mail->SMTPDebug = 2;
	//Ask for HTML-friendly debug output
	$mail->Debugoutput = 'html';
	//Set the hostname of the mail server
	$mail->Host = 'smtp.gmail.com';
	// use
	// $mail->Host = gethostbyname('smtp.gmail.com');
	// if your network does not support SMTP over IPv6
	//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
	$mail->Port = 587;
	//Set the encryption system to use - ssl (deprecated) or tls
	$mail->SMTPSecure = 'tls';
	//Whether to use SMTP authentication
	$mail->SMTPAuth = true;
	//Username to use for SMTP authentication - use full email address for gmail
	$mail->Username = "thirdtiu@gmail.com";
	//Password to use for SMTP authentication
	$mail->Password = "xxx";
	//Set who the message is to be sent from
	// $mail->setFrom($email);
	//Set an alternative reply-to address
	// $mail->addReplyTo('replyto@example.com', 'First Last');
	//Set who the message is to be sent to
	$mail->addAddress('thirdtiu@gmail.com', 'Avelino Tiu'); // where the mail is going to be sent

	$mail->isHTML(true);                                  // Set email format to HTML
	//Set the subject line
	$mail->Subject = $subject;
	//Read an HTML message body from an external file, convert referenced images to embedded,
	//convert HTML into a basic plain-text alternative body
	$mail->Body    = $full_details;
	//Replace the plain text body with one created manually
	// $mail->AltBody = 'This is a plain-text message body';
	//Attach an image file
	// $mail->addAttachment('images/phpmailer_mini.png');
	//send the message, check for errors
	header('Location: thankyou.html');
	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	    echo "Message sent!";
	}

?>
