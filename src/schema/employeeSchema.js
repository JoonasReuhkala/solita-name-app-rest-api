const Mongoose = require('mongoose');

const employeeSchema = new Mongoose.Schema(
  {
    name: {
      type: String, 
      required : true,
      minlength: 3,
      maxlength: 15,
    },
    amount: {
      type: Number, 
      required : true,
      min: 0,
      max: 99,
    },
    userKey: {
      type: Number, 
      //required : true,
    },
  }
);

module.exports = employeeSchema;