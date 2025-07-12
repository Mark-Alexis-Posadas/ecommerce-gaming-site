const AuthMiddleware = require("./auth.middleware");
const AuthorizationMiddleware = require("./authorization.middleware");
const RateLimitMiddleware = require("./rateLimit.middleware");
const ValidationMiddleware = require("./validation.middleware");


class MiddlewareContainer {
    constructor(repositoryContainer) {
        this.repositoryContainer = repositoryContainer;
        
        //initialize all middleware classes
        this.authMiddleware = new AuthMiddleware(repositoryContainer);
        this.authorizationMiddleware = new AuthorizationMiddleware(repositoryContainer);
        this.validationMiddleware = new ValidationMiddleware(repositoryContainer);
        this.rateLimitMiddleware = new RateLimitMiddleware();
    }

    //auth middleware methods
    getAuthMiddleware() {
        return this.authMiddleware;
    }

    //authorization middleware methods
    getAuthorizationMiddleware() {
        return this.authorizationMiddleware;
    }

    //validation middleware methods
    getValidationMiddleware() {
        return this.validationMiddleware;
    }

    //rate limit middleware methods
    getRateLimitMiddleware() {
        return this.rateLimitMiddleware;
    }

    //convenience methods for common operations
    verifyToken() {
        return this.authMiddleware.verifyToken;
    }

    optionalAuth() {
        return this.authMiddleware.optionalAuth;
    }

    isAdmin() {
        return this.authorizationMiddleware.isAdmin;
    }

    requireOwnership(param) {
        return this.authorizationMiddleware.requireOwnership(param);
    }

    requireRole(role) {
        return this.authorizationMiddleware.requireRole(role);
    }

    validateRegistration() {
        return this.validationMiddleware.validateRegistration;
    }

    validateLogin() {
        return this.validationMiddleware.validateLogin;
    }

    validateUserUpdate() {
        return this.validationMiddleware.validateUserUpdate;
    }

    validateRequired(fields) {
        return this.validationMiddleware.validateRequired(fields);
    }

    rateLimit(maxRequests, windowMs) {
        return this.rateLimitMiddleware.rateLimit(maxRequests, windowMs);
    }

    strictRateLimit() {
        return this.rateLimitMiddleware.strictRateLimit();
    }
}

module.exports = MiddlewareContainer;