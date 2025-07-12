const createUsersTable = async (pool) => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_username (username)
        )
    `;
    
    const connection = await pool.getConnection();
    try {
        await connection.execute(query);
        console.log('Users table created or already exists');
    } finally {
        connection.release();
    }
};

module.exports = createUsersTable;