'use strict'

// Read the .env file.
require('dotenv').config()

// Require the framework
const Fastify = require('fastify')

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace')

// Instantiate Fastify with some config
const app = Fastify({
  logger: true
})

// Register your application as a normal plugin.
const appService = require('./app.js')
app.register(appService)



// Start listening.
app.listen(process.env.PORT || 4000, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})