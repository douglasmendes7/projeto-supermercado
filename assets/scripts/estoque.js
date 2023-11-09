//Váriaveis para armazenar os botões e a terceira div que é aonde o formulário será criado
const adicionarBtn = document.getElementById('adc-btn'); //botão de adicionar produto no banco de dados
const deleteBtn = document.getElementById('delete-btn'); //botão para deletar produto do banco de dados
const alterarBtn = document.getElementById('modify-btn'); //botão para modificar um produto
const terceiradiv = document.getElementsByTagName('div')[2]; //terceira div aonde será adicionada os inputs ao apertar o botão

//FUNÇÕES -----------------------------------------------------------------------------------------------
//Função que irá criar o input para colocar os dados do produto:
function inserirProduto(num) {
    var form = document.createElement('form');
    form.id = 'produto';
    
    const codBarras = document.createElement('input');
    codBarras.id = 'codigo-barras';
    codBarras.placeholder = 'Cód Barras';
    
    const nomeInput = document.createElement('input');
    nomeInput.id = 'nome-produto';
    nomeInput.placeholder = 'Nome do Produto';
    
    const precoInput = document.createElement('input');
    precoInput.id = 'preco-produto';
    precoInput.placeholder = 'Preço';
    
    form.appendChild(codBarras);
    form.appendChild(nomeInput);
    form.appendChild(precoInput);
    terceiradiv.appendChild(form);

    document.getElementsByTagName("button")[num].style.backgroundColor = 'green';
    document.getElementsByTagName("button")[num].style.color = 'white';
    document.getElementsByTagName("button")[num].textContent = 'OK';
};

//Muda a cor dos botões de volta para a padrão e remove o input:
function deletaInput (num, text) {
    document.getElementsByTagName("button")[0].style.backgroundColor = 'white';
    document.getElementsByTagName("button")[0].style.color = 'black';
    document.getElementsByTagName("button")[0].textContent = 'ADC';

    document.getElementsByTagName("button")[1].style.backgroundColor = 'white';
    document.getElementsByTagName("button")[1].style.color = 'black';
    document.getElementsByTagName("button")[1].textContent = 'DEL';


    document.getElementsByTagName("button")[2].style.backgroundColor = 'white';
    document.getElementsByTagName("button")[2].style.color = 'black';
    document.getElementsByTagName("button")[2].textContent = 'ALT';

    document.getElementById('produto').remove();
}

//3 Regex que verificam se os dados inseridos no código de barras, nome e preço são válidos:
function verificaBarras(num) {
    const barrasOk = /^\d{10,13}$/; //Regex que permite apenas números entre 10 a 13 dígitos
    return barrasOk.test(num);
};

function verificaNome(string) {
    const nomeOK = /^[\w\W]{1,30}$/; //Regex que permite letra, número e simbolos até 30 dígitos
    return nomeOK.test(string);
};

function verificaPreco(num) {
    const precoOk = /^\d+(\.\d+)?$/; //Regex que permite apenas números e permite apenas ponto
    return precoOk.test(num);
};

//Função que irá enviar os dados do produto para o servidor
function enviarProduto() {
    let produto = {
        barras: +document.getElementById('codigo-barras').value,
        nome: document.getElementById('nome-produto').value,
        preco: document.getElementById('preco-produto').value
    };

    if (verificaBarras(produto.barras) && verificaNome(produto.nome) && verificaPreco(produto.preco)) {
        fetch('http://localhost:8080/enviar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(produto)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na solicitação.');
            }
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            alert('Erro na solicitação:' + error.message);
        });
    } else {
        alert('Dados Inseridos Não Seguem o Padrão!');
    };
};

//função que irá enviar a solicitação para deletar o produto do banco de dados
function deletarProduto() {
    let produto = {
        barras: +document.getElementById('codigo-barras').value
    };

    if (verificaBarras(produto.barras)){
        fetch('http://localhost:8080/deletar-produto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(produto)
        })
        .then((res) => {
            if (res.ok) {
                return res.json(); //se a solicitação for bem sucedida, processar os dados json
            } else {
                throw new Error(' Status ' + res.status);
            }
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            alert('Erro na solicitação:' + error.message);
        });
    } else {
        alert('Código de barras não é válido!');
    };
};

//Função que irá alterar os dados de um produto
function alterarProduto() {
    let produto = {
        barras: +document.getElementById('codigo-barras').value,
        novoNome: document.getElementById('nome-produto').value,
        novoPreco: document.getElementById('preco-produto').value
    };

    if (verificaBarras(produto.barras) && verificaNome(produto.novoNome) && verificaPreco(produto.novoPreco)) {
        fetch('http://localhost:8080/alterar-produto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Status ' + res.status);
            }
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            alert('Erro na solicitação: ' + error.message);
        });
    } else {
        alert('Código de barras, nome ou preço inválidos');
    }

};

//EVENTOS--------------------------------------------------------------------------------------------------------
//Evento que irá verificar se já foi apertado o botão para adicionar um novo produto no banco de dados
adicionarBtn.addEventListener('click', () => {
    if (!terceiradiv.querySelector('form')){
        inserirProduto(0);
    } else {
        enviarProduto();
        deletaInput();
    }
});

//evento que irá  verificar se o botão já foi clicado para deletar um produto do banco de dados
deleteBtn.addEventListener('click', () => {
    if (!terceiradiv.querySelector('form')){
        inserirProduto(1);
    } else {
        deletarProduto()
        deletaInput();
    }
});

//Evento que irá verificar se já foi apertado o botão para alterar um produto no banco de dados
alterarBtn.addEventListener('click', () => {
    if (!terceiradiv.querySelector('form')){
        inserirProduto(2);
    } else {
        alterarProduto();
        deletaInput();
    }
})