const socket=io();
let name;
let textarea=document.querySelector('#textarea');
let massageArea=document.querySelector('.massage_area')
do{
    name = prompt('please enter your name: ')
}while(!name)

textarea.addEventListener('keypress',function(event){
    if(event.key === 'Enter')
    {
        sendMassage(event.target.value)
    }
})

function sendMassage(massage){
    let msg={
        user: name, 
        massage:massage.trim()
    }
    // Append
    appendMassage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom()

    //send server
    socket.emit('massage',msg)
}
function appendMassage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type;
    mainDiv.classList.add(className,'massage')

    let markup= `
    <h4>${msg.user}</h4>
    <p>${msg.massage}</p>
    `
    mainDiv.innerHTML=markup
    massageArea.appendChild(mainDiv)
}

// Recieve massages
socket.on('massage',(msg)=>{
    //console.log(msg)
    appendMassage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom()
{
    massageArea.scrollTop=massageArea.scrollHeight
}