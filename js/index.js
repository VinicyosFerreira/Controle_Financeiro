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

function limparDados(e){
        e.preventDefault();
        const modal = document.querySelector('#modal');
        const btnConfirmar= document.querySelector('#btn-confirmar');
        const btnCancelar = document.querySelector('#btn-cancelar');
        const sobreposicao = document.querySelector('#sobreposicao');

        modal.style.display = 'flex';
        sobreposicao.style.display = 'block';

        btnConfirmar.addEventListener('click' , () => {
            extrato.splice(0 , extrato.length);
            tabelaExtrato();
            localStorage.setItem('extrato' , JSON.stringify(extrato));
            modal.style.display = 'none';
            sobreposicao.style.display = 'none';
        })

        btnCancelar.addEventListener('click' , () => {
            e.preventDefault();
            modal.style.display = 'none';
            sobreposicao.style.display = 'none';
        })
     
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


function toggle () {
    const menu_toggle = document.querySelector('.menu-toggle');
    const menu_fechar = document.querySelector('.menu-close');
    const links =  document.querySelector('.links');
 
    menu_toggle.addEventListener('click' , mostrarMenu);
    menu_fechar.addEventListener('click' , fecharMenu);

    function mostrarMenu() {
        menu_toggle.classList.toggle('active');
        links.style.display = 'flex';
    }

    function fecharMenu(e) {
        e.preventDefault()
        menu_toggle.classList.remove('active');
        links.style.display = 'none';
    }
    
}
toggle()

