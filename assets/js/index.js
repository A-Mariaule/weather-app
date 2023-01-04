//import
import {createElement} from './CreationElements.js'
import {CreateButtons} from './Buttons.js'
import {meteo} from './meteo.js'

//constantes
export const date=new Date()
export const week=["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."]

//header
let button=document.querySelector("button")
export var header=document.getElementsByClassName("header")[0]
export var header__listButton=document.createElement("div")
createElement("h2","header__subtitle",header)

//creation du main__header
let main=document.getElementsByClassName("main")[0]
createElement("div","main__header",main)
let main__header=document.getElementsByClassName("main__header")[0]
createElement("p","main__header--average",main__header)
createElement("p","main__header--description",main__header)


//creation du main__listHeure
createElement("div","main__listHeure",main)
export var main__listHeure=document.getElementsByClassName("main__listHeure")[0]


//calcul du nombre d'heures nécessaire
let heure_rest=24-date.getHours()
export var number_time=Math.floor(heure_rest/3)
let total_number=number_time+32


//creation de la météo + ajout boutons
button.addEventListener("click",()=>{
    main__listHeure.innerHTML=""
    header__listButton.innerHTML=""
    document.getElementsByClassName("main__header")[0].style.display="none"
    let input=document.querySelector("input")
    let city=input.value
    const fetchName = (city) => fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ city+"&cnt="+total_number+"&units=metric&appid=1cdbc48903d1d699f34e221b79e38af7");
    fetchName(city)
    .then((response)=>response.json())
    .then((json)=>{
        localStorage.setItem("data",JSON.stringify(json))
        let data=JSON.parse(localStorage.getItem("data"))
        document.getElementsByClassName("header__subtitle")[0].textContent=data.city.name
        //creation carte meteo
        meteo(data)
        //creation bouton jour
        CreateButtons()
    })
})


