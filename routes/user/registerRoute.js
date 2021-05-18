const router = require("express").Router()
const db = require("../../models")
const { sign } = require("jsonwebtoken")
const { hashPassword } = require("../../helper/bcryptHelper")
const JWTSECRETKEY = process.env.JWT_SECRET || "supersecretkey"

router.post("/api/users/signup", async (req, res) => {
    let { username, password, email, phone, country, city, postcode, name, address } = req.body
    try {
        const hashResult = hashPassword(password)
        const newUser = {
            username,
            password: hashResult,
            email,
            phone,
            country,
            city,
            postcode,
            name,
            address,
        }
        const isUserExist = await db.user.findOne({
            attributes: ["username"],
            where: {
                username,
            },
        })

        const isEmailExist = await db.user.findOne({
            attributes: ["email"],
            where: {
                email,
            },
        })

        if (isUserExist) {
            res.status(409).json({ error: "Username already exist" })
            return
        }

        const user = await db.users.create(newUser)

        if (user) {
            const token = sign(user.dataValues, jwtSecret, { expiresIn: "1d" })
        }
    } catch (e) {
        res.status(400).json({ error: "Bad Request" })
        console.log(e)
    }
})

module.exports = router
