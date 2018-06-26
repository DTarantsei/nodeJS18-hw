import jwt from 'jsonwebtoken';


const tokenValidator = (req, res, next) => {
  let token = req.headers['x-access-token'];

  res.contentType('text/json');

  if (!token) {
    res.statusCode = 404;
    res.json({
      error: 'Validation token error',
    });
    return;
  }

  jwt.verify(token, 'privateKey', (error) => {
    if (error) {
      res.statusCode = 404;
      res.json({
        error: 'Validation token error',
      });
    } else {
      next();
    }
  });
};

module.exports = tokenValidator;
