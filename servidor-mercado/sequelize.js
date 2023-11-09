const {Sequelize, DataTypes} = require('sequelize'); //exporta o sequelize para o arquivo

const sequelize = new Sequelize('mercadoprodutos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
}); //cria uma conexão com o banco de dados

const Produtos = sequelize.define('Produtos', {
    codigobarras: {
        type: DataTypes.INTEGER(13),
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    preco: {
        type: DataTypes.DECIMAL(5, 2)
    }
}, {
    tableName: 'produtos',
    charset: 'utf8',
    timestamps: false
});

module.exports = {
    Produtos: Produtos,
    sequelize: sequelize
};