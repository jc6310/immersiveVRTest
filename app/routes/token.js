const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("./../config/config.json");

/**
 * @swagger
 * /authentication:
 *     post:
 *       tags:
 *        - Authentication
 *       summary: Creates a JWT token.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           description: Creates a JWT token.
 *           schema:
 *             type: object
 *             required:
 *             - role  
 *             properties:
 *               role:
 *                 type: string
 *       responses:
 *         201:
 *           description: Created  
 *         400:
 *           description: Validation error
 */
router.post('/authentication', (req, res) => {
    const {
        role
    } = req.body;

    if (role === "admin") {
        const accessToken = jwt.sign({
            role: role
        }, config.accessSecretToken);
        res.json({
            accessToken,
            role: role
        });
    } else {
        res.status(400).send({
            success: false,
            message: "Role is invalid"
        });
    }
});
module.exports = router;