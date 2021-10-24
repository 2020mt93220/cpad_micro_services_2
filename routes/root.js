'use strict'
const User = require('../user/user')
const Handlebars = require('Handlebars');
const fs = require('fs');

module.exports = async function (fastify, opts, done) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get("/registration", function (req, reply) {
    try {
      return reply.sendFile("index.html");
    } catch (err) {
      console.log("err", err)
    }
  });

  fastify.post("/registration", async function (request, reply) {
    console.log(request.body)
    let user_obj = new User({
      name: request.body.name,
      email_id: request.body.email_id,
      phone_number: request.body.phone_number,
      hobby: request.body.hobby,
      password: request.body.password,
      city: request.body.city,
    })
    await user_obj.save();
    return reply.send({
      success:1
    })
  });
  
  fastify.get('/count', async function (request, reply) {
    let user = await User.find({}).count()
    reply.view('count.hbs',{user})
  })
  done();
}
