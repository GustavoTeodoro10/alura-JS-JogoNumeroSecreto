let listaNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = 2;
let tentativas = 1;

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
exibirTextoNaTela('h1','Jogo do numero secreto');
exibirTextoNaTela('p','Escolha um número entre 1 e 10');

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
        let mensagemTerntativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTerntativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p',`O numero secreto é menor que ${chute}`);
        } else{
            exibirTextoNaTela('p',`O numero secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
   let qtdDeelementosNaLista = listaNumeroSorteados.length;

   if (qtdDeelementosNaLista == numeroLimite){
    listaNumeroSorteados = [];
   }
   if (listaNumeroSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else{
    listaNumeroSorteados.push(numeroEscolhido)
    return numeroEscolhido;
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);

}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do numero secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10');
}