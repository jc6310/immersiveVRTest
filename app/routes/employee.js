const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require("./..//middleware/authenticate");
const config = require("./../config/config.json");
const db = require("./../models");
const Employee = db.employees;
const {body, validationResult} = require('express-validator');

/**
 * @swagger
 * /employee:
 *     post:
 *       tags:
 *        - Employee
 *       summary: Creates a new employee.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: employee
 *           description: The employee to create.
 *           schema:
 *             type: object
 *             required:
 *             - fname
 *             - surname
 *             properties:
 *               fname:
 *                 type: string
 *               surname:
 *                 type: string
 *               company:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *       responses:
 *         201:
 *           description: Created
 *         200:
 *           description: Employee Exists      
 *         400:
 *           description: Validation error
 */  
router.post('/employee', 
  body('fname').not().isEmpty().withMessage('First name must not be emty'),
  body('surname').not().isEmpty().withMessage('Surname must not be emty'),
  authenticateToken, (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({
          success: false,
          error: errors.array()
      });
  }

  Employee.findOne({
          where: {
              fname: req.body.fname,
              surname: req.body.surname
          }
      })
      .then(function(obj) {
          if (obj) {
              return res.status(200).send("This employee already exists");
          }
          return Employee.create(req.body)
              .then(data => {
                  res.status(201).send(data);
              })
              .catch(err => {
                  res.status(500).send({
                      success: false,
                      message: err.message + " occurred while creating the employee."
                  });
              });
      })
});

/** 
 * @swagger 
 * /employee: 
 *   get: 
 *     tags:
 *      - Employee
 *     summary: Gets all employees.
 *     description: Gets all employees
 *     produces:
 *         - application/json
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
              success: false,
              message: err.message + " occurred while creating the employees."
          });
      });
});

 /**
 * @swagger
 * /employee:
 *     put:
 *       tags:
 *        - Employee
 *       summary: Update employee by first name and surname.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: employee
 *           description: Update employee to details.
 *           schema:
 *             type: object
 *             required:
 *             - fname
 *             - surname
 *             properties:
 *               fname:
 *                 type: string
 *               surname:
 *                 type: string
 *               company:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *       responses:
 *         204: 
 *           description: Updates employee  
 *         400:
 *           description: Validation error
 *         402:
 *           description: Problem with name provided      
 */
router.put('/employee', 
            body('fname').not().isEmpty().withMessage('First name must not be emty'),
            body('surname').not().isEmpty().withMessage('Surname must not be emty'),
            authenticateToken, (req, res) => {
  const { fname } = req.body.fname;
  const { surname } = req.body.surname;

  Employee.update(req.body, {
    where: {
      fname: req.body.fname,
      surname: req.body.surname
    }
  })
   .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Employee data was updated successfully."
        });
      } else {
        res.status(402).send({
          success: false,
          message: "Cannot update employee with name="+fname+surname
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: "Error updating employee with name="+fname+surname
      });
    });
});

/**
 * @swagger
 * /employee:
 *     delete:
 *       tags:
 *        - Employee
 *       summary: Delete employee by name.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: employee
 *           description: Delete employee to details.
 *           schema:
 *             type: object
 *             required:
 *             - fname
 *             - surname
 *             properties:
 *               fname:
 *                 type: string
 *               surname:
 *                 type: string
 *       responses:
 *         200: 
 *           description: Deletes employee  
 *         400:
 *           description: Validation error 
 */
router.delete('/employee', authenticateToken, (req, res) => {
  const { fname } = req.body.fname;
  const { surname } = req.body.surname;

 Employee.destroy({
    where: {
      fname: req.body.fname,
      surname: req.body.surname
    }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Cannot delete employee with name="+fname+surname
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: "Error delete employee with name="+fname+surname
      });
    });
 
});
module.exports = router;