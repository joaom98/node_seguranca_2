import passport from 'passport';
import EstrategiaLocal from 'passport-local';
import Usuario from '../src/models/usuario.js';
import { validaSenha } from '../utils/senhas.js';

const camposCustomizados = {
  usernameField: 'nome',
  passwordField: 'senha',
};

const callbackVerifica = (nome, senha, done) => {
  Usuario.pegarPeloNome(nome)
    .then((usuario) => {
      if (!usuario) {
        return done(null, false);
      }

      const ehValido = validaSenha(senha, usuario.senhaHash, usuario.salHash);

      if (ehValido) {
        return done(null, usuario);
      }
      return done(null, false);
    }).catch((erro) => {
      done(erro);
    });
};

const estrategia = new EstrategiaLocal(camposCustomizados, callbackVerifica);

passport.use(estrategia);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  Usuario.pegarPeloId(userId).then((usuario) => {
    done(null, usuario);
  })
    .catch((erro) => done(erro));
});

export default passport;
