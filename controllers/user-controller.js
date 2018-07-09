import { User } from '../models';

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

const getAll = (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  User.findAll()
    .then(data => res.end(JSON.stringify(data)))
    .catch(next)
}

module.exports = {
  getAll,
};
