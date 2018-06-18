const credentials = [{
  name: 'Dan',
  pass: '12345',
}];

const auth = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(credentials));
}

module.exports = {
  auth,
};
