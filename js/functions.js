const totalconta = document.querySelector('.total-conta');
const numeropessoas = document.querySelector('.numero-pessoas');
const gorjeta = document.getElementById('gorjeta-por-cabeca');
const totalgorjeta = document.getElementById('total-gorjeta-por-cabeca');
const gorjetas = document.querySelectorAll(".gorjeta");
const gorjetacustom = document.querySelector(".taxa-percentual");
const reset = document.querySelector(".reiniciar");
const error = document.querySelector(".error")

totalconta.addEventListener("input", totalcontafun);
numeropessoas.addEventListener("input", numeropessoasfun);
gorjetas.forEach(function(val){
    val.addEventListener("click", handleClick);
})

gorjetacustom.addEventListener("input", gorjetacustomfun);
reset.addEventListener('click', reiniciar)

totalconta.value = "0.0";
numeropessoas.value = "1";
gorjeta.innerHTML = "$" +  (0.0).toFixed(2);
totalgorjeta.innerHTML = "$" +  (0.0).toFixed(2);

let contavalor = 0.0;
let pessoasvalor = 1;
let valorgorjeta =0.15;

function totalcontafun(){
    contavalor = parseFloat(totalconta.value);
    calculargorjeta();
    console.log(contavalor)
}

function numeropessoasfun(){
    pessoasvalor = parseFloat(numeropessoas.value);
    if(pessoasvalor < 1){
        error.style.display = "flex";
        numeropessoas.style.border = "thick solid red"
    } else {
        error.style.display = "none";
        numeropessoas.style.border = "none"
        calculargorjeta();
        console.log(pessoasvalor)
    }
    
}

function gorjetacustomfun(){
    valorgorjeta=parseFloat(gorjetacustom.value / 100) ;
    gorjetas.forEach(function(val){
        val.classList.remove("ativado");
    })
    calculargorjeta();
    console.log(valorgorjeta)
}

function handleClick(event){
    gorjetas.forEach(function(val){
        val.classList.remove("ativado")
        if (event.target.innerHTML == val.innerHTML){
            val.classList.add("ativado");
            valorgorjeta = parseFloat(val.innerHTML) / 100;
        }
    });
    calculargorjeta();
    console.log(valorgorjeta)
}

function calculargorjeta() {

    if (pessoasvalor >= 1) {
        let Gorjetafinal = (contavalor * valorgorjeta) / pessoasvalor;
        let Total = (contavalor + (Gorjetafinal * pessoasvalor)) / pessoasvalor;
        gorjeta.innerHTML = "$" + Gorjetafinal.toFixed(2);
        totalgorjeta.innerHTML = "$" + Total.toFixed(2);
    }
}

function reiniciar(){
    totalconta.value = "0.0";
    totalcontafun()
    numeropessoas.value = "1";
    numeropessoasfun()
    gorjetacustom.value = "";
}