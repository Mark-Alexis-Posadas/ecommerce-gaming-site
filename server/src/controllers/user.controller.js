const services = require('../services/index.service');

class UserController {
    constructor() {
        this.userService = services.getUserService();
    }

    //return the currently authenticated user's profile
    async getProfile(req, res) {
        try {
            const user = await this.userService.getUserById(req.params.userId);
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    //updat the user details
    async updateProfile(req, res) {
        try {
            const user = await this.userService.updateUser(req.params.userId, req.body);
            res.json({
                success: true,
                data: user,
                message: 'User updated successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    //delete the user
    async deleteProfile(req, res) {
        try {
            await this.userService.deleteUser(req.params.userId);
            res.json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    //retrieves a list of all users (admin only)
    async getAllUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 50;
            
            const result = await this.userService.getAllUsers(page, limit);
            res.json({
                success: true,
                data: result.users,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    //retrieves user-related statistics
    async getUserStats(req, res) {
        try {
            const stats = await this.userService.getUserStats();
            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new UserController();