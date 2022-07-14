const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

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
    console.log(req.user);
    res.json(req.user);
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });
      res
        .cookie(process.env.Cookie_NAME, sessionToken, {
          httpOnly: true,
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'false',
          secure: process.env.SECURE_COOKIES === 'true',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully.' });
    } catch (error) {
      next(error);
    }
  });
