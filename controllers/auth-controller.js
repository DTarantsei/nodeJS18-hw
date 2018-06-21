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
    res.statusCode = 200;
    res.json({
      code: 200,
      message: 'OK',
      data: {
        user: {
          email: filteredUsers[0].email,
          username: filteredUsers[0].username,
        },
      },
      token: jwt.sign({ login }, 'privateKey', { expiresIn: 3600 }),
    });
  } else {
    res.statusCode = 404;
    res.json({
      code: 404,
      message: 'Not found'
    });
  }
}

module.exports = {
  auth,
};
