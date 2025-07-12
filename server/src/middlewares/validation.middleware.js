class ValidationMiddleware {
    constructor(repositoryContainer) {
        this.repositoryContainer = repositoryContainer;
        this.userRepository = repositoryContainer.getUserRepository();
    }

    //validate registration request
    validateRegistration = async (req, res, next) => {
        const { username, email, password } = req.body;
        const errors = [];

        //basic validation
        if (!username || username.length < 3) {
            errors.push('Username must be at least 3 characters long');
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please provide a valid email address');
        }

        if (!password || password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        //check for existing users using repository
        try {
            if (email && await this.userRepository.existsByEmail(email)) {
                errors.push('Email already exists');
            }

            if (username && await this.userRepository.existsByUsername(username)) {
                errors.push('Username already exists');
            }
        } catch (error) {
            console.error('Validation database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during validation'
            });
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        next();
    };

    //validate login request
    validateLogin = (req, res, next) => {
        const { email, password } = req.body;
        const errors = [];

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please provide a valid email address');
        }

        if (!password) {
            errors.push('Password is required');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        next();
    };

    //validate user update request
    validateUserUpdate = async (req, res, next) => {
        const { username, email } = req.body;
        const errors = [];
        const userId = req.params.userId || req.user?.userId;

        try {
            //check if username is being updated and if it already exists
            if (username) {
                if (username.length < 3) {
                    errors.push('Username must be at least 3 characters long');
                } else {
                    const existingUser = await this.userRepository.findByUsername(username);
                    if (existingUser && existingUser.id.toString() !== userId.toString()) {
                        errors.push('Username already exists');
                    }
                }
            }

            //check if email is being updated and if it already exists
            if (email) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    errors.push('Please provide a valid email address');
                } else {
                    const existingUser = await this.userRepository.findByEmail(email);
                    if (existingUser && existingUser.id.toString() !== userId.toString()) {
                        errors.push('Email already exists');
                    }
                }
            }

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors
                });
            }

            next();
        } catch (error) {
            console.error('Update validation error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during validation'
            });
        }
    };

    //validate password change request
    validatePasswordChange = (req, res, next) => {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const errors = [];

        if (!currentPassword) {
            errors.push('Current password is required');
        }

        if (!newPassword || newPassword.length < 6) {
            errors.push('New password must be at least 6 characters long');
        }

        if (!confirmPassword) {
            errors.push('Password confirmation is required');
        }

        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            errors.push('New password and confirmation do not match');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        next();
    };

    //validate email format
    validateEmail = (req, res, next) => {
        const { email } = req.body;
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        next();
    };

    //validate required fields
    validateRequired = (fields = []) => {
        return (req, res, next) => {
            const errors = [];
            
            fields.forEach(field => {
                if (!req.body[field]) {
                    errors.push(`${field} is required`);
                }
            });

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors
                });
            }

            next();
        };
    };

    //validate object ID format (for MongoDB ObjectId)
    validateObjectId = (paramName = 'id') => {
        return (req, res, next) => {
            const id = req.params[paramName];
            
            if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
            }

            next();
        };
    };
}

module.exports = ValidationMiddleware;