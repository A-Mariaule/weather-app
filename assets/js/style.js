//boutton
let button=document.querySelector("button")
let main=document.getElementsByClassName("main")[0]
let header=document.getElementsByClassName("header")[0]
let h2=document.createElement("h2")
h2.className="header__subtitle"
header.appendChild(h2)

//préparation de la météo
let main__header=document.createElement("div")
main__header.className="main__header"
main.appendChild(main__header)
let main__average=document.createElement("p")
main__average.className="main__header--average"
main__header.appendChild(main__average)
let main__description=document.createElement("p")
main__description.className="main__header--description"
main__header.appendChild(main__description)


let main__listHeure=document.createElement("div")
main__listHeure.className="main__listHeure"
main.appendChild(main__listHeure)
let header__listButton=document.createElement("div")

//calcul du nombre d'heure nécessaire
var date=new Date()
var heure_rest=24-date.getHours()
var number_time=Math.floor(heure_rest/3)
var total_number=number_time+32
today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

//jour de la semaine

var week=["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."]



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
        h2.textContent=data.city.name
        console.log(data)
        for (let elem of data.list){
            let meteo=document.createElement("div")
            meteo.className="meteo"
            main__listHeure.appendChild(meteo)
            let heure=document.createElement("p")
            heure.className="meteo__heure"
            meteo.classList.add(elem.dt_txt.split(" ")[0])
            meteo.appendChild(heure)
            heure.textContent=elem.dt_txt.split(" ")[1].substring(0,5);
            let logo=document.createElement("img")
            logo.className="meteo__logo "
            meteo.appendChild(logo)
            logo.src="http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png"
            let description=document.createElement("p")
            description.className="meteo__description"
            meteo.appendChild(description)
            description.textContent=elem.weather[0].description
            let temperature=document.createElement("p")
            temperature.className="meteo__temperature"
            meteo.appendChild(temperature)
            temperature.textContent=(elem.main.temp).toFixed(0)+ " ° "

            let wind=document.createElement("p")
            wind.className="meteo__wind"
            wind.textContent=(elem.wind.speed*3.6).toFixed(0)+" km/h"
            meteo.appendChild(wind)
        }
        //create button
        header__listButton.classList="header__listButton"
        header.appendChild(header__listButton)
        let button_day1=document.createElement("button")
        button_day1.className=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate())
        button_day1.textContent=week[date.getDay()]
        header__listButton.appendChild(button_day1)
        button_day1.style.display="block"
        button_day1.addEventListener("click",()=>{
            let list=document.getElementsByClassName("header__listButton")[0].children;
            for (let button of list){
                button.style.backgroundColor="white"
                button.style.color="black"
            }
            button_day1.style.backgroundColor="black"
            button_day1.style.color="white"
            document.getElementsByClassName("main__header")[0].style.display="block"
            document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[0].textContent
            document.getElementsByClassName("main__header--average")[0].innerHTML=" "
            let average1=0
            for(let elem of main__listHeure.children){
                elem.style.display="none"
                if(elem.classList.contains(date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+(date.getDate()))){
                    elem.style.display="flex"                    
                    average1=average1+Number(elem.children[3].textContent.slice(0,-2))
                }
            }
            average1=(average1/number_time).toFixed(0)
            document.getElementsByClassName("main__header--average")[0].textContent=average1+ "°"
        })
        let button_day2=document.createElement("button")
        button_day2.className=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1)
        button_day2.textContent=week[(date.getDay()+1)%7]
        header__listButton.appendChild(button_day2)
        button_day2.style.display="block"
        button_day2.addEventListener("click",()=>{
            let list=document.getElementsByClassName("header__listButton")[0].children;
            for (let button of list){
                button.style.backgroundColor="white"
                button.style.color="black"
            }
            button_day2.style.backgroundColor="black"
            button_day2.style.color="white"
            document.getElementsByClassName("main__header")[0].style.display="block"
            document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[number_time].textContent
            document.getElementsByClassName("main__header--average")[0].innerHTML=" "
            let average2=0
            for(let elem of main__listHeure.children){
                elem.style.display="none"
                if(elem.classList.contains(date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+(date.getDate()+1))){
                    elem.style.display="flex"
                    average2=average2+Number(elem.children[3].textContent.slice(0,-2))
                }
            }
            average2=(average2/8).toFixed(0)
            document.getElementsByClassName("main__header--average")[0].textContent=average2+ "°"
        })
        let button_day3=document.createElement("button")
        button_day3.className=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+2)
        button_day3.textContent=week[(date.getDay()+2)%7]
        header__listButton.appendChild(button_day3)
        button_day3.style.display="block"
        button_day3.addEventListener("click",()=>{
            let list=document.getElementsByClassName("header__listButton")[0].children;
            for (let button of list){
                button.style.backgroundColor="white"
                button.style.color="black"
            }
            button_day3.style.backgroundColor="black"
            button_day3.style.color="white"
            document.getElementsByClassName("main__header")[0].style.display="block"
            document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[number_time+8].textContent
            document.getElementsByClassName("main__header--average")[0].innerHTML=" "
            let average3=0
            for(let elem of main__listHeure.children){
                elem.style.display="none"
                if(elem.classList.contains(date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+(date.getDate()+2))){
                    elem.style.display="flex"
                    average3=average3+Number(elem.children[3].textContent.slice(0,-2))
                }
            }
            average3=(average3/8).toFixed(0)
            document.getElementsByClassName("main__header--average")[0].textContent=average3+ "°"
        })
        let button_day4=document.createElement("button")
        button_day4.className=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+3)
        button_day4.textContent=week[(date.getDay()+3)%7]
        header__listButton.appendChild(button_day4)
        button_day4.style.display="block"
        button_day4.addEventListener("click",()=>{
            let list=document.getElementsByClassName("header__listButton")[0].children;
            for (let button of list){
                button.style.backgroundColor="white"
                button.style.color="black"
            }
            button_day4.style.backgroundColor="black"
            button_day4.style.color="white"
            document.getElementsByClassName("main__header")[0].style.display="block"
            document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[number_time+16].textContent
            document.getElementsByClassName("main__header--average")[0].innerHTML=" "
            let average4=0
            for(let elem of main__listHeure.children){
                elem.style.display="none"
                if(elem.classList.contains(date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+(date.getDate()+3))){
                    elem.style.display="flex"
                    average4=average4+Number(elem.children[3].textContent.slice(0,-2))
                }
            }
            average4=(average4/8).toFixed(0)
            document.getElementsByClassName("main__header--average")[0].textContent=average4+ "°"
        })
        let button_day5=document.createElement("button")
        button_day5.className=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+4)
        button_day5.textContent=week[(date.getDay()+4)%7]
        header__listButton.appendChild(button_day5)
        button_day5.style.display="block"
        button_day5.addEventListener("click",()=>{
            let list=document.getElementsByClassName("header__listButton")[0].children;
            for (let button of list){
                button.style.backgroundColor="white"
                button.style.color="black"
            }
            button_day5.style.backgroundColor="black"
            button_day5.style.color="white"
            document.getElementsByClassName("main__header")[0].style.display="block"
            document.getElementsByClassName("main__header--description")[0].textContent=document.getElementsByClassName("meteo__description")[number_time+24].textContent
            document.getElementsByClassName("main__header--average")[0].innerHTML=" "
            let average5=0
            for(let elem of main__listHeure.children){
                elem.style.display="none"
                if(elem.classList.contains(date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+(date.getDate()+4))){
                    elem.style.display="flex"
                    average5=average5+Number(elem.children[3].textContent.slice(0,-2))
                }
            }
            average5=(average5/8).toFixed(0)
            document.getElementsByClassName("main__header--average")[0].textContent=average5+ "°"
        })
    })
})



