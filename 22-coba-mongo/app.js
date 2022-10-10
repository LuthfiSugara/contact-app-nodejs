const { MongoClient } = require('mongodb');
const  ObjectID = require('mongodb').ObjectId;
const { mainModule } = require('process');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'test';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((error, client) => {
    if(error){
        return console.log('Koneksi Gagal');
    }

    //pilih database
    const db = client.db(dbName);

    //Menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'coba',
    //         email: 'coba@mail.com'
    //     },
    //     (error, result) => {
    //         if(error){
    //             return console.log('gagal menambahkan data!');
    //         }

    //         console.log(result);
    //     }
    // );

    //Menambahkan lebih dari satu data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'Erik',
    //             email: 'erik@main.com'
    //         },
    //         {
    //             nama: 'Avip',
    //             email: 'avip@mail.com'
    //         }
    //     ],
    //     (error, result) =>{
    //         if(error){
    //             console.log('Data gagal ditambahkan!');
    //         }
    //         console.log(result);
    //     }
    // );

    //Menampilkan semua data 
    // db.collection('mahasiswa')
    // .find()
    // .toArray((error, result) => {
    //     console.log(result);
    // });

    //Menampilkan semua data berdasarkan kriteria
    // db.collection('mahasiswa')
    // .find({ _id: ObjectID("617a0566dc85e8c200c22e2b") })
    // .toArray((error, result) => {
    //     console.log(result);
    // });

    //Mengubah data berdasarkan id
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectID("617a0566dc85e8c200c22e2b")
    //     },
    //     {
    //         $set: {
    //             email: 'luthfi@outlook.com'
    //         }
    //     }
    // );
    
    // updatePromise.then((result) => {
    //     console.log(result);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });


    //Mengubah data lebih dari 1, berdasarkan kriteria
    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: 'sugara'
    //     },
    //     {
    //         $set: {
    //             nama: 'sugara46'
    //         }
    //     }
    // )

    //Menghapus 1 data
    // db.collection('mahasiswa')
    //     .deleteOne(
    //         {
    //             _id: ObjectID("617a0566dc85e8c200c22e2b")
    //         }
    //     )
    //     .then((result) => {
    //         console.log(result)
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });


    //Menghapus lebih dari 1 data
    db.collection('mahasiswa')
        .deleteMany({
            nama: 'sugara46'
        })
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error);
        });
});