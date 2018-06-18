import express from 'express';
import userRoutes from './routes/users.routes';
import productsRoutes from './routes/products.routes';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser);
app.use(queryParser);

app.use('/api', userRoutes);
app.use('/api', productsRoutes);

export default app;
