import passport from 'passport';
import EstrategiaJWT from 'passport-jwt';
import JwtStrategy from 'passport-jwt/lib/strategy';
import { readFileSync, fileURLToPath } from 'fs';
import { dirname, join } from 'path';
import Usuario from '../src/models/usuario.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const caminhoDaChave = join(__dirname, '..', 'chaves', 'id_rsa_pub.pem');
const publicKey = readFileSync(caminhoDaChave, 'utf-8');

const opcoes = {
  jwtFromRequest: EstrategiaJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256'],
};

const estrategia = new JwtStrategy(opcoes, (payload, done) => {
  Usuario.pegarPeloId(payload.sub)
    .then((usuario) => {
      if (usuario) {
        return done(null, usuario);
      }
      return done(null, false);
    }).catch((erro) => {
      done(erro, null);
    });
});

passport.use(estrategia);

export default passport;
