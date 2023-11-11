//variável que referencia os botões, formulário e as listas---------------------------
const newBtn = document.getElementById('new-btn');
const deletBtn = document.getElementById('delet-btn');
const endBtn = document.getElementById('end-btn');
const cancelBtn = document.getElementById('cancel-btn');
const form = document.getElementById('formulario');
const input = document.getElementById('bar-code');
const productList = document.getElementById('product-list');
const priceList = document.getElementById('price-list');
const botoesContainer = document.querySelectorAll('#button-container button');

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
};

//função que muda a cor do botão para acionado para vermelho
function changesColorRed(id) {
    id.style.backgroundColor = 'rgb(210, 10, 10)';
    id.style.color = '#fff';
    id.style['font-weight'] = 'bold';
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
    form.style.display= '';

    if(num > 0 && num <= productList.children.length) {
        productList.removeChild(productList.children[num - 1]);
        priceList.removeChild(priceList.children[num - 1]);
    } else {
        alert('Número inválido');
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
        var buttonActivated = botao.id

        switch (buttonActivated){
            case 'new-btn':
                changesColorGreen(botao);
                break;

            case 'delet-btn':
                deletProduct(input);
                changesColorRed(botao);
                break;

            case 'end-btn':
                endPurchase();
                changesColorGreen(botao);
                break;

            case 'cancel-btn':
                cancelPurchase();
                changesColorRed(botao);
                break;
        }
    });
});

//evento do formulário