const users = {
  1: {
    id: '1',
    name: 'Dan',
    weight: '78',
    age: '25'
  },
  2: {
    id: '2',
    name: 'Mike',
    weight: '95',
    age: '31'
  },
  3: {
    id: '3',
    name: 'Tony',
    weight: '87',
    age: '27'
  }
};

const getAll = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(users));
}

module.exports = {
  getAll,
};
