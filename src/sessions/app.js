import session from 'express-session';
// Cookie -> Guardado no navegador (marcador daquele cliente)
// Sessão -> Armazenado do lado do servidor

session({
  secret: 'segredoDoServidor',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Em ms, igual a 1 dia
  }, // Conteudo extra sobre sessionStore e armazenar isso num banco de dados
});

// app.get('/', (req, res, next) => {
//   if (!req.session.chamadas) {
//     req.session.chamadas = 1;
//   } else {
//     req.session.chamadas = req.session.chamadas + 1;
//   }

//   res.send().json({ mensagem: `Voce fez ${req.session.chamadas} chamadas` });
// });

export default session;