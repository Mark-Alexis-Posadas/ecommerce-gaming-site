const { hashPassword, comparePassword } = require("../utils/hashAndComparePassword");

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {
        try {
            
            const existingEmail = await this.userRepository.existsByEmail(userData.email);
            if (existingEmail) {
                throw new Error('User with this email already exists');
            }

            const existingUsername = await this.userRepository.existsByUsername(userData.username);
            if (existingUsername) {
                throw new Error('User with this username already exists');
            }

            //hash the password before storing
            const hashedPassword = hashPassword(userData.password);

            //create user with hashed password
            const userDataWithHashedPassword = {
                ...userData,
                password: hashedPassword
            };

            //create user
            const userId = await this.userRepository.create(userDataWithHashedPassword);
            return await this.userRepository.findById(userId);
        } catch (error) {
            console.error('Error in AuthService.createUser:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }

            //compare provided password with stored hashed password
            const isPasswordValid = comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            //remove password from response
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            console.error('Error in AuthService.login:', error);
            throw error;
        }
    }

}

module.exports = AuthService;