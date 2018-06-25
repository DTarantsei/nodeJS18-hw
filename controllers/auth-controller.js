const jwt = require('jsonwebtoken');

const credentials = [
  {
    id: 1,
    email: 'dan@gmail.com',
    login: 'Dan',
    password: '12345',
    username: 'Daniel',
  },
  {
    id: 2,
    email: 'test@gmail.com',
    login: 'Test',
    password: '54321',
    username: 'Tester',
  },
];


const auth = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  let responseMessage;

  res.contentType('text/json');

  if (!login || !password) {
    res.statusCode = 404;
    res.json({
        code: 404,
        message: 'Not found',
    });
    return;
  }

  const filteredUsers = credentials
    .filter(user => user.login === login && user.password === password);

  if (filteredUsers.length !== 0) {
    req.user = filteredUsers[0];
    responseWithToken(req, res);
  } else {
    res.statusCode = 404;
    res.json({
      code: 404,
      message: 'Not found'
    });
  }
}

const responseWithToken = (req, res) => {
  console.log(req);
  const user = req.user;
  res.statusCode = 200;
  res.json({
    code: 200,
    message: 'OK',
    data: { user },
    token: jwt.sign(user, 'privateKey', { expiresIn: 3600 }),
  });
}

module.exports = {
  auth,
  responseWithToken,
};
