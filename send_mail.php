<?php
// send_mail.php
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';
require 'vendor/phpmailer/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);
    
    // Create PHPMailer instance
    $mail = new PHPMailer(true);
    
    try {
        // cPanel Email Server Settings - FROM YOUR CPANEL
        $mail->isSMTP();
        
        // Your cPanel SMTP settings
        $mail->Host       = 'mail.hakisurveyplotsltd.com';  // From your cPanel
        $mail->SMTPAuth   = true;
        $mail->Username   = 'contact@hakisurveyplotsltd.com';  // Your email
        $mail->Password   = 'HAKI_survey';  // Your email account password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // SSL/TLS for port 465
        $mail->Port       = 465;  // SMTP port from your cPanel
        
        // Optional: Enable debugging (remove in production)
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        
        // Sender and recipient
        $mail->setFrom('contact@hakisurveyplotsltd.com', 'HakiSurvey Plots Ltd');
        $mail->addAddress('info@hakisurveyplotsltd.com', 'Derick Ochieng');
        $mail->addReplyTo($email, $name);
        
        // Optional: CC to yourself
        $mail->addCC('contact@hakisurveyplotsltd.com', 'HakiSurvey Team');
        
        // Email content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission: " . substr($service, 0, 40);
        
        $mail->Body = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>New Contact Form Submission</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    margin: 0;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .container { 
                    max-width: 600px; 
                    margin: 0 auto; 
                    padding: 30px; 
                    background: white;
                    border: 1px solid #ddd; 
                    border-radius: 10px; 
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .header { 
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
                    color: white; 
                    padding: 25px; 
                    border-radius: 10px 10px 0 0; 
                    text-align: center;
                }
                .logo {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .content { 
                    padding: 30px; 
                }
                .field { 
                    margin-bottom: 20px; 
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                }
                .label { 
                    font-weight: bold; 
                    color: #3b82f6;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }
                .value {
                    font-size: 16px;
                    color: #333;
                }
                .message-box {
                    background: #f8f9fa; 
                    padding: 20px; 
                    border-radius: 8px; 
                    margin-top: 10px;
                    border-left: 4px solid #3b82f6;
                }
                .footer { 
                    margin-top: 30px; 
                    padding-top: 20px; 
                    border-top: 2px solid #eee; 
                    font-size: 12px; 
                    color: #666;
                    text-align: center;
                }
                .highlight {
                    background-color: #f0f7ff;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">HakiSurvey Plots Ltd</div>
                    <h2 style="margin: 10px 0 5px 0; font-size: 22px;">New Contact Form Submission</h2>
                    <p style="opacity: 0.9; font-size: 14px;">Website Inquiry</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Client Information</div>
                        <div class="value">
                            <strong>Name:</strong> ' . $name . '<br>
                            <strong>Email:</strong> ' . $email . '<br>
                            <strong>Phone:</strong> ' . ($phone ? $phone : 'Not provided') . '
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Service Requested</div>
                        <div class="value highlight">
                            ' . $service . '
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Project Details / Message</div>
                        <div class="message-box">' . nl2br($message) . '</div>
                    </div>
                    
                    <div class="highlight">
                        <div class="label">Submission Details</div>
                        <div class="value">
                            <strong>Date:</strong> ' . date('F j, Y') . '<br>
                            <strong>Time:</strong> ' . date('g:i A') . '<br>
                            <strong>IP Address:</strong> ' . $_SERVER['REMOTE_ADDR'] . '
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <p>This email was automatically generated from the contact form on the HakiSurvey Plots Ltd website.</p>
                    <p><a href="https://hakisurveyplotsltd.com" style="color: #3b82f6; text-decoration: none;">https://hakisurveyplotsltd.com</a></p>
                </div>
            </div>
        </body>
        </html>';
        
        // Plain text alternative for email clients that don't support HTML
        $mail->AltBody = "NEW CONTACT FORM SUBMISSION\n\n" .
                        "================================\n" .
                        "HakiSurvey Plots Ltd\n" .
                        "================================\n\n" .
                        "CLIENT INFORMATION:\n" .
                        "Name: $name\n" .
                        "Email: $email\n" .
                        "Phone: " . ($phone ? $phone : 'Not provided') . "\n\n" .
                        "SERVICE REQUESTED:\n" .
                        "$service\n\n" .
                        "MESSAGE:\n" .
                        "$message\n\n" .
                        "SUBMISSION DETAILS:\n" .
                        "Date: " . date('F j, Y') . "\n" .
                        "Time: " . date('g:i A') . "\n" .
                        "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n\n" .
                        "================================\n" .
                        "Sent from website contact form\n" .
                        "https://hakisurveyplotsltd.com";
        
        // Handle file attachments
        if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == 0) {
            $attachment = $_FILES['attachment'];
            
            // Check file size (max 10MB)
            if ($attachment['size'] <= 10 * 1024 * 1024) {
                $allowedTypes = [
                    'application/pdf',
                    'image/jpeg', 'image/png', 'image/jpg',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ];
                
                if (in_array($attachment['type'], $allowedTypes)) {
                    $mail->addAttachment(
                        $attachment['tmp_name'],
                        $attachment['name']
                    );
                }
            }
        }
        
        // Send email
        if ($mail->send()) {
            // Success - redirect to thank you page
            header('Location: thank-you.html');
            exit();
        } else {
            throw new Exception('Mailer Error: ' . $mail->ErrorInfo);
        }
        
    } catch (Exception $e) {
        // Error handling - show user-friendly message
        echo '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Error Sending Email</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50">
            <div class="min-h-screen flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900 mb-4 text-center">Unable to Send Message</h1>
                    <p class="text-gray-600 mb-6 text-center">There was an error sending your message. Please try again or contact us directly.</p>';
        
        // Show debugging info only if debug parameter is set
        if (isset($_GET['debug'])) {
            echo '<div class="bg-gray-100 p-4 rounded-lg mb-6">
                    <h3 class="font-bold text-gray-800 mb-2">Debug Information:</h3>
                    <pre class="text-sm text-gray-700 overflow-auto">' . 
                    htmlspecialchars($e->getMessage()) . 
                    '</pre>
                  </div>';
        }
        
        echo '<div class="space-y-3">
                        <a href="contact.html" class="block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center">
                            Try Again
                        </a>
                        <a href="mailto:derickochiengowino@gmail.com" class="block w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-center">
                            Email Us Directly
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>';
    }
} else {
    // Not a POST request - redirect to contact page
    header('Location: contact.html');
    exit();
}
?>