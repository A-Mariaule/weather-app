//boutton
let button=document.querySelector("button")
let main=document.getElementsByClassName("main")[0]
let h2=document.createElement("h2")
main.appendChild(h2)

//préparation de la météo
let div_meteo=document.createElement("div")
div_meteo.className="meteo"
main.appendChild(div_meteo)


button.addEventListener("click",()=>{
    while(div_meteo.firstChild){
        div_meteo.removeChild(div_meteo.firstChild)
    }
    let input=document.querySelector("input")
    city=input.value
    const fetchName = (city) => fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ city+"&cnt=8&units=metric&appid=1cdbc48903d1d699f34e221b79e38af7");
    fetchName(city)
    .then((response)=>response.json())
    .then((json)=>{
        localStorage.setItem("data",JSON.stringify(json))
        data=JSON.parse(localStorage.getItem("data"))
        h2.textContent=data.city.name
        console.log(data)
        for (let elem of data.list){
            let heure=document.createElement("p")
            heure.className="meteo__heure"
            div_meteo.appendChild(heure)
            heure.textContent=elem.dt_txt.split(" ")[1].substring(0,5);;
            let logo=document.createElement("img")
            logo.className="meteo__logo "
            div_meteo.appendChild(logo)
            logo.src="http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png"
            let description=document.createElement("p")
            description.className="meteo__description"
            div_meteo.appendChild(description)
            description.textContent=elem.weather[0].description
            let temperature=document.createElement("p")
            temperature.className="meteo__temperature"
            div_meteo.appendChild(temperature)
            temperature.textContent=(elem.main.temp).toFixed(0)+ " ° "
            let wind=document.createElement("p")
            wind.className="meteo__wind"
            wind.textContent=(elem.wind.speed*3.6).toFixed(0)+" km/h"
            div_meteo.appendChild(wind)
        }
    })
})
