const { Router } = require('express');
const Debug = require('debug');
const database = require('../databaseInteractor.js')

//employy object{name: String, amount: Number}
//api/employee -> get array of employees objects + totalAmount
//api/employee/:name -> get employee object by name
//api/employee/byAmount -> get sorted array of employees
//api/employee//totalAmountOf -> get number of total employees

const expressDebug = Debug("app:router:express");

const expressRouter = Router();

expressRouter.get('/seed', async (request, response) => {

  await database.seedDatabase(request.query.userKey);
  const employeeAll = await database.getEmployeeAll(request.query.userKey);

  response.send({
    names: employeeAll.sort(byName), 
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

expressRouter.get('/', async (request, response) => {

  const employeeAll = await database.getEmployeeAll(request.query.userKey);

  response.send({
    names: employeeAll.sort(byName), 
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

expressRouter.get('/byAmount', async (request, response) => {
  const employeeAll = await database.getEmployeeAll(request.query.userKey);

  response.send({
    names: employeeAll.sort(byAmount), 
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

expressRouter.get('/totalAmountOf', async (request, response) => {
  const employeeAll = await database.getEmployeeAll(request.query.userKey);
  response.send({
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

expressRouter.get('/:name', async (request, response) => {

  const employeeAll = await database.getEmployeeAll(request.query.userKey);

  const employee = employeeAll.find( employee => 
    employee.name.toLowerCase() == request.params.name.toLowerCase() 
  );

  response.send(employee)
});

expressRouter.post('/', async (request, response) => {
  expressDebug("post:" + request.query.userKey);
  await database.saveEmployee(request.query.userKey);
  const employeeAll = await database.getEmployeeAll(request.query.userKey);
  response.send({
    names: employeeAll.sort(byName), 
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

expressRouter.delete('/', async (request, response) => {
  expressDebug(request.body.userKey);
  await database.removeEmployee(request.body.userKey);
  const employeeAll = await database.getEmployeeAll(request.query.userKey);
  response.send({
    names: employeeAll.sort(byName), 
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

function totalAmountOf (employeeAll) { 
  return employeeAll.reduce( (total, employee) => total + employee.amount, 0 );
}

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

module.exports = expressRouter;