class BaseRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async getConnection() {
        return await this.pool.getConnection();
    }

    async execute(query, params = []) {
        const connection = await this.getConnection();
        try {
            const [result] = await connection.execute(query, params);
            return result;
        } finally {
            connection.release();
        }
    }

    async query(query, params = []) {
        const connection = await this.getConnection();
        try {
            const [rows] = await connection.execute(query, params);
            return rows;
        } finally {
            connection.release();
        }
    }
}

module.exports = BaseRepository;