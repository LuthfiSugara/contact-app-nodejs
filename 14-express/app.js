// const http = require('http');
// const fs = require('fs');

// const renderHtml = (path, res) => {
//     fs.readFile(path, (error, data) => {
//         if(error){
//             res.write('404');
//             res.write('Error : File not found!');
//         }else{
//             res.write(data);
//         }
//         res.end();
//     });
// }

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-type' : 'text/html',
//     });

//     const url = req.url;

//     if(url === '/about'){
//         renderHtml('./about.html', res);
//     }else if(url === '/contact'){
//         renderHtml('./contact.html', res);
//     }else{
//         renderHtml('./index.html', res);
//     }
// })
// .listen(3000, () => {
//     console.log('Server is listening on port 3000...');
// });

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
//   res.send('Hello World!')
    // res.json({
    //     nama: 'Luthfi',
    //     email: 'luthfi@mail.com',
    //     phone: '123123'
    // });
    res.sendFile('index.html', { root: __dirname });
})

app.get('/about', (req, res) => {
    // res.send('Ini adalah halaman about!')
    res.sendFile('about.html', { root: __dirname });
})

app.get('/contact', (req, res) => {
    // res.send('Ini adalah halaman contact!')
    res.sendFile('contact.html', { root: __dirname });
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