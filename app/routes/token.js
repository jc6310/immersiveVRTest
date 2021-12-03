const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("./../config/config.json");

 /** 
 * @swagger 
 * /Authentication: 
 *   post: 
 *     tags:
 *        - Authentication
 *     description: Generates a JWT token
 *     parameters: 
 *     - name: role 
 *       description: Admin role
 *       required: true 
 *       type: String 
 *     responses:  
 *       201: 
 *         description: Returns a valid JWT token
 */  
router.post('/generatetoken', (req, res) => {
    const { appId } = req.body;

    if (appId === "AppFE") {
        const accessToken = jwt.sign({ appId: appId }, config.accessSecretToken);
        res.json({
            accessToken,
            appId:appId
        });
    } else {
        res.send('App Id is invalid');
    }
});
module.exports = router;