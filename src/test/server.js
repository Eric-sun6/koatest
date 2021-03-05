const request = require('supertest')
const server = require('../app').callback()

module.exports = require(server)