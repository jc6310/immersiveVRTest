const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require("./..//middleware/authenticate");
const config = require("./../config/config.json");
const db = require("./../models");
const Companies = db.companies;

 /** 
 * @swagger 
 * /Company: 
 *   post: 
 *     tags:
 *        - Company
 *     description: Creates an company 
 *     produces:
 *          - application/json
 *     parameters: 
 *     - name: name 
 *       description: The companies name 
 *       required: true 
 *       type: String 
 *     - name: email 
 *       description: The company email 
 *       type: String 
 *     - name: phone 
 *       description: The company phone no
 *       type: String 
 *     - name: website 
 *       description: The companies website 
 *       type: String 
 *     responses:  
 *       201: 
 *         description: Created  
 *   
 */  
router.post('/company', authenticateToken, (req, res) => {

  Companies.create(req.body)
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
 * /Company: 
 *   get: 
 *     tags:
 *        - Company
 *     description: Gets all companies
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
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
});

 /** 
 * @swagger 
 * /Company: 
 *   put: 
 *     tags:
 *        - Company
 *     description: Update company by email
 *     parameters: 
 *     - name: Company object
 *     responses:  
 *       204: 
 *         description: Updates company  
 */  
router.put('/company', authenticateToken, (req, res) => {
  const { email } = req.body.email;
 
  Companies.update(req.body, {
    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.status(204).send({
          message: "Company data was updated successfully."
        });
      } else {
        res.status(402).send({
          message: `Cannot update company with email=${email}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating company with email=" + email
      });
    });
});

 /** 
 * @swagger 
 * /Company: 
 *   delete: 
 *     tags:
 *        - Company
 *     description: Delete company by email
 *     parameters: 
 *     - name: email 
 *       description: Company by email
 *       required: true 
 *       type: String 
 *     responses:  
 *       200: 
 *         description: Delete company 
 */  
router.delete('/company', authenticateToken, (req, res) => {
  const email  = req.body.email;

 Companies.destroy({
    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Company was deleted successfully!"
        });
      } else {
        res.status(402).send({
          message: `Cannot delete company with email=${email}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete company with email=" + email
      });
    });
 
});
module.exports = router;