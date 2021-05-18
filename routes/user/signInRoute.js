const router = require("express").Router()
const db = require("../../models")
const { sign } = require("jsonwebtoken")
const { checkPassword } = require("../../helper/bcryptHelper")
const SECRET = process.env.JWT_SECRET || "supersecret"

router.post("/api/users/signin", async (req, res) => {
    const { email, password } = req.body

    try {
        const loginData = await db.users.findOne({
            where: {
                email: email,
            },
        })
        const user = loginData.dataValues
        const isPasswordMatch = await checkPassword(password, user.password)

        if (isPasswordMatch) {
            const token = sign(user, SECRET, { expiresIn: "1d" })
            user.token = token
            res.status(200).send(user)
            return
        } else {
            res.status(401).json({ message: "User unauthorized" })
            return
        }
    } catch (e) {
        res.status(401).json({ message: "User unauthorized" })
        return
    }
})

module.exports = router
