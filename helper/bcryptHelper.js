const { hash, compare } = require("bcrypt")
const saltRounds = 10

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        hash(password, saltRounds, (err, hashed) => {
            if (err) reject(err)
            else resolve(hashed)
        })
    })
}

function checkPassword(password, hashPassword) {
    return new Promise((resolve, rejet) => {
        compare(password, hashPassword, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}

module.exports = {
    hashPassword,
    checkPassword,
}
