/** @format */

const express = require('express')
const route = express.Router()

const searchCtrl = require('../app/controllers/SearchController')

route.use('/:slug', searchCtrl.show)
route.use('/', searchCtrl.index)

module.exports = route
