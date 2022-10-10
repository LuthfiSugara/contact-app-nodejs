const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { body, check, validationResult, Result } = require('express-validator');
const methodOverride = require('method-override');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

//setup method override
app.use(methodOverride('_method'));

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

app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Tambah data contact',
        layout: 'layouts/main-layout'
    });
});

app.post('/contact', 
    [
        body('nama').custom(async (value) => {
            const duplikat = await Contact.findOne({name: value});
            if(duplikat){
                throw new Error('Nama Sudah digunakan!');
            }
            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
        check('phone', 'No Handphone tidak valid!').isMobilePhone('id-ID')
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('add-contact', {
                title: 'Form Tambah Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array()
            });
        }else{
            Contact.insertMany(req.body, (error, result) => {
                req.flash('msg', 'Data contact berhasil ditambahkan!');
                res.redirect('/contact');
            });
        }
    }
);

// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({nama: req.params.nama});

//     if(!contact){
//         res.status(404);
//         res.send('<h1>404</h1>');
//     }else{
//         Contact.deleteOne({_id : contact._id}).then((result) => {
//             req.flash('msg', 'Data contact berhasil dihapus!');
//             res.redirect('/contact');
//         });
//     }
// });

app.delete('/contact', (req, res) => {
    Contact.deleteOne({nama : req.body.nama}).then((result) => {
        req.flash('msg', 'Data contact berhasil dihapus!');
        res.redirect('/contact');
    });
});

app.get('/contact/edit/:nama', async(req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});

    res.render('edit-contact', {
        title: 'Edit data contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.put('/contact', [
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({nama: value});
        if(value !== req.body.oldNama && duplikat){
            throw new Error('Nama Sudah digunakan!');
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('phone', 'No Handphone tidak valid!').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('edit-contact', {
            title: 'Form Ubah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
            contact: req.body,
        });
    }else{
        Contact.updateOne(
            {_id: req.body._id},
            {
                $set: {
                    nama: req.body.nama,
                    email: req.body.email,
                    phone: req.body.phone
                }
            }
        ).then((result) => {
            req.flash('msg', 'Data contact berhasil diubah!');
            res.redirect('/contact');
        });
    }
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