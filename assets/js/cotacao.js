//definindo a manipulação.
let dolarPage = document.querySelector("#dolar");
let euroPage = document.querySelector("#euro");
let bitPage = document.querySelector("#bitcoin");


//link api

const apiLink = 'https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL';

//função para pegar pegar e inserir no html os valores

function valores(dados){
  let dolar = parseFloat(dados.USD.bid).toFixed(2);
  let euro = parseFloat(dados.EUR.bid).toFixed(2);
  let bitcoin = parseFloat(dados.BTC.bid).toFixed(2);

  dolarPage.innerHTML = `R$: ${dolar}`;
  euroPage.innerHTML = `R$: ${euro}`;
  bitPage.innerHTML = `R$: ${bitcoin}`;
}

function meuGrafico(dados){

  let dolar = parseFloat(dados.USD.bid).toFixed(2);
  let euro = parseFloat(dados.EUR.bid).toFixed(2);
  let bitcoin = parseFloat(dados.BTC.bid).toFixed(2);
    /** Configurando o grafico */
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dolar', 'Euro',],
            datasets: [{
                label: '# Reais',
                data: [dolar,euro,],
                backgroundColor: [
                    'rgba(0, 255, 127, 0.5)',
                    'rgba(0, 191, 255, 0.5)',
                ],
                borderColor: [
                    'rgba(0, 100, 0, 1)',
                    'rgba(70, 130, 180, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    /** fim da configuração */


}


//axios get
axios({
  method:'get',
  url:apiLink,
}).then(response=>{
  var dados = response.data;
  valores(dados);
  meuGrafico(dados);
}).catch(err=>console.log("error"));


/** refatorando o codigo usando promises */
prencherValores();

function prencherValores(){
    Promise.all([
        awesomeapiget('USD-BRL'), 
        awesomeapiget('EUR-BRL'),
        awesomeapiget('BTC-BRL')
    ])
  .then(function (results) {
    console.log(results);
    dolarPage.innerHTML = parseFloat(results[0].data.USD.bid).toFixed(2);
    euroPage.innerHTML = parseFloat(results[1].data.EUR.bid).toFixed(2);
    bitPage.innerHTML = parseFloat(results[2].data.BTC.bid).toFixed(2);

  });
}

function awesomeapiget(params){
    return axios.get(`https://economia.awesomeapi.com.br/all/${params}`);
}
