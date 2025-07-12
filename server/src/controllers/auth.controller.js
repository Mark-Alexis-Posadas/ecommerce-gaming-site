const services = require('../services/index.service');
const jwt = require('jsonwebtoken')

class AuthController {
    constructor() {
        this.authService = services.getAuthService();
    }

    //register a new user accouunt
    async register(req, res) {
        try {
            const user = await this.authService.register(req.body);

            //  const token = jwt.sign(
            //     { 
            //         userId: user.id,
            //         email: user.email,
            //         username: user.username 
            //     },
            //     process.env.JWT_SECRET || 'sekretong-malupit-pwede-pabulong',
            //     { expiresIn: '24h' }
            // );

            res.status(201).json({
                success: true,
                data: user,
                message: 'User has been registered successfully',
                // token
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    //login an existing user account
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const user = await this.authService.login(email, password);

             const token = jwt.sign(
                { 
                    userId: user.id,
                    email: user.email,
                    username: user.username 
                },
                process.env.JWT_SECRET || 'sekretong-malupit-pwede-pabulong',
                { expiresIn: '24h' }
            );

            res.status(200).json({
                success: true,
                data: user,
                message: 'User has been login successfully',
                token
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    //logout the current user account
    async logout(req, res) {

    }

    //verify teh user account
    async verifyAccount(req, res) {

    }

    //handles forgot password request
    async forgotPassword(req, res) {

    }

    //reset the user's password
    async resetPassword(reg, res) {

    }

}

module.exports = new AuthController();