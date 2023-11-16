//modulos do express e variáveis utilizadas no servidor
const express = require('express');
const app = express();
exports.app = app;
const port = 8080;
const cors = require('cors');
//importa a conexão feita com o MySQL e o modelo da tabela produtos
const { sequelize, Produtos } = require('./sequelize');
//importa as rotas do arquivo do estoque e do caixa
const estoqueRoutes = require('./estoque_rotas');

//midleware que converte os dados JSON em objetos:
app.use(express.json());

//CORSS:
app.use(
  cors({
    origin: '*',
    allowedHeaders: 'Content-Type, Authorization, Date',
  })
);

//midleware que converte os dados de formulário em objetos:
app.use(express.urlencoded({ extended: true }));

//inicia o servidor express e a conexão com o banco de dados:
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados iniciada com sucesso');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
});

app.use('/estoque', estoqueRoutes);