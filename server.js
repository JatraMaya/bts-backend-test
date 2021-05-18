require('dotenv').config()
const express = require('express')
const app = express("app")
const readdirp = require('readdirp')

app.use(express.json())

readdirp(".", {
    fileFilter: "*Route.js"
}).on("data", (route) => {
    const path = `./${route.path}`
    app.use(require(path))
    console.log(`${path} is loaded`)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`\n==== Server run on ${PORT} ====\n`)
})
