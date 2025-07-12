const repositories = require('../repositories/index.repository');
const AuthService = require('./auth.service');
const UserService = require('./user.service');

class ServiceContainer {
    constructor() {
        this.userService = new UserService(repositories.getUserRepository());
        this.authService = new AuthService(repositories.getUserRepository());
    }

    getAuthService() {
        return this.authService;
    }

    getUserService() {
        return this.userService;
    }
}

module.exports = new ServiceContainer();