const router = require("express").Router()
const db = require(../models/)
const {hashPassword} = require('../helper/bcryptHelper')
const JWTSECRETKEY = process.env.JWT_SECRET || 'supersecretkey'


