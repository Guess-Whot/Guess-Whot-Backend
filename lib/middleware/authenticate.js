const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // console.log('req', req.body);
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];

    if (!cookie) throw new Error('Sign in to continue!');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    // console.log(user);
    req.user = user;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
