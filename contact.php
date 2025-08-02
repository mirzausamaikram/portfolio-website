<?php
// PHP script for handling the contact form submission

// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Check if data is not empty
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400); // Bad request status
        echo "Please fill out all fields.";
        exit;
    }

    // Set the recipient email address.
    // Replace this with your own email address.
    $recipient = "mirzausamaikram@gmail.com";

    // Set the email subject
    $subject = "New contact from your portfolio website";

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200); // OK status
        echo "Thank you! Your message has been sent successfully.";
    } else {
        http_response_code(500); // Server error status
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
} else {
    http_response_code(403); // Forbidden status
    echo "There was a problem with your submission, please try again.";
}
?>