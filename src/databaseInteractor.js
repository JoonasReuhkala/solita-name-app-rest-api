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
    seed(1000);
  })
  .catch( error => {
    debugMongoose('Mongoose connection error');
    throw Error()
  });

  seed = async (key) => {
    debugMongoose('Seeding database, key:', key);
    employeeCache.names.forEach ( async employee => {
        const seed = new EmployeeData ({
          name: employee.name,
          amount: employee.amount,
          userKey: 1000, //just to make this work again :(
        });
        await seed.save();
      });
  },

module.exports = {

  seedDatabase : async (key) => {
    debugMongoose('Seeding database, key:', key);
    
    employeeCache.names.forEach ( async employee => {

      const seed = new EmployeeData ({
        name: employee.name,
        amount: employee.amount,
        userKey: 1001, //just to make this work again :(
      });
      
      await seed.save();
    });
  },

  getEmployeeAll: async (key) => 
    await EmployeeData.find({userKey: 1001})
    .then (response => {
      debugMongoose( 'getEmployeeAll: Success.');
      return response;
    })
    .catch(error => {
      debugMongoose( 'getEmployeeAll: Failure. Returning cache.');
      return employeeCache;
    }),

  saveEmployee: async (key) => {
    const seed = new EmployeeData ({
      name: "Joonas",
      amount: 1,
      userKey: 1001,
    });
    await seed.save();
  },

  removeEmployee: async (key) =>
    await EmployeeData.findOneAndRemove( {
      name : "Joonas",
      userKey: 1001,
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