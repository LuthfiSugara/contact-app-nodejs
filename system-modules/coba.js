function cetakNama(nama){
    return 'hello, ' + nama;
}

const PI = 3.14;

const mahasiswa = {
    nama: 'luthfi sugara',
    umur: 25,
    cetakMhs(){
        return 'hello, ' + this.nama
    }
}

class Orang {
    constructor(){
        console.log('Objek Orang telah dibuat!');
    }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang
// }

module.exports = {cetakNama, PI, mahasiswa, Orang}