const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {
    constructor(pool) {
        super(pool);
        this.tableName = 'users';
    }

    //create a new user
    async create(userData) {
        const { username, email, password } = userData;
        const query = `
            INSERT INTO ${this.tableName} (username, email, password) 
            VALUES (?, ?, ?)
        `;
        const result = await this.execute(query, [username, email, password]);
        return result.insertId;
    }

    //find user by ID
    async findById(id) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const rows = await this.query(query, [id]);
        return rows[0] || null;
    }

    //find user by email
    async findByEmail(email) {
        const query = `SELECT * FROM ${this.tableName} WHERE email = ?`;
        const rows = await this.query(query, [email]);
        return rows[0] || null;
    }

    //find user by username
    async findByUsername(username) {
        const query = `SELECT * FROM ${this.tableName} WHERE username = ?`;
        const rows = await this.query(query, [username]);
        return rows[0] || null;
    }

    //update user by ID
    async updateById(id, updateData) {
        const fields = [];
        const values = [];
        
        //build dynamic update query
        Object.keys(updateData).forEach(key => {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        });
        
        if (fields.length === 0) {
            throw new Error('No fields to update');
        }
        
        values.push(id);
        
        const query = `UPDATE ${this.tableName} SET ${fields.join(', ')} WHERE id = ?`;
        const result = await this.execute(query, values);
        return result.affectedRows > 0;
    }

    //delete user by ID
    async deleteById(id) {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await this.execute(query, [id]);
        return result.affectedRows > 0;
    }

    //get all users with pagination
    async findAll(limit = 50, offset = 0) {
        const query = `
            SELECT id, username, email, created_at 
            FROM ${this.tableName} 
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        `;
        return await this.query(query, [limit, offset]);
    }

    //count total users
    async count() {
        const query = `SELECT COUNT(*) as count FROM ${this.tableName}`;
        const rows = await this.query(query);
        return rows[0].count;
    }

    //check if user exists by email
    async existsByEmail(email) {
        const query = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE email = ?`;
        const rows = await this.query(query, [email]);
        return rows[0].count > 0;
    }

    //check if user exists by username
    async existsByUsername(username) {
        const query = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE username = ?`;
        const rows = await this.query(query, [username]);
        return rows[0].count > 0;
    }

    //find users by multiple criteria
    async findByCriteria(criteria, limit = 50, offset = 0) {
        const conditions = [];
        const values = [];
        
        Object.keys(criteria).forEach(key => {
            if (criteria[key] !== undefined && criteria[key] !== null) {
                conditions.push(`${key} = ?`);
                values.push(criteria[key]);
            }
        });
        
        if (conditions.length === 0) {
            return this.findAll(limit, offset);
        }
        
        values.push(limit, offset);
        
        const query = `
            SELECT id, username, email, created_at 
            FROM ${this.tableName} 
            WHERE ${conditions.join(' AND ')} 
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        `;
        
        return await this.query(query, values);
    }

    //get user statistics
    async getStats() {
        const query = `
            SELECT 
                COUNT(*) as total_users,
                COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as users_today,
                COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as users_this_week,
                COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as users_this_month
            FROM ${this.tableName}
        `;
        const rows = await this.query(query);
        return rows[0];
    }
}

module.exports = UserRepository;