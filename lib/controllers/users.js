const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .get('/me', authenticate, (req, res) => {
    res.json(req.user);
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await UserService.signIn({ email, password });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
