const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require("./..//middleware/authenticate");
const config = require("./../config/config.json");
const db = require("./../models");
const Companies = db.companies;
const {body, validationResult} = require('express-validator');
 
/**
 * @swagger
 * /company:
 *     post:
 *       tags:
 *        - Company
 *       summary: Creates a new company.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: company
 *           description: The company to create.
 *           schema:
 *             type: object
 *             required:
 *             - name  
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               website:
 *                 type: string
 *       responses:
 *         201:
 *           description: Created
 *         200:
 *           description: Company Exists      
 *         400:
 *           description: Validation error
 */
router.post('/company',
       body('name').not().isEmpty().withMessage('Name must not be emty to create a new company'),
       authenticateToken, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({
          success: false,
          error: errors.array()
      });
  }

  Companies.findOne({
          where: {
              name: req.body.name
          }
      })
      .then(function(obj) {
          if (obj) {
              return res.status(200).send("This company already exists");
          }
          return Companies.create(req.body)
              .then(data => {
                  res.status(201).send(data);
              })
              .catch(err => {
                  res.status(500).send({
                      success: false,
                      message: err.message + " occurred while creating the companies."
                  });
              });
    }) 
});

 /** 
 * @swagger 
 * /company: 
 *   get: 
 *     tags:
 *      - Company
 *     summary: Gets all companies.
 *     description: Gets all companies
 *     produces:
 *         - application/json
 *     responses:  
 *       200: 
 *         description: Returns all companies
 */  
router.get('/company', authenticateToken, (req, res) => {
  Companies.findAll()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            message: err.message + " occurred while creating the companies."
        });
    });
});

/**
 * @swagger
 * /company:
 *     put:
 *       tags:
 *        - Company
 *       summary: Update company by name.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: company
 *           description: Update company to details.
 *           schema:
 *             type: object
 *             required:
 *             - name  
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               website:
 *                 type: string
 *       responses:
 *         204: 
 *           description: Updates company  
 *         400:
 *           description: Validation error
 *         402:
 *           description: Problem with name provided      
 */
router.put('/company',  
          body('name').not().isEmpty().withMessage('Name must not be emty to update'),
          authenticateToken, (req, res) => {         
  const { name } = req.body.name;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({
          success: false,
          error: errors.array()
      });
  }

  Companies.update(req.body, {
    where: { name: name }
  })
  .then(num => {
    if (num == 1) {
        res.status(204).send({
          message: "Company data was updated successfully."
        });
      } else {
        res.status(402).send({
          success: false,
          message: "Cannot update company with name="+name
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: "Error updating company with name="+name
      });
    });
});

/**
 * @swagger
 * /company:
 *     delete:
 *       tags:
 *        - Company
 *       summary: Delete company by name.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: company
 *           description: Delete company to details.
 *           schema:
 *             type: object
 *             required:
 *             - name  
 *             properties:
 *               name:
 *                 type: string
 *       responses:
 *         200: 
 *           description: Deletes company  
 *         400:
 *           description: Validation error
 *         402:
 *           description: Problem with name provided      
 */
router.delete('/company',
            body('name').not().isEmpty().withMessage('Name must not be emty'),
            authenticateToken, (req, res) => {
  const name = req.body.name;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({
          success: false,
          error: errors.array()
      });
  }

  Companies.destroy({
          where: {
              name: name
          }
      })
      .then(num => {
          if (num == 1) {
              res.status(200).send({
                  success: false,
                  message: "Company was deleted successfully!"
              });
          } else {
              res.status(402).send({
                  success: false,
                  message: `Cannot delete company with name=${name}.`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              success: false,
              message: "Could not delete company with name=" + name
          });
      });
});
module.exports = router;