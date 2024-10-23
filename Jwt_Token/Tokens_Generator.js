const jwt = require('jsonwebtoken');

// ฟังก์ชันสร้างโทเคน
function Tokens_Generator(Users_ID, Some_Username,  value) {
    if (!Users_ID || !Some_Username || !value) {
        return null; 
    }

    let Token;

if (value === 2) {
        Token = jwt.sign(
            {
                Users_ID: Users_ID,
                Users_Google_Uid: Some_Username,
                Users_Email: Users_Email,
                RegisType_ID: 2
            },
            process.env.PRIVATE_TOKEN_KEY,
            { expiresIn: '24h' }
        );
    }

    return Token; // ส่งกลับโทเคนที่สร้างขึ้น
}

module.exports = Tokens_Generator; 
