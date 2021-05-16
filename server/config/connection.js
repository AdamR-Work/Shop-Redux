const mongoose = require('mongoose');
//test
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shop-redux', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).catch(error => console.log(error));;

module.exports = mongoose.connection;
