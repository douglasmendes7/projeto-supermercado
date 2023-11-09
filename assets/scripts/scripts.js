//Variáveis que referenciam a senha e os elementos html:
const senhaMestra = '1357';
const sectionElement = document.querySelector('body > main > section');
const botoes = sectionElement.querySelectorAll('button');

//Função que verifica qual botão foi clicado, verifica senha e redireciona para a página solicitada:
function funcaoPromt(event){
    var senha = prompt('Digite a senha:');
    const botaoClicado = event.target;
    const botaoTexto = botaoClicado.textContent;

    if (senha === senhaMestra && botaoTexto == 'Gerenciar Est') {
        window.location.href = './pages/estoque.html';
    } else if (senha === senhaMestra && botaoTexto == 'Caixa') {
        window.location.href = './pages/caixa.html';
    } else {
        alert('Senha Incorreta');
    }
};

//For Each que adiciona o mesmo evento aos dois botões:
botoes.forEach(function(botao){
    botao.addEventListener('click', funcaoPromt);
});

