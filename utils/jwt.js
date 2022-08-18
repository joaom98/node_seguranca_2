import jsonwebtoken from 'jsonwebtoken';

function geraJWT(dados, chavePrivada) {
  const payload = {
    ...dados,
    iat: Date.now(),
  };

  const expiraEm = '1d';
  const signedToken = jsonwebtoken.sign(payload, chavePrivada, {
    expires: expiraEm,
    algorithm: 'RS256',
  });

  return {
    token: `Bearer ${signedToken}`,
    expiresIn: expiraEm,
  };
}

export default geraJWT;
