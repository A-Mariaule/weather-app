//header
let button=document.querySelector("button")
let header=document.getElementsByClassName("header")[0]
let header__listButton=document.createElement("div")
createElement("h2","header__subtitle",header)

//creation du main__header
let main=document.getElementsByClassName("main")[0]
createElement("div","main__header",main)
let main__header=document.getElementsByClassName("main__header")[0]
createElement("p","main__header--average",main__header)
createElement("p","main__header--description",main__header)


//creation du main__listHeure
createElement("div","main__listHeure",main)
let main__listHeure=document.getElementsByClassName("main__listHeure")[0]


//calcul du nombre d'heures nécessaire
const date=new Date()
let heure_rest=24-date.getHours()
let number_time=Math.floor(heure_rest/3)
let total_number=number_time+32

//jour de la semaine
const week=["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."]


//creation de la météo
button.addEventListener("click",()=>{
    main__listHeure.innerHTML=""
    header__listButton.innerHTML=""
    document.getElementsByClassName("main__header")[0].style.display="none"
    let input=document.querySelector("input")
    city=input.value
    const fetchName = (city) => fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ city+"&cnt="+total_number+"&units=metric&appid=1cdbc48903d1d699f34e221b79e38af7");
    fetchName(city)
    .then((response)=>response.json())
    .then((json)=>{
        localStorage.setItem("data",JSON.stringify(json))
        data=JSON.parse(localStorage.getItem("data"))
        document.getElementsByClassName("header__subtitle")[0].textContent=data.city.name
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
        //create button jour
        header__listButton.classList="header__listButton"
        header.appendChild(header__listButton)
        CreateButton(date)
        let date_2=new Date(date)
        date_2.setDate(date_2.getDate()+1)
        CreateButton(date_2)
        let date_3=new Date(date)
        date_3.setDate(date_3.getDate()+2)
        CreateButton(date_3)
        let date_4=new Date(date)
        date_4.setDate(date_4.getDate()+3)
        CreateButton(date_4)
        let date_5=new Date(date)
        date_5.setDate(date_5.getDate()+4)
        CreateButton(date_5)
    })
})

//////////*Fonctions*//////////////////

//creation bouton jour
function CreateButton(date){
    let button_day=document.createElement("button")
    button_day.textContent=week[date.getDay()]
    header__listButton.appendChild(button_day)
    button_day.style.display="block"
    button_day.addEventListener("click",()=>{
        let list=document.getElementsByClassName("header__listButton")[0].children;
        for (let button of list){
            button.style.backgroundColor="white"
            button.style.color="black"
        }
        button_day.style.backgroundColor="black"
        button_day.style.color="white"
        document.getElementsByClassName("main__header")[0].style.display="block"
        DescriptionMeteo(date)
        document.getElementsByClassName("main__header--average")[0].innerHTML=" "
        let average=0
        for(let elem of main__listHeure.children){
            elem.style.display="none"
            if(elem.classList.contains(newdate(date))){
                elem.style.display="flex"                    
                average=average+Number(elem.children[3].textContent.slice(0,-2))
            }
        }
        displayAverage(average,date)
    })
}

//gestion description meteo
function DescriptionMeteo(date){
    let today=new Date()
    if(today.getDate()==date.getDate()){
        document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[0].textContent
    }
    else if(today.getDate()+1==date.getDate()){
        document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[number_time].textContent
    }
    else if(today.getDate()+2==date.getDate()){
        document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[number_time+8].textContent
    }
    else if(today.getDate()+3==date.getDate()){
        document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[number_time+16].textContent
    }
    else{
        document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[number_time+24].textContent
    }
}

//gestion date
function newdate(date){
    if(date.getDate()<10 && date.getMonth()<10){
        return date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+(date.getDate())
    }
    else if(date.getDate()<10){
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+"0"+(date.getDate())
    }
    else if(date.getMonth()<10){
        return date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"(date.getDate())
    }
    else{
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"(date.getDate())
    }
}

// gestion average
function displayAverage(average,date){
    let today=new Date()
    if(today.getDate()==date.getDate()){
        average=(average/number_time).toFixed(0)
        document.getElementsByClassName("main__header--average")[0].textContent=average+ "°"
    }
    else{
        average=(average/8).toFixed(0)
        document.getElementsByClassName("main__header--average")[0].textContent=average+ "°"
    }
}

//creation element 
function createElement(tag,name,parent,content=""){
    let item=document.createElement(tag)
    item.className=name
    parent.appendChild(item)
    item.textContent=content
}

//creation element img
function createElementImg(name,parent,src){
    let item=document.createElement("img")
    item.className=name
    parent.appendChild(item)
    item.src=src
}

