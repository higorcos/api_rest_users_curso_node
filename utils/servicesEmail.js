const nodemailer = require('nodemailer')
const { google } = require("googleapis"); 
const OAuth2 = google.auth.OAuth2;
require('dotenv').config()


class servicesEmail{
   submit(to,token){
    
     /*
     Guia para entender 
        https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
    */
    const secret = process.env.SECRET_JWT;
    
    
        const oauth2Client =  new  OAuth2( 
          process.env.SMTP_CLIENT_ID, // ClientID 
         process.env.SMTP_CLIENT_SECRET, // Client Secret 
          "https://developers.google.com/oauthplayground" // URL de redirecionamento 
      );
    

      oauth2Client . setCredentials({ 
        refresh_token: process.env.SMTP_REFRESH_TOKEN
      }); 
      const accessToken = oauth2Client.getAccessToken()

      const smtpTransport =  nodemailer . createTransport({ 
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth :  { 
            type :  "OAuth2", 
            user: "dev.services.email@gmail.com",
            clientId : process.env.SMTP_CLIENT_ID, 
            clientSecret : process.env.SMTP_CLIENT_SECRET, 
            refreshToken :  process.env.SMTP_REFRESH_TOKEN, 
            accessToken: accessToken 
        },
        tls: {
          rejectUnauthorized: false
        }
   });

   smtpTransport.sendMail({
        from: 'dev.services.email@gmail.com',
        to: to,
        subject: 'Recuperação de senha',
        // text: `Acesse o link para recuperar sua senha:  `,
        text: `Acesse http://localhost:3000/recovery-password/${token} e recupere a senha`,

      })
   }

}
module.exports = new servicesEmail()