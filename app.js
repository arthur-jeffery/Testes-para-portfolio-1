var express = require('express');
var exphbs = require('express-handlebars');
"use strict";
const nodemailer = require("nodemailer");

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/enviar', (req, res) => {
    async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'arthurjefferysantanna@gmail.com', // generated ethereal user
                pass: 'arthjeff2612', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Cliente" <arthurjefferysantanna@gmail.com>', // sender address
            to: "arthjeff2612@gmail.com", // list of receivers
            subject: "Orçamento", // Subject line
            text: "em breve", // plain text body
            html: "<b>Em breve</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().then(res.render('home'))
})

app.listen(3000, () => {
    console.log("rodando")
});