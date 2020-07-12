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
            pass: 'Nixxit@123',
        }
    },
    google_client_id: '380298413126-p91evntc2eafv0jpd87fgddubhrnor48.apps.googleusercontent.com',
    google_client_secret: '1KZ2xbDaxGDN6uknOdXUum5K',
    google_callback_url:"http://localhost:8000/user/auth/google/callback",
    fb_client_id: '247163950066857',
    fb_client_secret: 'c522c88a2060f9d8861cf47228f1964d',
    fb_callback_url: "http://localhost:8000/user/auth/facebook/callback",
    fb_profile_fields: ['id', 'displayName', 'picture.type(large)', 'email']
} 

const production = {
    name:'production'
}


module.exports = development;

