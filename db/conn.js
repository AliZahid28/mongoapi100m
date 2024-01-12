const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/atheletes').then(() => console.log('db connected')).catch(e => console.log('db not connected'))