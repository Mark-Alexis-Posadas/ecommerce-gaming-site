
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(userId) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            //remove password from response
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            console.error('Error in UserService.getUserById:', error);
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.userRepository.findByEmail(email);
        } catch (error) {
            console.error('Error in UserService.getUserByEmail:', error);
            throw error;
        }
    }

    async updateUser(userId, updateData) {
        try {
            //remove password from update data if it's empty
            if (updateData.password === '') {
                delete updateData.password;
            }

            const updated = await this.userRepository.updateById(userId, updateData);
            if (!updated) {
                throw new Error('User not found or no changes made');
            }
            
            return await this.getUserById(userId);
        } catch (error) {
            console.error('Error in UserService.updateUser:', error);
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const deleted = await this.userRepository.deleteById(userId);
            if (!deleted) {
                throw new Error('User not found');
            }
            
            return true;
        } catch (error) {
            console.error('Error in UserService.deleteUser:', error);
            throw error;
        }
    }

    async getAllUsers(page = 1, limit = 50) {
        try {
            const offset = (page - 1) * limit;
            const users = await this.userRepository.findAll(limit, offset);
            const totalUsers = await this.userRepository.count();
            
            return {
                users: users.map(user => {
                    const { password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                }),
                pagination: {
                    page,
                    limit,
                    total: totalUsers,
                    pages: Math.ceil(totalUsers / limit)
                }
            };
        } catch (error) {
            console.error('Error in UserService.getAllUsers:', error);
            throw error;
        }
    }

    async getUserStats() {
        try {
            return await this.userRepository.getStats();
        } catch (error) {
            console.error('Error in UserService.getUserStats:', error);
            throw error;
        }
    }
}

module.exports = UserService;