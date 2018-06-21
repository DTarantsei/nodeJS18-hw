import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import productsRoutes from './routes/products.routes';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';


const app = express();
const LocalStrategy = passportLocal.Strategy;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser);
app.use(queryParser);
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(`Welcome ${req.query.username}!`));
app.get('/error', (req, res) => res.send('Invalid login or password'));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productsRoutes);

passport.use(new LocalStrategy({
    usernameField: 'login',
  },
  (login, password, done) => {
    let err;

    const user = {
      login: 'test',
      pass: '123',
    };

    if (login !== user.login || password !== user.pass) {
      err = 'error';
    }

    if (err) { return done(err); }
    return done(null, user);
  }
));

export default app;
