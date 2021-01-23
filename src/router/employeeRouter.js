const { Router } = require('express');
const database = require('../databaseInteractor.js')

const expressRouter = Router();

expressRouter.get('/', async (request, response) => {
  const employeeAll = await database.getEmployeeAll();

  response.send({
    names: employeeAll.sort(byName), 
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

expressRouter.get('/byAmount', async (request, response) => {
  const employeeAll = await database.getEmployeeAll();

  response.send({
    names: employeeAll.sort(byAmount), 
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

expressRouter.get('/totalAmountOf', async (request, response) => {
  const employeeAll = database.getEmployeeAll();
  response.send({
    totalAmountOf: totalAmountOf(employeeAll)
  });
});

expressRouter.get('/:name', async (request, response) => {

  const employeeAll = await database.getEmployeeAll();

  const employee = employeeAll.find( employee => 
    employee.name.toLowerCase() == request.params.name.toLowerCase() 
  );

  response.send(employee)
});

expressRouter.post('/'), async (request, response) => {
  await database.saveEmployee();
  const employeeAll = await database.getEmployeeAll();
  response.send(employeeAll);
}

expressRouter.delete('/'), async (request, response) => {
  await database.removeEmployee();
  const employeeAll = await database.getEmployeeAll();
  response.send(employeeAll);
}

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