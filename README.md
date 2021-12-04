# immersiveVRTest

## ImmersiveVR Test Using API with NodeJs

This assessment Api for ImmersiveVR using Node, Express, Sequelize, and JWT with the following requirements.

### Requirements

1. Basic JWT Authentication: ability to log in as administrator.
3. Create DB tables Companies and Employees as stated in the word doc.
2. Create CRUD for Companies and Employees.
3. Use Express validation middleware.
4. Implemet Express middleware to enforce authorisation.
5. Add swagger.
6. Create Integration tests for API’s.
7. Provide README file.

___

### Whats Done

1. Basic JWT Authentication: ability to log in as administrator. (Done JWT auth implemented)
3. Create DB tables Companies and Employees as stated in the word doc. (Done)
2. Create CRUD for Companies and Employees. (Done - API exposed for this)
3. Use Express validation middleware. (Done)
4. Implemet Express middleware to enforce authorisation. (Done)
5. Add swagger.(Done)
6. Create Integration tests for API’s. (Done - basic integration tests)
7. Provide README file. (Done)
___

### Install

Make sure you have latest NodeJS installed.

### Installing

1. git clone https://github.com/jc6310/immersiveVRTest.git
2. Need to update database settings in dbconfig.js and create a db.
3. cd folder-name && npm install and npm start.
4. Go to http://localhost:8080/api/docs.
5. TO RUN TESTS: Once running to need to generate an auth authentication and update the variable(process.env.TEST_VAR) in the server.js file to run the tests.

### Commands

1. NPM start - Starts the app
2. NPM run dev - Starts the app in dev mode
3. NPM test - Runs the integration tests

### URLs

1. http://localhost:8080/api/docs/ -- swagger
2. http://localhost:8080/api/authentication -- authentication for token
3. http://localhost:8080/api/employee -- CRUD for employee
4. http://localhost:8080/api/company -- CRUD for company
___

### License

MIT License

Copyright (c) 2021 James Costello

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
