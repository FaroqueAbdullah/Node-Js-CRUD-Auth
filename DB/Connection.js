const mongoose = require('mongoose')

const URI = 'mongodb+srv://test-mongodb:Abir123@cluster0.c5u8i.mongodb.net/node-js-test?retryWrites=true&w=majority';

const connectDB = async() => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('Error '))
}

module.exports = connectDB;