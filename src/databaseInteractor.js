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
  })
  .catch( error => {
    debugMongoose('Mongoose connection error');
  });


module.exports = {

  seedDatabaseWithKey: (key) => {
  
    debugMongoose('Seeding database, key:', key);
    
    employeeCache.names.forEach ( employee => {
  
      const seedDatabase = new EmployeeData ({
        name: employee.name,
        amount: employee.amount,
        userKey: key,
      });
      
      seedDatabase.save();
    });
  },

  getEmployeeAll: async (key) => 
    await EmployeeData.find({userKey: key})
    .then (response => {
      debugMongoose( 'getEmployeeAll: Success.');
      return response;
    })
    .catch(error => {
      debugMongoose( 'getEmployeeAll: Failure. Returning cache.');
      return employeeCache;
    }),

  saveEmployee: async (key) => {
    const seedDatabase = new EmployeeData ({
      name: "Joonas",
      amount: 1,
      userKey: key,
    });
    await seedDatabase.save();
  },

  removeEmployee: async (key) =>
    await EmployeeData.findOneAndRemove( {
      name : "Joonas",
      userKey: key,
    })    
    .then (response => {
      debugMongoose( 'removeEmployy: Success.');
      return response;
    })
    .catch(error => {
      debugMongoose( 'removeEmployee: Failure.');
      return new Error("Failed to delete data.");
    })
};