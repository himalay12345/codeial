const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user: 'himalayshankar31@gmail.com',
            pass: 'Nixxit@12345',
        }
    },
    google_client_id: '380298413126-p91evntc2eafv0jpd87fgddubhrnor48.apps.googleusercontent.com',
    google_client_secret: '1KZ2xbDaxGDN6uknOdXUum5K',
    google_callback_url:"http://localhost:8000/user/auth/google/callback",
    fb_client_id: '247163950066857',
    fb_client_secret: 'c522c88a2060f9d8861cf47228f1964d',
    fb_callback_url: "http://localhost:8000/user/auth/facebook/callback",
    fb_profile_fields: ['id', 'displayName', 'picture.type(large)', 'email'],
    gmail_passw: 'Nixxit@123',
    morgan: {
        mode:'dev',
        options: {stream:accessLogStream}
    }
} 

const production = {
    name:'production',
    asset_path:process.env.ASSET_PATH,
    session_cookie_key:process.env.SESSION_COOKIE_KEY,
    db:process.env.DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        }
    },
    google_client_id: process.env.G_CLIENT_ID,
    google_client_secret: process.env.G_SECRET,
    google_callback_url:process.env.G_CALLBACK_URL,
    fb_client_id: process.env.FB_CLIENT_ID,
    fb_client_secret: process.env.FB_CLIENT_SECRET,
    fb_callback_url: process.env.FB_CALLBACK_URL,
    fb_profile_fields: ['id', 'displayName', 'picture.type(large)', 'email'],
    gmail_passw: process.env.GMAIL_PASSW,
    morgan: {
        mode:'combined',
        options: {stream:accessLogStream}
    }
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT == undefined) ? development :  eval(process.env.CODEIAL_ENVIRONMENT);

