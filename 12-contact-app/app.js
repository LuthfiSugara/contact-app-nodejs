const yargs = require('yargs');

const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: true,
            type: 'string'
        },
        phone: {
            describe: 'Phone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        // const contact = {
        //     nama: argv.nama,
        //     email: argv.email,
        //     phone: argv.phone
        // };
        // console.log(contact);
        simpanContact(argv.nama, argv.email, argv.phone);
    }
})
.demandCommand();

//Menampilkan daftar semua nama & nomor handphone contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama contact baru',
    handler(){
        listContact();
    }
});

//Menampilkan detail contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        detailContact(argv.nama);
    }
});

//Menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        deleteContact(argv.nama);
    }
});

yargs.parse();