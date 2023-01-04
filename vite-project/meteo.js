import {createElement,createElementImg} from './CreationElements.js'
import {main__listHeure} from './index.js'


//creation meteo
export function meteo(data){
    for (let elem of data.list){
        //creation carte meteo
        let meteo=document.createElement("div")
        meteo.className="meteo"
        main__listHeure.appendChild(meteo)
        meteo.classList.add(elem.dt_txt.split(" ")[0])
        //heure
        let heure = elem.dt_txt.split(" ")[1].substring(0,5)
        createElement("p","meteo__heure",meteo,heure)
        //logo meteo
        let source="http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png"
        createElementImg("meteo__logo",meteo,source)
        //description meteo
        let description=elem.weather[0].description
        createElement("p","meteo__description",meteo,description)
        //temperature
        let temperature=(elem.main.temp).toFixed(0)+ " ° "
        createElement("p","meteo__temperature",meteo,temperature)
        //vent
        let wind=(elem.wind.speed*3.6).toFixed(0)+" km/h"
        createElement("p","meteo__wind",meteo,wind)
    }
}