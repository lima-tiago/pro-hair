<?php
// Check for empty fields

if(empty($_POST['name'])     ||
  empty($_POST['email'])     ||
  !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
  {
    echo "No arguments Provided!";    
  
    return false;
  }else{
   
    $name = strip_tags(htmlspecialchars($_POST['name']));
    $email_address = strip_tags(htmlspecialchars($_POST['email']));
    $message = strip_tags(htmlspecialchars($_POST['message']));

    // Create the email and send the message
    $to = 'yourmail@yourdomain.com'; //Will receive the message
    $email_subject = "Attending:  $name";
    $email_body = "<h3>New message: </h3>";
    $email_body .= "<p><strong>Name:</strong> $name</p>";
    $email_body .= "<p><strong>Email:</strong> $email_address</p>";
    $email_body .= "<p><strong>Message:</strong><br>$message</p>";
    $headers = "From: yourmail@yourdomain.com\n"; //Email used for sending the messages
    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/html; charset=utf-8\n";
    $headers .= "Reply-To: $email_address";   
    mail($to,$email_subject,$email_body,$headers);
    return true;         
  }
?>
