class RateLimitMiddleware {
    constructor() {
        this.requests = new Map();
    }

    //basic rate limiting middleware
    rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
        return (req, res, next) => {
            const ip = req.ip || req.connection.remoteAddress;
            const now = Date.now();
            const windowStart = now - windowMs;

            //clean old requests
            if (this.requests.has(ip)) {
                const userRequests = this.requests.get(ip).filter(time => time > windowStart);
                this.requests.set(ip, userRequests);
            }

            //check current requests
            const currentRequests = this.requests.get(ip) || [];
            
            if (currentRequests.length >= maxRequests) {
                return res.status(429).json({
                    success: false,
                    message: 'Too many requests, please try again later',
                    retryAfter: Math.ceil(windowMs / 1000)
                });
            }

            //add current request
            currentRequests.push(now);
            this.requests.set(ip, currentRequests);

            next();
        };
    };

    //strict rate limiting for sensitive operations
    strictRateLimit = (maxRequests = 5, windowMs = 60 * 1000) => {
        return this.rateLimit(maxRequests, windowMs);
    };

    //lenient rate limiting for general API usage
    lenientRateLimit = (maxRequests = 1000, windowMs = 60 * 60 * 1000) => {
        return this.rateLimit(maxRequests, windowMs);
    };

    //user-specific rate limiting (requires authentication)
    userRateLimit = (maxRequests = 200, windowMs = 15 * 60 * 1000) => {
        const userRequests = new Map();

        return (req, res, next) => {
            const userId = req.user?.userId || req.ip || req.connection.remoteAddress;
            const now = Date.now();
            const windowStart = now - windowMs;

            //clean old requests
            if (userRequests.has(userId)) {
                const requests = userRequests.get(userId).filter(time => time > windowStart);
                userRequests.set(userId, requests);
            }

            //check current requests
            const currentRequests = userRequests.get(userId) || [];
            
            if (currentRequests.length >= maxRequests) {
                return res.status(429).json({
                    success: false,
                    message: 'Too many requests, please try again later',
                    retryAfter: Math.ceil(windowMs / 1000)
                });
            }

            //add current request
            currentRequests.push(now);
            userRequests.set(userId, currentRequests);

            next();
        };
    };

    //endpoint-specific rate limiting
    endpointRateLimit = (endpoint, maxRequests = 50, windowMs = 15 * 60 * 1000) => {
        const endpointRequests = new Map();

        return (req, res, next) => {
            const key = `${req.ip || req.connection.remoteAddress}-${endpoint}`;
            const now = Date.now();
            const windowStart = now - windowMs;

            //clean old requests
            if (endpointRequests.has(key)) {
                const requests = endpointRequests.get(key).filter(time => time > windowStart);
                endpointRequests.set(key, requests);
            }

            //check current requests
            const currentRequests = endpointRequests.get(key) || [];
            
            if (currentRequests.length >= maxRequests) {
                return res.status(429).json({
                    success: false,
                    message: `Too many requests to ${endpoint}, please try again later`,
                    retryAfter: Math.ceil(windowMs / 1000)
                });
            }

            //add current request
            currentRequests.push(now);
            endpointRequests.set(key, currentRequests);

            next();
        };
    };
}

module.exports = RateLimitMiddleware;