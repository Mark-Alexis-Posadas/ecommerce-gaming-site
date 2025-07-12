const pool = require('../config/database');
const createUsersTable = require('./001_create_users_table');
// const createGamesTable = require('./002_create_games_table');

const runMigrations = async () => {
    try {
        console.log('🔄 Running database migrations...');
        
        await createUsersTable(pool);
        
        console.log('✅ All migrations completed successfully');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

//run migrations if this file is executed directly
if (require.main === module) {
    runMigrations();
}

module.exports = runMigrations;

//command run
//node src/migrations/migrate.js