//variável que armazena os botões da div
const botoesContainer = document.querySelectorAll('#button-container button');
//variáveis que armazena os elementos do formulário
const form = document.getElementById('formulario');
const buttonForm = document.getElementById('bar-button');
const input = document.getElementById('bar-code');
//variáveis que armazena os elementos da lista de produtos
const productList = document.getElementById('product-list');
const priceList = document.getElementById('price-list');
const barList = document.getElementById('bar-list');
//variável com as cores dos botões usadas na estrutura de decisão
const collorNewPurchase = window.getComputedStyle(document.getElementById('new-btn')).backgroundColor;
const collorDelet = window.getComputedStyle(document.getElementById('delet-btn')).backgroundColor;
const collorEndPurchase = window.getComputedStyle(document.getElementById('end-btn')).backgroundColor;
const collorCancelPurchase = window.getComputedStyle(document.getElementById('cancel-btn')).backgroundColor;

//funções--------------------------------------------------------------------
//função regex que verifica se o código de barras inserido é válido
function verificaBarras(num) {
    const barrasOk = /^\d{10,13}$/; //Regex que permite apenas números entre 10 a 13 dígitos
    return barrasOk.test(num);
};

//função que muda a cor do botão acionado para verde
function changesColorGreen(id) {
    id.style.backgroundColor = 'rgb(10, 210, 10)';
    id.style.color = '#fff';
    id.style['font-weight'] = 'bold';
    //tira o 'none' do formulário
    form.style.display = 'block';
};

//função que muda a cor do botão para acionado para vermelho
function changesColorRed(id) {
    id.style.backgroundColor = 'rgb(210, 10, 10)';
    id.style.color = '#fff';
    id.style['font-weight'] = 'bold';
    //tira o 'none' do formulário
    form.style.display = 'block';
};

//função que muda a cor dos botões de volta ao normal


//função fetch que busca o produto no bd e insere na lista
function newPurchase(num) {
    form.style.display = '';

    if(verificaBarras(num)) {
        fetch('', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(num)
        })
        .then()
        .catch()

    } else {
        alert('Código de barras inserido é inválido');
    };
};

//função que deleta um produto de acordo com a sua ordem na lista
function deletProduct(num) {
    var posicao = -1;

    for (var i = 0; i < barList.children.length; i++) {
        if (barList.children[i].textContent === num) {
            posicao = i;
            break;
        };
    };

    if (posicao !== -1) {
        productList.removeChild(productList.children[posicao]);
        priceList.removeChild(priceList.children[posicao]);
        barList.removeChild(barList.children[posicao]);
    } else {
        alert('Código de barras não encontrado')
    };
};


//função que finaliza a compra----------------------------------------
function endPurchase() {

};

//função que cancela a compra-----------------------------------------
function cancelPurchase() {

};

//eventos--------------------------------------------------------------
//evento dos botões
botoesContainer.forEach(function(botao) {
    botao.addEventListener('click', () => {
        var buttonActivated = botao.id;

        switch (buttonActivated){
            case 'new-btn':
                if(collorNewPurchase !== 'rgb(10, 210, 10)'){
                    changesColorGreen(botao);
                };
                break;

            case 'delet-btn':
                if(collorDelet !== 'rgb(210, 10, 10)') {
                    changesColorRed(botao);
                };
                break;

            case 'end-btn':
                endPurchase();
                break;

            case 'cancel-btn':
                cancelPurchase();
                break;
        };
    });
});

//evento do formulário
buttonForm.addEventListener('click', (event) => {
    event.preventDefault();

    const barCodeInserted = input.value;

    deletProduct(barCodeInserted);
});