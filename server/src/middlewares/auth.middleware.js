const jwt = require('jsonwebtoken');

//jwt verifications
class AuthMiddleware {
    constructor(repositoryContainer) {
        this.repositoryContainer = repositoryContainer;
        this.userRepository = repositoryContainer.getUserRepository();
    }

    //main authentication middleware
    verifyToken = async (req, res, next) => {
        try {
            
            //get token from header
            const authHeader = req.headers.authorization;
            
            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: 'Access token is required'
                });
            }

            //extract token from "Bearer <token>"
            const token = authHeader.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Access token is required'
                });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

            const user = await this.userRepository.findById(decoded.userId);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            //add user info to request object
            req.user = {
                userId: decoded.userId,
                email: decoded.email,
                username: decoded.username,
                fullUser: user 
            };

            next();
        } catch (error) {
            console.error('Token verification error:', error);
            
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
            
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    //optional authentication (doesn't fail if no token)
    optionalAuth = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader) {
                req.user = null;
                return next();
            }

            const token = authHeader.split(' ')[1];
            
            if (!token) {
                req.user = null;
                return next();
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = await this.userRepository.findById(decoded.userId);
            
            if (user) {
                req.user = {
                    userId: decoded.userId,
                    email: decoded.email,
                    username: decoded.username,
                    fullUser: user
                };
            } else {
                req.user = null;
            }

            next();
        } catch (error) {
            console.error('Optional auth error:', error);
            req.user = null;
            next();
        }
    };
}

module.exports = AuthMiddleware;