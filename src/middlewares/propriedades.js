import express from "express";

const app = express();

function middleware1 (req, res, next) {
  req.novaPropriedade = 100;
  next();
}
function middleware2 (req, res, next) {
  console.log(`A nova propriedade vale ${req.novaPropriedade}`);
  next();
}
app.use(middleware1);
app.use(middleware2); // Explicar que essa eh a forma como muitas ferramentas utilizam para autenticar e passar informacoes pra frente nas requisicoes

app.get('/', (requisicao, resposta, proximo) => {
  resposta.json({ mensagem: "Essa é uma resposta" })
})

app.listen(3000)