# solita-name-app-rest-api

My implementation of https://github.com/solita/dev-academy-2021. This is a back end portion of a Name App. Here is a front end: https://github.com/JoonasReuhkala/solita-name-web-app.

For the back end Node.js (with JavaScript) was used with help of Express and Mongoose packages. For the front end I decided to use React with Axios. MERN stack as a whole was very new to me. In the future I might switch to TypeScript or Kotlin JS but otherwise I enjoyed learning about these technologies and I'm definitely going to use them again.

The REST API has following functionalities: <br/>
GET */api/employee will return { [employee { name, amount }], totalAmount } sorted by name <br/>
GET */api/employee/:name will return { employee { name, amount } } <br/>
GET */api/employee/byAmount will return { [employee { name, amount }], totalAmount } sorted by amount <br/>
GET */api/employee/totalAmountOf will return { totalAmount } <br/>

All of the calls need a query string of {key : 1001} because I'm an idiot. 
