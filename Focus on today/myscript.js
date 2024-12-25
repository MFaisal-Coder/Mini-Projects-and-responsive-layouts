const checkIcon = document.querySelectorAll('.circle-checklist')
const inputField = document.querySelectorAll('.input-field')
const warningMsg = document.querySelector('.warning-message')
const loadingBar = document.querySelector('.bar-loading')
const quotes = document.querySelector('.goal-completion')

// Creation of object for storage
const allTasks = JSON.parse(localStorage.getItem('allTasks')) || {}

// Motivational quotes
const allQuotes = [
    'Raise the bar by completing your daily goals',
    'Beginning is half done :)',
    'You are unstoppable!',
    'Almost there! You must be wonderful!',
    'Just one more to go!',
    'Woo-hoo! You did, you deserve a break now solider :D'
]

// Pasted these things above so that when our page refreshes it stays
let checkedTasks = Object.values(allTasks).filter((tickedTask) => tickedTask.completed).length
loadingBar.firstElementChild.innerText = `${checkedTasks}/${inputField.length} completed`
loadingBar.style.width = `${checkedTasks/inputField.length * 100}%`
quotes.innerText = allQuotes[checkedTasks]

// Logic for click events
checkIcon.forEach((checkList) => {
    // console.log(checkList)

    const inputID = checkList.nextElementSibling.id
    // console.log(inputID)

    checkList.addEventListener('click', (evt) => {
        const inputValues = [...inputField].every((elem) => {
            return elem.value
        })

        if (inputValues) {
            checkList.parentElement.classList.toggle('completed')
            allTasks[inputID].completed = !allTasks[inputID].completed
            localStorage.setItem('allTasks', JSON.stringify(allTasks))
            checkedTasks = Object.values(allTasks).filter((tickedTask) => tickedTask.completed).length
            // Comment for progress
            loadingBar.firstElementChild.innerText = `${checkedTasks}/${inputField.length} completed`
            //  Loading bar width
            loadingBar.style.width = `${checkedTasks/inputField.length * 100}%`
            // Quotes display
            quotes.innerText = allQuotes[checkedTasks]
        }
        else {
            warningMsg.style.display = 'block'
        }
    })
})

// Logic for input events
inputField.forEach((input) => {

    // to display the values of our task
    /*  input.value = allTasks[input.id].task */
    // console.dir(input)

    if (allTasks[input.id]) {
        input.value = allTasks[input.id].task

        if(allTasks[input.id].completed){
            input.parentElement.classList.add('completed')
        }
    }


    // To remove the error message upon keypress
    input.addEventListener('keydown', (e) => {
        warningMsg.style.display = 'none'
    })

    // To create an object for storing our values/data
    input.addEventListener('input', (e) => {

        if (allTasks[input.id] && allTasks[input.id].completed) {
            input.value = allTasks[input.id].task
            return
        }

        // console.log(e.target.id)
        allTasks[e.target.id] = {
            task: e.target.value,
            completed: false,
        }
        // console.log(allTasks)


        localStorage.setItem('allTasks', JSON.stringify(allTasks))

    })

})
