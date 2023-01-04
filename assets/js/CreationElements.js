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