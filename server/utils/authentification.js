import nodemailer from "nodemailer";

  const generateOTP=()=>{
    let otp="";
    for(let i=0;i<4;i++){
        const randVal=Math.round(Math.random()*9);
        otp+=randVal;
    }
    return otp;
  }
const mailTransport=()=>{
    
 const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user:process.env.MAILTRAP_USERNAME,
      pass:process.env.MAILTRAP_PASSWORD
    }
  });
  return transport
}

const generateEmailTemplate=(code)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          text-align: center;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333333;
        }
    
        p {
          color: #555555;
        }
    
        .verification-code {
          font-size: 24px;
          color: #007bff;
          margin-top: 20px;
          margin-bottom: 30px;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <p>Thank you for signing up! To complete your registration, please use the following verification code:</p>
        <div class="verification-code">${code}</div>
        <p>If you didn't sign up for an account, please ignore this email.</p>
        <p>Best regards,<br>anime hub</p>
      </div>
    </body>
    </html>
    `;
}
const plainmailTemplate=()=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Community</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          text-align: center;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333333;
        }
    
        p {
          color: #555555;
        }
    
        .welcome-message {
          font-size: 24px;
          color: #007bff;
          margin-top: 20px;
          margin-bottom: 30px;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Our Community!</h1>
        <p>We're excited to have you on board. You've successfully verified your email and are now a part of our community.</p>
        <div class="welcome-message">Enjoy your experience!</div>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
        <p>Best regards,<br>Anime Hub</p>
      </div>
    </body>
    </html>
    `
}

const resetemailTemplate=(url)=>{
   return `<!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Password Reset</title>
     <style>
       body {
         font-family: 'Arial', sans-serif;
         background-color: #f4f4f4;
         padding: 20px;
         text-align: center;
       }
   
       .container {
         max-width: 600px;
         margin: 0 auto;
         background-color: #ffffff;
         padding: 20px;
         border-radius: 10px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       }
   
       h1 {
         color: #333333;
       }
   
       p {
         color: #555555;
       }
   
       .reset-message {
         font-size: 18px;
         margin-top: 20px;
         margin-bottom: 30px;
       }
   
       .cta-button {
         display: inline-block;
         padding: 10px 20px;
         background-color: #007bff;
         color: #ffffff;
         text-decoration: none;
         border-radius: 5px;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <h1>Password Reset Request</h1>
       <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
       <p>To reset your password, click on the link below:</p>
       <a class="cta-button" href=${url}>Reset Password</a>
       <div class="reset-message">The link is valid for a limited time for security reasons.</div>
       <p>If you have any questions or need assistance, feel free to reach out to us.</p>
       <p>Best regards,<br>Your App Name Team</p>
     </div>
   </body>
   </html>
   `
}
const resetPasswordSuccessful=()=>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Success</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
        text-align: center;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        color: #333333;
      }
  
      p {
        color: #555555;
      }
  
      .success-message {
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 30px;
      }
  
      .cta-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Successful</h1>
      <p>Your password has been successfully reset. If you didn't initiate this action, please contact us immediately.</p>
      <p>If you have any further questions or need assistance, feel free to reach out to us.</p>
      <div class="success-message">Thank you for using our services!</div>
      <p>Best regards,<br>Your App Name Team</p>
    </div>
  </body>
  </html>
  `
}

  export {generateOTP,mailTransport,generateEmailTemplate,plainmailTemplate,resetemailTemplate,resetPasswordSuccessful}