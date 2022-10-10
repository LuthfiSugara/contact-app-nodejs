// const fs = require('fs'); //core module
// const cetakNama = require('./coba'); //local module
// const moment = require('moment'); //third party module / npm module / node_modules

const coba = require('./coba');
console.log(coba.cetakNama('Luthfi Sugara'));
console.log(coba.PI);
console.log(coba.mahasiswa.cetakMhs());
console.log(new coba.Orang());
