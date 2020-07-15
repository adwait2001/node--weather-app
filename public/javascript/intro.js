


const weatherform =document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.getElementById('message-content1')
const messagetwo=document.getElementById('message-content2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value;
    messageone.textContent='loading...'
    messagetwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
            if (data.error) {
                messageone.textContent=data.error
            } else {
                messageone.textContent=data.location
                messagetwo.textContent=data.forecast
            }
    })
})

})