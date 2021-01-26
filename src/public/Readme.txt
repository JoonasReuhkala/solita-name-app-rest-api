Solita Dev Academy Exercise 2021
Name Application
https://github.com/solita/dev-academy-2021

This is the back end portion of the exercise
Node.js (JavaScript) & MongoDB project with
with help of Express & Mongoose packages

By Joonas Reuhkala
https://github.com/JoonasReuhkala

REST API

First seed the dabase with:
/api/employee/seed?userKey=1000

userKey can be whatever number you prefer

Then you can do following operations

to get all employees sorted by name:
/api/employee?userKey=1000

to get all employees sorted by amount:
/api/employee/byAmount?userKey=1000

to get an employee by name:
/api/employee/:name?userKey=1000

to get total number of employees:
/api/employee/totalAmountOf?userKey=1000