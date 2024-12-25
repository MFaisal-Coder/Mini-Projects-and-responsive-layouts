const closeIcon = document.querySelector('.closeIcon')
const button = document.querySelector('button')
const mainContainer = document.querySelector('.main-container')
const card = document.querySelector('.card')


button.addEventListener('click',(e)=>{
    e.stopPropagation()
    mainContainer.classList.add('open')
})

card.addEventListener('click',(e)=>{
    e.stopPropagation()
})

closeIcon.addEventListener('click',()=>{
    mainContainer.classList.remove('open')
})

mainContainer.addEventListener('click',()=>{
    mainContainer.classList.remove('open')
})

