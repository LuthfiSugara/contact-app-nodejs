const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Menambah 1 data
// const contact1 = new Contact({
//     nama: 'sugara',
//     phone: '081231231',
//     email: 'sugara@mail.com'
// });

// Menyimpan kedalam collection
// contact1.save().then((contact) => console.log(contact));