const header = document.querySelector('.header')
const hamIcon = document.querySelector('.hamburger-icon')
const closeMenuIcon = document.querySelector('.closeMenuIcon')
const navbar = document.querySelector('.navbar')

hamIcon.addEventListener('click',(evt)=>{
    // console.log('ham Icon clicked')
    evt.stopPropagation()
    header.classList.add('menu-on')
})

closeMenuIcon.addEventListener('click',(evt)=>{
    // console.log('ham Icon clicked')
    evt.stopPropagation()
    header.classList.remove('menu-on')
})

navbar.addEventListener('click',(evt)=>{
    evt.stopPropagation()
})

window.addEventListener('click',(evt)=>{
    header.classList.remove('menu-on')
})