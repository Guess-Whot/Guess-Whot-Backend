const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
<<<<<<< HEAD
    // console.log('req', req.body);
=======
>>>>>>> 7c3d3082f35ffc2b332e49fef5a09c6b25431955
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];

    if (!cookie) throw new Error('Sign in to continue!');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
<<<<<<< HEAD
    // console.log(user);
=======
>>>>>>> 7c3d3082f35ffc2b332e49fef5a09c6b25431955
    req.user = user;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
