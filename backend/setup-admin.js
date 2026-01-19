const pool = require('./config/db');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
    try {
        console.log('Cleaning up users table...');
        await pool.query('DELETE FROM users');

        console.log('Creating default admin account...');
        const adminEmail = 'admin@zaxip.com';
        const adminPassword = 'admin123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        await pool.query(
            'INSERT INTO users (name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?)',
            ['Administrator', adminEmail, hashedPassword, 'admin', true]
        );

        console.log('-----------------------------------');
        console.log('Database setup complete!');
        console.log('Admin Email: ' + adminEmail);
        console.log('Admin Password: ' + adminPassword);
        console.log('-----------------------------------');

        process.exit(0);
    } catch (err) {
        console.error('Setup failed:', err.message);
        process.exit(1);
    }
}

setupDatabase();
