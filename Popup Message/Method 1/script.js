const closeIcon = document.querySelector('.closeIcon')
const button = document.querySelector('button')
const mainContainer = document.querySelector('.main-container')
const overlay = document.querySelector('.overlay')


button.addEventListener('click',()=>{
    mainContainer.classList.add('open')
})

closeIcon.addEventListener('click',()=>{
    mainContainer.classList.remove('open')
})

overlay.addEventListener('click',()=>{
    mainContainer.classList.remove('open')
})

