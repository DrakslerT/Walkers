/** Exports to ./test/ for testing purposes */
const supertestRequest = require('supertest')
const faker = require('faker')
const app = require('./server')
const { createActivationCode } = require('./controller/AuthController')

module.exports = {
    supertestRequest,
    faker,
    app,
    createActivationCode
}