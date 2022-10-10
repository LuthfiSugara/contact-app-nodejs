const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

//Setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

//Halaman Home
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Luthfi',
            email: 'luthfi@mail.com'
        },
        {
            nama: 'Sugara',
            email: 'sugara@mail.com'
        },
        {
            nama: 'test',
            email: 'test@mail.com'
        }
    ]

    res.render('index', { 
        nama: 'Luthfi Sugara', 
        title: 'Home',
        mahasiswa: mahasiswa,
        layout: 'layouts/main-layout',
     });
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'About'
    });
});

app.get('/contact', async (req, res) => {
    // Contact.find().then((contact) => {
    //     res.send(contact);
    // });

    const contacts = await Contact.find();
    
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact',
        contacts: contacts,
        msg: req.flash('msg')
    });
});

app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
    
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Detail Contact',
        contact: contact
    });
})

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});