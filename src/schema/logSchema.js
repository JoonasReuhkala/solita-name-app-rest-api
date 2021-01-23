const Mongoose = require('mongoose');

const logSchema = new Mongoose.Schema( {
  text: {
    type: String, 
    required : true,
  },
});

module.exports = logSchema;