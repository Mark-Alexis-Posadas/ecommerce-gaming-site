const dotenv = require('dotenv');

dotenv.config();

const config = {
    //application settings
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT) || 8000,
    
    //database configuration
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 3307,
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'egs_db',
    
    //jwt configuration
    JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key'
};

if (!config.JWT_SECRET || config.JWT_SECRET === 'fallback-secret-key') {
    console.error('JWT_SECRET is required');
    process.exit(1);
}

if (!config.DB_NAME) {
    console.error('DB_NAME is required');
    process.exit(1);
}

module.exports = config;