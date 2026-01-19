const pool = require('./config/db');

async function testConnection() {
    try {
        const [rows] = await pool.query('SHOW TABLES');
        console.log('Tables in database:', rows);
        process.exit(0);
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
}

testConnection();
