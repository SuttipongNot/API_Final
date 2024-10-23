const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const app = express();
const port = 3000;

// Import CORS library
const cors = require('cors');

const SECRET_KEY = 'UX23Y24%@&2aMb';  // ตัวแปรสำหรับการเข้ารหัส JWT

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Not22052547sut",
    database: "db_miniprojectfinal"
});
db.connect();
const query = util.promisify(db.query).bind(db);  // เปลี่ยน db.query ให้ใช้ async/await ได้

// Middleware
app.use(express.json());
app.use(cors());

// Login API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    let sql = '';
    let user = {};
    let Role_ID = null;

    try {
        // Query for user from the 'users' table
        sql = "SELECT * FROM users WHERE username=?";
        let users = await query(sql, [username]);

        if (users.length > 0) {
            user = users[0];
            Role_ID = user['Role_ID'];

            // ตรวจสอบว่าเฉพาะ Role_ID 1 หรือ 2 ที่สามารถเข้าสู่ระบบได้
            if (Role_ID !== 1 && Role_ID !== 2) {
                return res.send({'message': 'คุณไม่มีสิทธิ์ในการเข้าสู่ระบบ', 'status': false});
            }

            // ตรวจสอบรหัสผ่าน (เปลี่ยนแปลงตามที่คุณระบุไม่ต้องใช้ hash)
            if (password === user['password']) {
                // สร้าง JWT token
                const token = jwt.sign({ id: user['id'], role: Role_ID }, SECRET_KEY, { expiresIn: '1h' });
                return res.send({
                    'message': 'เข้าสู่ระบบสำเร็จ',
                    'status': true,
                    'token': token,
                    'Role_ID': Role_ID
                });
            } else {
                return res.send({'message': 'รหัสผ่านไม่ถูกต้อง', 'status': false});
            }
        } else {
            return res.send({'message': 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'status': false});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({'message': 'เกิดข้อผิดพลาดในระบบ', 'status': false});
    }
});

app.get('/api/get-count-age',async (req, res) => {
    const sql = "SELECT COUNT(*) AS Count FROM age";
    db.query(sql, (err, results) => {
      if (err) throw err;
        const CardData = results[0];
        CardData['message'] = "ทำรายการสำเร็จ"
        CardData['status'] = true
        res.send(CardData);
    });
  });

  app.get('/api/get-count-similarity',async (req, res) => {
    const sql = "SELECT COUNT(*) AS Count FROM similarity";
    db.query(sql, (err, results) => {
      if (err) throw err;
        const CardData = results[0];
        CardData['message'] = "ทำรายการสำเร็จ"
        CardData['status'] = true
        res.send(CardData);
    });
  });

  app.get('/api/get-star-top', async (req, res) => {
    const sql = `
        SELECT t.ThaiCelebrities_name, COUNT(s.ThaiCelebrities_ID) AS CelebrityCount
        FROM thaicelebrities t
        LEFT JOIN similarity s ON t.ThaiCelebrities_ID = s.ThaiCelebrities_ID
        GROUP BY t.ThaiCelebrities_name
        ORDER BY CelebrityCount DESC
        LIMIT 5;
    `;

    try {
        const rows = await query(sql);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'เกิดข้อผิดพลาดในระบบ', 'status': false});
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
