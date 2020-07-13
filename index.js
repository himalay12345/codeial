const express = require('express');
const port = 8000;
const app = express();
const env = require('./config/environment');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFacebook = require('./config/passport-facebook-oauth-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_user_socket').chatUserSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is running on port 5000');
// require('dotenv').config();
const path = require('path');


console.log(env.name);
if(env.name == 'development'){
app.use(sassMiddleware({
    src:path.join(__dirname,env.asset_path,'scss'),
    dest:path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle:'extended',
    prefix:'/css'
}));
}
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(env.asset_path));
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));
app.set('layout extractStyles',true);
app.set('layout exrtactScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
            mongooseConnection: db ,
            autoRemove: 'disabled'
        
    },function(err)
    {
        if(err){
        console.log('Error in MongoStore');
        }
    })

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/',require('./routes/index'));



app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error is : ',err);
        return;
    }

    console.log('Server started at port :',port);
});

// app.listen(8000,'192.168.43.207',function() {
//     console.log('Application worker ' + process.pid + ' started...');
//   }
//   );
