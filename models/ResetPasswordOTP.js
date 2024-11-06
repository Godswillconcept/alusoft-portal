const conn = require("./connection");

class ResetPasswordOTP {
    constructor(id, email, otp) {
        this.id = id;
        this.email = email;
        this.otp = otp;
    }

    static async save(data) {
        const sql = `INSERT INTO reset_password_otps (email, otp, expiration_time) VALUES (?, ?, ?)`;
        try {
            const [results] = await conn.execute(sql, [
                data.email,
                data.otp,
                Date.now() + 30 * 60 * 1000, // Expires in 30 minutes
            ]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        const sql = `SELECT * FROM reset_password_otps WHERE email = ?`;
        try {
            const [results] = await conn.execute(sql, [email]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async delete(email) {
        const sql = `DELETE FROM reset_password_otps WHERE email = ?`;
        try {
            const [results] = await conn.execute(sql, [email]);
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ResetPasswordOTP;