const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://rivollier:admin@cluster0.lsoov5a.mongodb.net/weatherapp4';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
