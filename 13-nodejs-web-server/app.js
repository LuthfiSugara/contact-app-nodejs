const http = require('http');
const fs = require('fs');

const renderHtml = (path, res) => {
    fs.readFile(path, (error, data) => {
        if(error){
            res.write('404');
            res.write('Error : File not found!');
        }else{
            res.write(data);
        }
        res.end();
    });
}

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type' : 'text/html',
    });

    const url = req.url;

    if(url === '/about'){
        renderHtml('./about.html', res);
    }else if(url === '/contact'){
        renderHtml('./contact.html', res);
    }else{
        renderHtml('./index.html', res);
    }
})
.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});