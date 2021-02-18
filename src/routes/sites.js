/** @format */

const express = require('express')
const route = express.Router()

const sitesCtrl = require('../app/controllers/SitesController')

route.use('/about', sitesCtrl.about)
route.use('/table', sitesCtrl.table)
route.use('/:id', sitesCtrl.page404)
route.use('/', sitesCtrl.home)
route.use(sitesCtrl.page500)

module.exports = route
