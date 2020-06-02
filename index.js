const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));
app.set('layout extractStyles',true);
app.set('layout exrtactScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    secret:'blahsomething',
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