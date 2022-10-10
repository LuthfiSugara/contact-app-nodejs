//Core Module
//File System
const fs = require('fs');

// console.log(fs);
//Menuliskan string ke file (synchronous)
// try{
//     fs.writeFileSync('data/test.txt', 'Hellow World, Synchronous');
// }catch(e){
//     console.log(e);
// }


//Menuliskan string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Hello World, Asynchronous', (e) => {
//     console.log(e);
// });

//Membaca isi file (synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

//Membaca isi file (Asynchronous)
// const data2 = fs.readFile('data/test.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// });

//Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama anda : ', (nama) => {
    rl.question('Masukkan nomor handphone anda : ', (number) => {
        const contact = {
            nama: nama,
            phone: number
        }
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(contact);
        console.log(contacts);
        
        try{
            fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        }catch(e){
            console.log(e);
        }
        rl.close();
    });
});

