const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });
}

const simpanContact = (nama, email, phone) => {
    const contact = { nama, email, phone };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    
    //cek duplikasi data
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log('Contact sudah terdaftar, gunakan nama lain!');
        return false;
    }

    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('Terima Kasih sudah memasukkan data.');

    rl.close()
}

module.exports = { simpanContact, tulisPertanyaan}