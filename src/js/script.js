const apiKey = "735c5dbe0e335e47fd925e80875c0b61";
const unsplashApiKey = 'krhNpVZ0DXS1FfJIj4HO6nkEMZiuTan4arHqaXh3er4';

const inputCity = document.querySelector('#inputCity');
const btnInput = document.querySelector('#btnInputCity');
const preLocation = document.querySelector('#preLocation');
const elementPesquisa = document.querySelector("#elementPesquisa");
const nameCity = document.querySelector('#nameCity');
const temperatura = document.querySelector('#temperatura');
const description = document.querySelector('#description');
const windyVelocity = document.querySelector('#windyVelocity');
const humidity = document.querySelector('#humidity');
const tempMax = document.querySelector('#tempMax');
const flag = document.querySelector('#flag');
const iconDescription = document.querySelector('#iconDescription')

const boxPreLocation = document.querySelectorAll('.boxPreLocation');

async function pegarImgBackground() {
    try {
        const apiUnsplash = await fetch(`https://api.unsplash.com/search/photos?query=${inputCity.value}&client_id=${unsplashApiKey}&orientation=landscape&per_page=1`);
        const dataunsplash = await apiUnsplash.json();

        console.log(dataunsplash);

        if (dataunsplash.results && dataunsplash.results.length > 0) {
            const imageUrl = dataunsplash.results[0].urls.regular;
            document.body.style.backgroundImage = `url(${imageUrl})`;
        } else {
            console.log('Nenhuma imagem encontrada');
        }
    } catch (error) {
        console.error('Não foi possível conectar a Api Unsplash', error);
    }
}


btnInput.addEventListener('click', async function(e) {
    
    e.preventDefault();
    try{
        const apiConecta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&lang=pt`)

        const converteApi = await apiConecta.json();

        console.log(converteApi);
        
            preLocation.style.display = 'none'
            elementPesquisa.style.display = 'flex';

            //trocar bandeira
            const changeFlag = converteApi.sys.country
            flag.src = `https://flagsapi.com/${changeFlag}/flat/48.png`


            //Converter temperatura
            const tempCelsius = (converteApi.main.temp - 273.15).toFixed(0);
            const convertTempMax = (converteApi.main.temp_max - 273.15).toFixed(0);

            nameCity.textContent = converteApi.name;
            temperatura.textContent = tempCelsius + '°C';
            description.textContent = converteApi.weather[0].description;
            tempMax.textContent = convertTempMax + '°C'
            windyVelocity.textContent = converteApi.wind.speed.toFixed(0) + ' Km/h';
            humidity.textContent = converteApi.main.humidity + '%';

            //trocar backgroudn
            pegarImgBackground();

            //trocar iconDescription
            const changeIconDescription = converteApi.weather[0].icon;
            iconDescription.src = `https://openweathermap.org/img/wn/${changeIconDescription}@2x.png`
    } catch(error){
        alert("Insira uma cidade válida");
        preLocation.style.display = 'flex'
        elementPesquisa.style.display = 'none';
    }
})



boxPreLocation.forEach(Location => {
    Location.addEventListener('click', async function(e) {

        e.preventDefault();

        const cityName = this.querySelector('#spanValue').textContent;

        try{
            const apiConecta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=pt`)

            const converteApi = await apiConecta.json();

            console.log(converteApi);

            preLocation.style.display = 'none'
            elementPesquisa.style.display = 'flex';

            //trocar bandeira
            const changeFlag = converteApi.sys.country
            flag.src = `https://flagsapi.com/${changeFlag}/flat/48.png`


            //Converter temperatura
            const tempCelsius = (converteApi.main.temp - 273.15).toFixed(0);
            const convertTempMax = (converteApi.main.temp_max - 273.15).toFixed(0);

            nameCity.textContent = converteApi.name;
            temperatura.textContent = tempCelsius + '°C';
            description.textContent = converteApi.weather[0].description;
            tempMax.textContent = convertTempMax + '°C'
            windyVelocity.textContent = converteApi.wind.speed.toFixed(0) + ' Km/h';
            humidity.textContent = converteApi.main.humidity + '%';

            //trocar backgroudn
            pegarImgBackground();

            //trocar iconDescription
            const changeIconDescription = converteApi.weather[0].icon;
            iconDescription.src = `https://openweathermap.org/img/wn/${changeIconDescription}@2x.png`

        } catch(error){
            console.log("erro")
        }
    })
})


