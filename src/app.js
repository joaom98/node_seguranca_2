import express from 'express';
import session from 'express-session';
import routes from './routes/index.js';

// import session from './sessions/app.js'

import passport from '../config/passport.js';

const app = express();
app.use(express.json());

app.use(session({
  secret: 'segredoDoServidor',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Em ms, igual a 1 dia
  }, // Conteudo extra sobre sessionStore e armazenar isso num banco de dados
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

routes(app);

export default app;
