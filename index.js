const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shittumifimn0807@gmail.com',
        pass: 'vxhposlrgeeglbhe'
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html' ); // Adjust the path to your main HTML file
});

// Reusable route for the contact form
app.post('/contact', function (req, res) {
    var priceInfo = req.body.price;
    var phoneInfo = 'Name: ' + req.body.phone;
    var quantityInfo = 'Quantity: ' + req.body.quantity;
    var sizeInfo = 'size: ' + req.body.size;
    var mailOptions = {
        from: req.body.email,
        to: 'asumo0807@gmail.com',
        subject: req.body.subject + ' From: ' + req.body.email,
        text: priceInfo + '\n' + phoneInfo + '\n' + quantityInfo + '\n' + sizeInfo + '\n' + 'Review:' + req.body.message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('Error: ' + error.message);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent: ' + info.response);
        }
    });
});

app.listen(4000, function () {
    console.log('Server is running on port 4000');
});
