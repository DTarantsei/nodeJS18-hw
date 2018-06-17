const products = {
  1: {
     id: 1,
     name: 'Supreme T-Shirt',
     brand: 'Supreme',
     price: 99.99,
     options: [
         { color: 'blue' },
         { size: 'XL' }
     ],
     reviews: ["test review 1"]
  },
  2: {
     id: 2,
     name: 'Supreme T-Shirt',
     brand: 'Supreme',
     price: 99.99,
     options: [
         { color: 'blue' },
         { size: 'XL' }
     ],
     reviews: ["test review 2"]
  },
  3: {
     id: 3,
     name: 'Supreme T-Shirt',
     brand: 'Supreme',
     price: 99.99,
     options: [
         { color: 'blue' },
         { size: 'XL' }
     ],
     reviews: ["test review 3"]
  }
};


const addProduct = (req, res) => {
  let updatedProducts = products;
  updatedProducts[guid] = req.body;

  writer(req, res, updatedProducts);
};

const getProducts = (req, res) => {
  writer(req, res, products);
};

const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = products[id];

    writer(req, res, product);
  }
  catch (e) {
    next(e);
  }
};

const getReviews = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = products[id];

    writer(req, res, product.reviews);
  }
  catch (e) {
    next(e);
  }
};

const writer = (req, res, data) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(data));
};

const guid = () => {
  const p8 = (s) => {
    let p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  };

  return p8() + p8(true) + p8(true) + p8();
};


module.exports = {
  getProducts,
  addProduct,
  getProductById,
  getReviews,
};
