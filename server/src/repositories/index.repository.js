const pool = require('../config/database');
const UserRepository = require('./user.repository');

class RepositoryContainer {
    constructor() {
        this.userRepository = new UserRepository(pool);
    }

    getUserRepository() {
        return this.userRepository;
    }
}

module.exports = new RepositoryContainer();