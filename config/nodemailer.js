const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();


let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user: process.env.USER_NAME,
        pass: process.env.USER_PASSW
    }
});

let renderTemplate = (data, relativepath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativepath),
        data,
        function(err,template){
            if(err)
            {
                console.log('Error in rendering ejs Html',err);
                return;
            }

            mailHtml = template;
        }
    );

    return mailHtml;
}

module.exports ={
    renderTemplate: renderTemplate,
    transporter :transporter
} 