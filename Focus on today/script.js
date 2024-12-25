const inputField = document.querySelectorAll('.input-field')
const checkList = document.querySelectorAll('.circle-checklist')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.bar-loading')
const topComment = document.querySelector('.top-section')
// const clickButton = document.querySelector('.add-task')
// const listSection = document.querySelector('.list-section')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'You are almost there',
    'You really are dedicated!!',
    'Half way through! You must be wonderful!',
    'Just one more to go!!',
    'Woohoooo! You are all done! Time to rest :D'
]

/* const IDs = ['fourth', 'fifth']
let i = 0; */

let NumberOfInputs = [...inputField].length
// This is how our object would look like when we store it on localstorage, where first,second and third are IDs of input elements and each of those have our tasks and completd or not flag
/* const allGoals = {
    first:{
        task: 'Learn JS',
        completed: false // this would be a flag to see if tasks are completed or not
    },
    second:{
        task: 'Practice JS',
        completed: false // this would be a flag to see if tasks are completed or not
    },
    third:{
        task: 'Revise concepts of Web Dev',
        completed: false // this would be a flag to see if tasks are completed or not
    },
}
 */

//Method 1 to setup storage; Easy one
// const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
//     first: {
//         task: '',
//         completed: false
//     },
//     second: {
//         task: '',
//         completed: false
//     },
//     third: {
//         task: '',
//         completed: false
//     },
// }

//Method 2 to setup storage; with debugging and robust (a little hard one yet the best)

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}


let checkedTask = Object.values(allGoals).filter((taskCompleted) => taskCompleted.completed).length
progressValue.style.width = `${checkedTask / NumberOfInputs * 100}%`
progressValue.firstElementChild.innerText = `${checkedTask}/ ${NumberOfInputs} Completed`
topComment.nextElementSibling.innerText = allQuotes[checkedTask]


/* 
clickButton.addEventListener('click', (e) => {
    console.log('Button clicked')
    const div1 = document.createElement('div')
    div1.classList.add('goal-lists')

    const div2 = document.createElement('div')
    div2.classList.add('circle-checklist')

    const image = document.createElement('img')
    image.src = "/images/Tick-mark.svg"
    image.alt = 'Checked'

    const input = document.createElement('input')
    input.type = 'text'
    input.classList.add('input-field')
    input.placeholder = 'Add new goal'
    input.id = IDs[i++]
    console.log(i)

    div2.append(image)
    div1.append(div2, input)

    listSection.append(div1)

   
}) */


checkList.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {

        const valuesFilled = [...inputField].every((input) => {
            return input.value
        })
        if (valuesFilled) {
            checkbox.parentElement.classList.toggle('completed')

            const inputID = checkbox.nextElementSibling.id
            allGoals[inputID].completed = !allGoals[inputID].completed
            localStorage.setItem('allGoals', JSON.stringify(allGoals))

            // progressValue design logic below
            checkedTask = Object.values(allGoals).filter((taskCompleted) => taskCompleted.completed).length
            progressValue.style.width = `${checkedTask / NumberOfInputs * 100}%`
            progressValue.firstElementChild.innerText = `${checkedTask}/ ${NumberOfInputs} Completed`

            topComment.nextElementSibling.innerText = allQuotes[checkedTask]
        }
        else {
            progressBar.classList.add('show-error')
        }
    })

})

inputField.forEach((input) => {

    if (allGoals[input.id]) {
        input.value = allGoals[input.id].task

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        // /* console.log(e.target.id) OR console.log(input.id) */ Both works the same shows ID of the target input element

        // If user tries to update the task while it is checked, it shouldnt allow it to. That is what's writen below
        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].task
            return
        }

        // Taking user input and storing as object below
        allGoals[input.id] = {
            task: e.target.value,
            completed: false
        }  //or allGoals[input.id] = input.value .... (input === e.target)


        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })

})
