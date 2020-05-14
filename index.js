const express = require('express');
const port = 8000;
const app = express();
const router = require('./routes/index');
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

app.use('/', router);
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error is : ',err);
        return;
    }

    console.log('Server started at port :',port);
});