const createGamesTable = async (pool) => {
    const query = `
        CREATE TABLE IF NOT EXISTS games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
        final_price DECIMAL(10, 2) GENERATED ALWAYS AS (price * (1 - discount_percentage / 100)) STORED,
        release_date DATE,
        developer VARCHAR(255),
        publisher VARCHAR(255),
        rating ENUM('E', 'E10+', 'T', 'M', 'AO', 'RP') DEFAULT 'RP',
        image_url VARCHAR(500),
        trailer_url VARCHAR(500),
        download_size_mb INT,
        system_requirements JSON,
        is_active BOOLEAN DEFAULT TRUE,
        stock_quantity INT DEFAULT 0,
        digital_only BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_title (title),
        INDEX idx_price (price),
        INDEX idx_release_date (release_date),
        INDEX idx_active (is_active),
        FULLTEXT idx_search (title, description)
    );
    `;
    
    const connection = await pool.getConnection();
    try {
        await connection.execute(query);
        console.log('Games table created or already exists');
    } finally {
        connection.release();
    }
};

module.exports = createGamesTable;