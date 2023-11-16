const express = require('express');
const caixaRouter = express.Router();
const {Produtos} = require('./sequelize');
const { propfind } = require('./estoque_rotas');


//rota que envia os dados do produto para serem inseridos na lista de compras
caixaRouter.get('/inserir-produto', async(req, res) => {
    try {
        const barCode = req.body;

        const product = await Produtos.findOne({
            where: {
                codigobarras: barCode.bar
            }
        });

        if (product) {
            res
            .status(200)
            .json(product);

        } else {
            res
            .status(404)
            .json({ message: 'Produto não encontrado'});
        }
    } catch (error) {
        console.error('Erro ao obter produto:', error);
        res
        .status(500)
        .json({ message: 'Erro interno do servidor'});
    }
});