const express = require('express');
const userController = require('../controllers/user.controller');
const MiddlewareContainer = require('../middlewares/index.middleware');
const repositoryContainer = require('../repositories/index.repository');


const router = express.Router();

const middleware = new MiddlewareContainer(repositoryContainer);


//protected routes (require authentication)
router.get('/getProfile/:userId',
    middleware.verifyToken(),
    middleware.requireOwnership('userId'),
    userController.getProfile.bind(userController)
);

router.put('/updateProfile/:userId',
    middleware.rateLimit(10, 60 * 1000), // 10 requests per minute
    middleware.verifyToken(),
    middleware.validateUserUpdate(),
    middleware.requireOwnership('userId'), //ownership check
    userController.updateProfile.bind(userController)
);


module.exports = router;