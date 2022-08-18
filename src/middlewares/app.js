import express from 'express';

const app = express();

app.get('/', (requisicao, resposta, proximo) => {
  resposta.json({ mensagem: 'Essa é uma resposta' });
});

function chamadaExpress(objetoRequisicao, objetoResposta, proximoMiddleware) {
  objetoResposta.json({ mensagem: 'Essa é uma resposta' });
}

app.get('/', chamadaExpress); // Depois de escrever essa comentar a rota de cima

function middleware1(req, res, next) {
  console.log('Esse é o middleware 1');
  next();
}

app.get('/', middleware1, chamadaExpress); // Explicar que esse middleware roda apenas na rota

app.use(middleware1); // Explicar que esse middleware roda em todas as rotas depois dessa declaracao

// Explicar os outros usos do app.use (como o body.json)

app.listen(3000);
