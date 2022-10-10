const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, findContact, addContact, cekDuplikat} = require('./utils/contacts')
const { body, check, validationResult } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express()
const port = 3000

//Menggunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts); //Third party middleware
app.use(express.static('public')); //Built-in-middleware
app.use(express.urlencoded({ extended: true }));

//konfigurasi flash
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
})

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact',
        contacts: contacts,
        msg: req.flash('msg')
    });
});

app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Tambah data contact',
        layout: 'layouts/main-layout'
    });
});

app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if(duplikat){
            throw new Error('Nama Sudah digunakan!');
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('phone', 'No Handphone tidak valid!').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('add-contact', {
            title: 'Form Tambah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array()
        });
    }else{
        addContact(req.body);
        req.flash('msg', 'Data contact berhasil ditambahkan!');
        res.redirect('/contact');
    }
});

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Detail Contact',
        contact: contact
    });
})

//Middleware
app.use('/', (req, res) => {
    res.status(404);
    res.send('Test');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})