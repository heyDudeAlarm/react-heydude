const crypto = require('crypto');
const conn = require('../database/config');
const Auth = {};
conn.getConnection();
Auth.hash = (password) => {
    //createHash: 사용할 알고리즘(sha256, sha516)
    //update : 해싱할 데이터
    //digest : 인코딩 타입
    return crypto.createHash("sha256").update(password).digest('base64').toString();
}

Auth.searchUser = (email, pw) => {
    return new Promise((resolve, reject) => {
        const hashed = Auth.hash(pw);
        console.log(hashed)
        let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

        conn.query(sql, [email, hashed])
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
        /*
        conn.query(sql, [email, hashed], (err, row) => {
            console.log("from conn")
            if(err){
                reject(err);
            } else {
                resolve(row);
            }
        })*/
    })
}
// 디바이스 토큰을 유저 테이블에서 가져오기
Auth.getToken = (userId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT device_token FROM users WHERE user_id = ?`;
        conn.query(sql, userId, (err, row) => {
            if(err){
                reject(err);
            } else {
                console.log('device token : ', row[0]);
                resolve(row[0]);
            }
        })
    })
}
//DB에 새로운 유저 추가 
Auth.addUser = (user) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO users(email, nickname, password) VALUES(
            '${user.email}', '${user.nickname}', '${Auth.hash(user.password)}'
           );`;
        
        conn.query(`SELECT * FROM users WHERE email = '${user.email}'`)
            .then(row => {
                if(row == 0){
                    conn.query(sql, (err, res) => {
                        if(err) reject(err);
                        else resolve(res);
                    });
                } else {
                    resolve({ result: "fail" })
                }
            }).catch(err => {
                console.log(err);
            })
    })
}

module.exports = Auth;