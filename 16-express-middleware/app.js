const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan');
const app = express()
const port = 3000

//Menggunakan ejs
app.set('view engine', 'ejs');
//Third party middleware
app.use(expressLayouts);

//Built-in-middleware
app.use(express.static('public'));
app.use(morgan('dev'));

//Application level middleware
app.use((req, res, next) => {
    console.log('Time : ', Date.now());
    next();
});

app.use((req, res, next) => {
    console.log('Ini middleware ke-2');
    next();
});

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
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact'
    });
})

app.get('/product/:id/', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br/> Category ID : ${req.query.category}`);
});

//Middleware
app.use('/', (req, res) => {
    res.status(404);
    res.send('Test');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})