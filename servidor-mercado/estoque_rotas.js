const express = require('express');
const estoqueRouter = express.Router();
const {Produtos} = require('./sequelize');

//Rota que armazena um produto no banco de dados:
estoqueRouter.post('/enviar-dados', async (req, res) => {
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
  estoqueRouter.put('/deletar-produto', async (req, res) => {
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
  
  //rota para alterar um produto do banco de dados:
  estoqueRouter.put('/alterar-produto', async (req, res) => {
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

  //exporta as rotas
  module.exports = estoqueRouter;