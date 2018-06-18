const url = require('url');


const queryParser = (req, res, next) => {
  req.parsedQuery = url
    .parse(req.url, true)
    .query;
  next();
};

export default queryParser;
