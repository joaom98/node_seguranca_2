import express from 'express';
import passport from 'passport';

const router = express.Router();

router
  .post('/login', passport.authenticate('local', {
    failureRedirect: '/login-falho',
    successRedirect: '/login-sucedido',
  }))
  .post('/login-falho', (req, res) => {
    res.status(401).json({ message: 'Usuario ou senha incorretos' });
  })
  .post('/login-sucedido', (req, res) => {
    res.status(200).redirect('/rota-protegida');
  })
  .post('/rota-protegida', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ message: 'Usuario autenticado' });
    }
  })
  .get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

export default router;
