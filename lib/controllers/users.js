const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
<<<<<<< HEAD
      await UserService.create(req.body);
      // console.log(user);
      // res.json(user);
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });
      // console.log(sessionToken);
=======
      const user = await UserService.create(req.body);
      // res.json(user);
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });
>>>>>>> 7c3d3082f35ffc2b332e49fef5a09c6b25431955
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          secure: process.env.SECURE_COOKIES === 'true',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully.' });
    } catch (error) {
<<<<<<< HEAD
      // console.log(error);
=======
>>>>>>> 7c3d3082f35ffc2b332e49fef5a09c6b25431955
      next(error);
    }
  })

  .get('/me', authenticate, (req, res) => {
    res.json(req.user);
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          secure: process.env.SECURE_COOKIES === 'true',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully.' });
    } catch (error) {
      next(error);
    }
  });
