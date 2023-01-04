//creation de tout les boutons
function CreateButtons(){
    header__listButton.classList="header__listButton"
    header.appendChild(header__listButton)
    CreateOneButton(date)
    let date_2=new Date(date)
    date_2.setDate(date_2.getDate()+1)
    CreateOneButton(date_2)
    let date_3=new Date(date)
    date_3.setDate(date_3.getDate()+2)
    CreateOneButton(date_3)
    let date_4=new Date(date)
    date_4.setDate(date_4.getDate()+3)
    CreateOneButton(date_4)
    let date_5=new Date(date)
    date_5.setDate(date_5.getDate()+4)
    CreateOneButton(date_5)
}

//creation un bouton jour
function CreateOneButton(date){
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

//gestion average
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
