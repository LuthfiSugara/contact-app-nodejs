const yargs = require('yargs');

const { simpanContact, tulispertanyaan } = require('./contacts');

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
});

yargs.parse();