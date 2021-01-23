const Mongoose = require( 'mongoose');
const Debug = require('debug');

const debugMongoose = Debug('app:mongoose');

const addressOfDb = 'mongodb://localhost/solita-name-app';

const employeeSchema = require('./schema/employeeSchema');
const EmployeeData = Mongoose.model('Employee', employeeSchema);

const employeeCache = require('./json/solita.json');

Mongoose.connect( 
  addressOfDb, { useNewUrlParser: true, useUnifiedTopology: true }) //to get rid of warnigs
  .then(()=> {
    debugMongoose('Connected to MongoDb');
    seedDatabase();
  })
  .catch( error => debugMongoose("Couldn't connect to MongoDb", error));

seedDatabase = async () => {
  employeeCache.names.forEach ( async employee => {
      const seed = new EmployeeData ({
        name: employee.name,
        amount: employee.amount,
      });
      console.log(seed);
      await seed.save();
    });
}

module.exports = {
  getEmployeeAll: async () => 
    await EmployeeData.find({})
    .then (response => {
      debugMongoose( 'getEmployeeAll: Success.');
      return response;
    })
    .catch(response => {
      debugMongoose( 'getEmployeeAll: Failure. Returning cache.');
      return employeeCache;
    }),

  saveEmployee: async () => {
    const Joonas = EmployeeData ({
      name: "Joonas",
      amount: 1
    });

    return await Joonas.save()
    .then (response => {
      debugMongoose( 'saveEmployee: Success.');
      return response;
    })
    .catch(response => {
      debugMongoose( 'saveEmployee: Failure. Returning cache.');
      return null;
    })
  },

  removeEmployee: async () => {
    await EmployeeData.findOneAndRemove( {
      name : "Joonas"
    });
    return true;
  }
};