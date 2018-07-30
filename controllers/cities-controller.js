import { City } from '../models';

const random = (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });


  City.count().exec((err, count) => {
    if (err) next(err);

    const random = Math.floor(Math.random() * count)

    City.findOne().skip(random).exec((err, city) => {
      if (err) next(err);

      res.end(JSON.stringify(city));
    })
  })
};

const getAll = (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  City.find({}, (err, cities) => {
    if (err) next(err);

    res.end(JSON.stringify(cities))
  });
};

const addOne = (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const city = Object.assign(
    {
      lastModifiedDate: Date.now()
    },
    req.body,
  );

  new City(city).save((err, result) => {
    if (err) next(err);

    res.end(JSON.stringify(result));
  });
};

const deleteOne = (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const { id } = req.params;

  if (!id) {
    next(new Error('Missing id'));
  }

  City.findByIdAndRemove(id, (err, result) => {
    if (err) next(err);

    res.end(JSON.stringify(result));
  });
}

module.exports = {
  random,
  getAll,
  addOne,
  deleteOne,
};
