<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $service = $_POST['service'] ?? '';
    $message = $_POST['message'] ?? '';

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'mail.hakisurveyplotsltd.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'contact@hakisurveyplotsltd.com';
        $mail->Password = 'HAKI_survey';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // Sender & recipient
        $mail->setFrom('contact@hakisurveyplotsltd.com', 'HakiSurvey Website');
        $mail->addAddress('contact@hakisurveyplotsltd.com');
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = 'New Inquiry from HakiSurvey Website';
        $mail->Body = "
            <h2>New Inquiry</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>Service:</strong> {$service}</p>
            <p><strong>Message:</strong> {$message}</p>
        ";

        $mail->send();
        echo 'success';
    } catch (Exception $e) {
        echo "Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
