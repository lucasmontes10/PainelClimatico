document.querySelector('.form-busca').addEventListener('submit', async (evento)=>{
        evento.preventDefault(); //Evitando o comportando padrão da função que seria o envio do formulario
        let input_result = document.querySelector('#buscador').value;
        if (input_result != ''){
            warningEdit('carregando...');
            //Trabalhando com a API
            //Não esquecer de transformar o input desejado com o encodeURI
            let result_api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input_result)}&appid=f43c43738c866597d2d297da9a914aa4&units=metric&lang=pt_br`);
            let json = await result_api.json();
            console.log(json);
            if (json.cod == 200){
                printarResultado({
                    nome: json.name,
                    country: json.sys.country,
                    temperatura: json.main.temp,
                    iconTemp: json.weather[0].id,
                    desc: json.weather[0].description,
                    windspeed: json.wind.speed,
                    windAngulo: json.wind.deg
                });
            } else{
                warningEdit('Cidade não encontrada');
            }
        } else{
            warningEdit('Cidade não encontrada');
        }        
});

function printarResultado(json){
    warningEdit('');
    document.querySelector('.resultado').style.display = 'block';
}


function warningEdit(msg){
    document.querySelector('.aviso').innerHTML = msg;
}