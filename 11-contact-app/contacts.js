const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//Membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const simpanContact = (nama, email, phone) => {
    const contact = { nama, email, phone };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    
    //Cek duplikasi data
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Nama sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    // //Cek Email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid!'));
            return false
        }
    }

    //Cek Nomor Handphone
    if(phone){
        if(!validator.isMobilePhone(phone, 'id-ID')){
            console.log(chalk.red.inverse.bold('Nomor handphone tidak valid!'));
            return false
        }
    }

    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('Terima Kasih sudah memasukkan data.');
}

module.exports = { simpanContact }