const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require("./..//middleware/authenticate");
const config = require("./../config/config.json");
const db = require("./../models");
const Employee = db.employee;

 /** 
 * @swagger 
 * /Employee: 
 *   post: 
 *     tags:
 *        - Employee
 *     description: Creates an employee 
 *     parameters: 
 *     - name: fname 
 *       description: The employee first name 
 *       required: true 
 *       type: String 
 *     - name: surname 
 *       description: The employees company 
 *       type: String 
 *     - name: phone 
 *       description: The employee phone
 *       type: String 
 *     - name: website 
 *       description: The employee phone 
 *       type: String 
 *     responses:  
 *       201: 
 *         description: Created  
 *   
 */  
router.post('/employee', authenticateToken, (req, res) => {
  Employee.create(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the companies."
      });
    });
});

 /** 
 * @swagger 
 * /Employee: 
 *   get: 
 *     tags:
 *        - Employee
 *     description: Gets all employees 
 *     responses:  
 *       200: 
 *         description: Returns all employees
 */  
router.get('/employee', authenticateToken, (req, res) => {
  Employee.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee."
      });
    });
});

 /** 
 * @swagger 
 * /Employee: 
 *   put: 
 *     tags:
 *        - Employee
 *     description: Gets employee by email
 *     parameters: 
 *     - name: Employee object
 *     responses:  
 *       204: 
 *         description: Updates employee  
 */  
router.put('/employee', authenticateToken, (req, res) => {
  const { email } = req.body.email;
 
  Employee.update(req.body, {
    where: { email: email }
  })
   .then(num => {
      if (num == 1) {
        res.status(204).send({
          message: "Employee data was updated successfully."
        });
      } else {
        res.status(402).send({
          message: `Cannot update employee with email=${email}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employee with email=" + email
      });
    });
});

 /** 
 * @swagger 
 * /Employee: 
 *   delete: 
 *     tags:
 *        - Employee
 *     description: Delete employee by email
 *     parameters: 
 *     - name: id 
 *       description: Employee by email
 *       required: true 
 *       type: String 
 *     responses:  
 *       200: 
 *         description: Delete employee 
 */  
router.delete('/employee', authenticateToken, (req, res) => {
  const email  = req.body.email;

 Employee.destroy({
    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.status(402).send({
          message: `Cannot delete employee with email=${email}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with email=" + email
      });
    });
 
});
module.exports = router;