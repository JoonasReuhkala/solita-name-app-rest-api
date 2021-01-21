const Express = require('express');
const Mongoose = require( 'mongoose');
const solita = require( './solita.json');

const router = Express.Router();

const addressOfDb = 'mongodb://localhost/solita-name-app';

const employeeCache = solita.names;
let employeeAll = {}

const LogScheme = new Mongoose.Schema( {
    text: {
      type: String, 
      required : true,
    },
});

const EmployeeScheme = new Mongoose.Schema(
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
  }
);

const EmployeeModel = Mongoose.model('Employee', EmployeeScheme);

async function seedDatabase() {
  employeeCache.forEach ( async employee => {
      const seed = new EmployeeModel ({
        name: employee.name,
        amount: employee.amount,
      });
      console.log(seed);
      await seed.save();
    });
}

//window.addEventListener("beforeunload", function(event) { ... });

Mongoose.connect(addressOfDb)
  .then(()=> {
    console.log('Connected to MongoDb')
    seedDatabase();
  })
  .catch( exception => console.log("Couldn't connect to MongoDb", exception));

router.get('/', async (request, response) => {
/*   const sortedList = employeeAll.sort(byName);
  response.send({
    names: sortedList, 
    totalAmount: totalAmount()
  }); */

  const data = await EmployeeModel
  .find({});

  employeeAll = data;

  const sortedList = employeeAll.sort(byName);
  response.send({
    names: sortedList, 
    totalAmount: totalAmount()
  });

/*   const employee = new EmployeeModel ({
      name: "Joonas",
      amount: 1
  });

  await employee.save(); */

});

router.get('/amount', async (request, response) => {

  const data = await EmployeeModel
    .find({});

  employeeAll = data;

  const sortedList = employeeAll.sort(byAmount);
  response.send({
    names: sortedList, 
    totalAmount: totalAmount()
  });

/*   await EmployeeModel.deleteOne({
    name: 'Joonas'
  }); */
});

function byName(employeeA, employeeB) {
  const a = employeeA.name.toLowerCase();
  const b = employeeB.name.toLowerCase();
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function byAmount(employeeA, employeeB) {
  const a = employeeA.amount;
  const b = employeeB.amount;
  if (a < b) return 1;
  if (a > b) return -1;
  return byName(employeeA, employeeB);
}

router.get('/total', (request, response) => {
  response.send({
    totalAmount: totalAmount()
  });
});

function totalAmount () { 
  return employeeAll.reduce( (total, employee) => total + employee.amount, 0 );
}

router.get('/:name', (request, response) => {
  const employee = employeeAll.find( 
    employee => employee.name.toLowerCase() == request.params.name.toLowerCase() 
  )
  response.send(employee)
});

module.exports = router;