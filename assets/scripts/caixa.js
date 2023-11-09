//variável que referencia os botões, formulário e as listas---------------------------
const newBtn = document.getElementById('new-btn');
const deletBtn = document.getElementById('delet-btn');
const endBtn = document.getElementById('end-btn');
const cancelBtn = document.getElementById('cancel-btn');
const form = document.getElementsByTagName('form');
const input = document.getElementById('bar-code');
const productList = document.getElementById('product-list');
const priceList = document.getElementById('price-list');

//funções--------------------------------------------------------------------
//função regex que verifica se o código de barras inserido é válido
function verificaBarras(num) {
    const barrasOk = /^\d{10,13}$/; //Regex que permite apenas números entre 10 a 13 dígitos
    return barrasOk.test(num);
};

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
form.addEventListener('submit', (event) => {
    event.preventDefault();

    
})