//permissions, roles, ownership
class AuthorizationMiddleware {
    constructor(repositoryContainer) {
        this.repositoryContainer = repositoryContainer;
        this.userRepository = repositoryContainer.getUserRepository();
    }

    //check if user is admin
    isAdmin = async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }

            //get fresh user data from repository
            const user = await this.userRepository.findById(req.user.userId);
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            //check admin privileges - modify this based on your needs
            //option 1: Check if user has admin role (if you have a role field)
            //if (user.role !== 'admin') {
            
            //option 2: Check if email contains 'admin' (current implementation)
            if (!user.email.includes('admin')) {
                return res.status(403).json({
                    success: false,
                    message: 'Admin access required'
                });
            }

            next();
        } catch (error) {
            console.error('Admin check error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    //check if user owns the resource (for user-specific operations)
    requireOwnership = (resourceUserIdParam = 'userId') => {
        return async (req, res, next) => {
            try {
                if (!req.user) {
                    return res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                }

                const resourceUserId = req.params[resourceUserIdParam] || req.body[resourceUserIdParam];
                
                if (!resourceUserId) {
                    return res.status(400).json({
                        success: false,
                        message: 'Resource user ID is required'
                    });
                }

                //allow if user owns the resource or is admin
                if (req.user.userId.toString() !== resourceUserId.toString()) {
                    const user = await this.userRepository.findById(req.user.userId);
                    if (!user || !user.email.includes('admin')) {
                        return res.status(403).json({
                            success: false,
                            message: 'Access denied'
                        });
                    }
                }

                next();
            } catch (error) {
                console.error('Ownership check error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        };
    };

    //check if user has specific role
    requireRole = (requiredRole) => {
        return async (req, res, next) => {
            try {
                if (!req.user) {
                    return res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                }

                const user = await this.userRepository.findById(req.user.userId);
                
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'User not found'
                    });
                }

                //check if user has required role
                if (user.role !== requiredRole) {
                    return res.status(403).json({
                        success: false,
                        message: `${requiredRole} access required`
                    });
                }

                next();
            } catch (error) {
                console.error('Role check error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        };
    };

    //check if user has any of the specified roles
    requireAnyRole = (roles = []) => {
        return async (req, res, next) => {
            try {
                if (!req.user) {
                    return res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                }

                const user = await this.userRepository.findById(req.user.userId);
                
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'User not found'
                    });
                }

                //check if user has any of the required roles
                if (!roles.includes(user.role)) {
                    return res.status(403).json({
                        success: false,
                        message: 'Insufficient permissions'
                    });
                }

                next();
            } catch (error) {
                console.error('Role check error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        };
    };
}

module.exports = AuthorizationMiddleware;