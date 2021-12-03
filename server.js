const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUi = require('swagger-ui-express');
const Sequelize = require('sequelize')
const authTokenApi = require('./app/routes/token');
const companyApi = require('./app/routes/company');
const employeeApi = require('./app/routes/employee');
const db = require("./app/models");

const app = express();
 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerOptions = {  
    swaggerDefinition: {  
        swagger:"2.0",
        info: {  
            title:'Employee API',  
            version:'1.0.0'
        },
        schemes: [
          "http"
        ],
    },  
    apis:['./app/routes/*.js'],  
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  

app.use('/api', authTokenApi);
app.use('/api', companyApi);
app.use('/api', employeeApi);
app.use('/api/docs', swaggerUi.serve,swaggerUi.setup(swaggerDocs)); 
 
db.sequelize.sync();

app.get('*', function(req, res){
  res.send('Url use is either not available or incorrect', 404);
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is srunning on port ${PORT}.`);
});