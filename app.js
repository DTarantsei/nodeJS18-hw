import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import productsRoutes from './routes/products.routes';
import citiesRoutes from './routes/cities.routes';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';

import User from './models/user';
// import Product from './models/product';

const app = express();

mongoose.connect('mongodb://localhost:32770/nodejs18');
const test = mongoose.Schema;
mongoose.Schema = (...args) =>
console.log(test);
User.create({
  name:  'Alex',
  weight: 78,
  age: 31
});
//
// const product = new Product({
//   name:  'Supreme T-Shirt',
//   brand: 'Supreme',
//   price: 99
// });
// product.save((err, product) => {
//   if (err) {
//     console.log('err', err);
//   }
//   console.log('saved product', product);
// });

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser);
app.use(queryParser);
app.use(passport.initialize());
app.use(passport.session());

app.get('/error', (req, res) => res.send('Invalid login or password'));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', citiesRoutes);

export default app;
