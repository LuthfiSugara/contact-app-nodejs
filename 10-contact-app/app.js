const {tulisPertanyaan, simpanContact} = require('./contacts');

const main = async () => {
    const nama = await tulisPertanyaan('Masukkan nama anda : ');
    const email = await tulisPertanyaan('Masukkan email anda : ');
    const phone = await tulisPertanyaan('Masukkan nomor handphone anda : ');

    simpanContact(nama, email, phone);
}

main();
