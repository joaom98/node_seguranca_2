import express from "express";

const app = express();

function manipulaErros (erros, req, res, next) {
  if (erros){
    res.json({erro: "Houve um erro na aplicação"});
  }
}
app.use(manipulaErros);

app.get('/', (requisicao, resposta, proximo) => {
  resposta.json({ mensagem: "Essa é uma resposta" })
})

app.listen(3000);