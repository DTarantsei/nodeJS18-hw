import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { serve, setup } from 'swagger-ui-express';
import SwaggerJSON from './vendors/swagger.json';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import productsRoutes from './routes/products.routes';
import citiesRoutes from './routes/cities.routes';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';

const app = express();

mongoose.connect('mongodb://localhost:32769/nodejs18');

const User = mongoose.model('User');
User.insertMany([
  {
    name:  'Alex',
    weight: 78,
    age: 31
  },
  {
    name: 'Dan',
    weight: 78,
    age: 25
  },
  {
    name: 'Mike',
    weight: 95,
    age: 31
  },
  {
    name: 'Tony',
    weight: 87,
    age: 27
  }
]);
const Product = mongoose.model('Product');
Product.insertMany([
  {
    name:  'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99
  }
]);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser);
app.use(queryParser);
app.use(passport.initialize());
app.use(passport.session());

app.get('/error', (req, res) => res.send('Invalid login or password'));

app.use('/api-swagger', serve, setup(SwaggerJSON));
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', citiesRoutes);

export default app;
