//link api

const apiLink = 'https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL';

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
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
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
  meuGrafico(dados);
}).catch(err=>console.log("error"));
