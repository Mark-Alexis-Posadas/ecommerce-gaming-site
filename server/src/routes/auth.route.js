const express = require('express');
const authController = require('../controllers/auth.controller');
const MiddlewareContainer = require('../middlewares/index.middleware');
const repositoryContainer = require('../repositories/index.repository');


const router = express.Router();

const middleware = new MiddlewareContainer(repositoryContainer);

router.post('/register', 
    middleware.rateLimit(5, 15 * 60 * 1000),
    middleware.validateRegistration(),
    authController.register.bind(authController)
);

router.post('/login',
    middleware.rateLimit(10, 15 * 60 * 1000),
    middleware.validateLogin(),
    authController.login.bind(authController)
);


// router.put('/profile',
//     middleware.verifyToken,
//     authController.updateProfile
// );

// router.put('/change-password',
//     middleware.verifyToken,
//     authController.changePassword
// );

// //test routes
// router.get('/test-public', (req, res) => {
//     res.json({
//         success: true,
//         message: 'Public endpoint working',
//         timestamp: new Date().toISOString()
//     });
// });

// router.get('/test-protected',
//     middleware.verifyToken,
//     (req, res) => {
//         res.json({
//             success: true,
//             message: 'Protected endpoint working',
//             user: req.user,
//             timestamp: new Date().toISOString()
//         });
//     }
// );

// //optional auth test route
// router.get('/test-optional',
//     middleware.optionalAuth,
//     (req, res) => {
//         res.json({
//             success: true,
//             message: 'Optional auth endpoint working',
//             user: req.user,
//             authenticated: !!req.user,
//             timestamp: new Date().toISOString()
//         });
//     }
// );



// router.post('/', userController.createUser.bind(userController));
// router.get('/stats', userController.getUserStats.bind(userController));
// router.get('/:id', userController.getUser.bind(userController));
// router.put('/:id', userController.updateUser.bind(userController));
// router.delete('/:id', userController.deleteUser.bind(userController));
// router.get('/', userController.getAllUsers.bind(userController));


module.exports = router;