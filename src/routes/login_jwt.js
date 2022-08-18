import express from 'express';
import Usuario from '../models/usuario.js';
import { validaSenha } from '../../utils/senhas.js';
import geraJWT from '../../utils/jwt.js';
import { privateKey } from '../../utils/lerParDeChaves.js';

const router = express.Router();

router
  .post('/login', (req, res) => {
    Usuario.pegarPeloNome(req.body.nome).then((usuario) => {
      if (!usuario) {
        return res.status(401).json({ mensagem: 'Usuário ou senha incorretos' });
      }
      console.log( req.body, usuario);
      const senhaValida = validaSenha(req.body.senha, usuario.senhaHash, usuario.salHash);

      if (senhaValida) {
        const token = geraJWT({ id: usuario.id }, privateKey);
        res.set('Authorization', token)
          .status(200).json({ mensagem: 'Autorizado' });
      }

      return res.status(500).json({ mensagem: 'Erro no sistema de login.' });
    });
  })
  .get('/login-sucedido', (req, res) => {
    res.status(200).redirect('/rota-protegida');
  })
  .get('/rota-protegida', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ message: 'Usuario autenticado' });
    }
  });

export default router;
