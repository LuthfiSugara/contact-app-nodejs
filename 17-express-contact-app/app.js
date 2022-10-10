const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, findContact} = require('./utils/contacts')

const app = express()
const port = 3000

//Menggunakan ejs
app.set('view engine', 'ejs');
//Third party middleware
app.use(expressLayouts);

//Built-in-middleware
app.use(express.static('public'));


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
        contacts: contacts
    });
})

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