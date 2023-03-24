var pegarExtrato = localStorage.getItem('extrato')
if (pegarExtrato !== null){
    var extrato = JSON.parse(pegarExtrato);
}
else {
    extrato = [];
}

tabelaExtrato();

function tabelaExtrato() {
    linhasExistentes = [...document.querySelectorAll(".conteudo-dinamico")];

    linhasExistentes.forEach(element => {
        element.remove();
    })

    var valorTotal = 0;

    for(i in extrato) {
            document.querySelector('.table-extrato tbody').innerHTML += 
            `<tr class="conteudo-dinamico">
                <td class="sinal">${extrato[i].sinal}</td>
                <td class="mercadoria">${extrato[i].mercadoria}</td>
                <td class="valor">${extrato[i].valor}</td>   
            </tr>`
      
            if (extrato[i].sinal == '+') {
                valorTotal += parseFloat(extrato[i].valor.replaceAll('.' , '').replace(',' , '.').replaceAll('R$' , ''));
            } else {
                valorTotal -= parseFloat(extrato[i].valor.replaceAll('.' , '').replace(',' , '.').replaceAll('R$' , ''));
            } 
    }

    let frase = document.querySelector('.lucro-prejuizo');
   
    if (!valorTotal) {
        frase.innerHTML = `<p></p>`
    } else if (valorTotal > 0) {
        frase.innerHTML = `<p>[LUCRO]</p>`
    } else if (valorTotal < 0) {
        frase.innerHTML = `<p>[PREJUIZO]</p>`
    }

    document.querySelector('.valor-total').innerHTML = 
    `<td class="valor-total">R$ ${valorTotal.toLocaleString()}</td>`
}
function testaFormulario(e) {

    /*
        if (e.target.elements['valor'].value.length > 18) {
            alert('Você está digitando um numero maior que permitido')
            return;
        }*/
    
        if (e.target.elements[0].value === "Compras") {
            extrato.push({
            sinal : '-' ,
            mercadoria : e.target.elements['nome'].value , 
            valor : e.target.elements['valor'].value ,
        })
        e.preventDefault();
        tabelaExtrato();

      
       } else if (e.target.elements[0].value === "Vendas") {
            extrato.push({
            sinal : '+' ,
            mercadoria : e.target.elements['nome'].value , 
            valor : e.target.elements['valor'].value ,
        })
        e.preventDefault();
        tabelaExtrato();
       }

    localStorage.setItem('extrato' , JSON.stringify(extrato));
}
function limparDados(r){
    if (window.confirm("Deseja limpar os dados do extrato ?") == true) {
        r.preventDefault();
        extrato.splice(r);
        tabelaExtrato();
        localStorage.setItem('extrato' , JSON.stringify(extrato));
    } else {
        r.preventDefault();
    }

}

function apenasNumeros(e) {
    if 
    ('0123456789'.indexOf(e.key) == -1 
    && e.key != 'Backspace' 
    && e.key != 'Ctrl'
    && e.key != 'Alt'){
        e.preventDefault();
    }
}

function mascara (e) {
    e.preventDefault();
    
    var valor = e.target.value.replace(/\D/g , '');
    valor = (valor / 100).toFixed(2) + ''; 
    valor = valor.replace('.' , ',');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    e.target.value = 'R$ ' + valor;
    
}

function cadastro(evento) {
    evento.preventDefault();

    document.querySelector(".cadastroTransacoes").addEventListener('click' , () =>{
        document.querySelector("#nome").focus()
    })
}
