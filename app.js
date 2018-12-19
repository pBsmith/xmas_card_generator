const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

var path = require('path');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/', function(req, res) {
    res.render('account_page.html');
});

app.get('/', function(req, res) {
    res.render('send_email.html')
})

app.post('/send-email', function(req, res) {
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'xmascardgen@gmail.com',
            pass: 'Networks!sC00l'
        }
    });
    
    var mailOptions = {
        from: '"The Christmas Card Generator" <xmascardgen@gmail.com>',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body,
        attachments: [ {
            fileName: "Christmas_Card.png",
            path: __dirname + "/views/images/Christmas_Card.png"    
        }]
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        
        if (error) {
            return console.log(error);
        } else {
            console.log(info);
        }
        
    })
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));