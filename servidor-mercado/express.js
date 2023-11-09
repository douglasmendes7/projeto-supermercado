const express = require('express');
const app = express();
exports.app = app;
const port = 8080;
const cors = require('cors');
const { sequelize, Produtos } = require('./sequelize');

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

//Inicia o servidor express e a conexão com o banco de dados:
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados iniciada com sucesso');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
});

app.get('/', (req, res) => {
  res
  .sendFile(__dirname + '/index.html');
});

//Rota que armazena um produto no banco de dados:
app.post('/enviar-dados', async (req, res) => {
  try {
    const dados = req.body;

    //Caso seja inserido um novo registro no BD a variável irá conter um objeto que representa ele ou null
    const novoProduto = await Produtos.create({
      codigobarras: dados.barras,
      nome: dados.nome,
      preco: dados.preco,
    });

    console.log('Dados inseridos no banco de dados:', novoProduto);
    res
    .status(201)
    .json({ message: 'Produto cadastrado com sucesso' });

  } catch (error) {
    console.error('Erro ao inserir os dados no banco de dados:', error);
    res
      .status(500)
      .json({ error: 'Erro ao inserir o produto no banco de dados' });
  }
});

//Rota para deletar um produto:
app.put('/deletar-produto', async (req, res) => {
  try {
    const dados = req.body;

    //O .destroy irá armazenar na variável o número de registro deletados do banco de dados.
    const linhasDeletada = await Produtos.destroy({
      where: {
        codigobarras: dados.barras
      }
    });
        //if que verifica se um produto com o código de barras foi encontrado
        if (linhasDeletada === 0) {
          console.log('Nenhum produto com esse código de barras foi encontrado');
          return res
            .status(404)
            .json({ error: 'Produto não encontrado' });

        } else {
          console.log(`Produto com o código de barras ${dados.barras} deletado com sucesso`);
          return res
            .status(200)
            .json({ message: 'Produto deletado com sucesso!'});
        }
  } catch (error) {
    console.error('Erro ao tentar deletar o registro:', error);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor' });
  }
});

//rota para alterar um produto do banco de dados
app.put('/alterar-produto', async (req, res) => {
  try { 
    const {barras, novoNome, novoPreco} = req.body;

    //Se o .findOne encontrar o registro irá guardar uma referência para ele, caso não encontro irá guardar um valor null.
    const produto = await Produtos.findOne({ 
      where: { 
        codigobarras: barras 
      } });

    if (produto) {
      //Produto encontrado no banco de dados! Código que altera o registro
      produto.nome = novoNome;
      produto.preco = novoPreco;
      await produto.save();

      //Devolve um resposta de ok para o servidor
      return res
        .status(200)
        .json({ message: 'Produto atualizado com sucesso' });
    } else {
      return res
        .status(404)
        .json({ message: 'Produto não encontrado'});
    }
  } catch (error) {
    console.error('Erro ao alterar o registro: ', error);
    return res
      .status(500)
      .json({ error: 'Erro interno do servidor'});
  }
});