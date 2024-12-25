// Variables declaration
const buttonQuiz = document.querySelector('.start-quiz-button')
const mainBody = document.querySelector('.main-body')
const sound = document.querySelector('.sound-section')
const questionValue = document.querySelector('.question')
const choiceBox = document.querySelectorAll('.choice-box')
const displayFinalChoice = document.querySelectorAll('.final-message')
const optionSelected = document.querySelectorAll('.selected-option')
const correctChoice = document.querySelectorAll('.correct-choice')
const wrongChoice = document.querySelectorAll('.wrong-choice')
const message = document.querySelector('.message')
const next = document.querySelector('.next-question')


// Data Storage in local storage
// let questionNumber = localStorage.getItem('questionNumber') || 1
let questionNumber =  1
const quizData = JSON.parse(localStorage.getItem('quizData')) || {
    "1": {
        question: "What is your name?",
        answer1: {
            data: "Faisal",
            isCorrect: true,
        },
        answer2: {
            data: "John",
            isCorrect: false,
        },
        answer3: {
            data: "Chris",
            isCorrect: false,
        },
        answer4: {
            data: "Adam",
            isCorrect: false,
        },
    },
    "2": {
        question: "What pet do you have?",
        answer1: {
            data: "Dog",
            isCorrect: false,
        },
        answer2: {
            data: "Horse",
            isCorrect: false,
        },
        answer3: {
            data: "Cat",
            isCorrect: true,
        },
        answer4: {
            data: "Hamster",
            isCorrect: false,
        },
    }
}

localStorage.setItem('quizData', JSON.stringify(quizData))
localStorage.setItem('questionNumber', questionNumber)


// Event Listeners and functions
buttonQuiz.addEventListener('click', (e) => {
    mainBody.classList.add('quiz-started')
})

sound.addEventListener('click', (e) => {
    sound.classList.toggle('sound-off')
})


const choiceSelection = [...optionSelected]
const correctOption = [...correctChoice]
const wrongOption = [...wrongChoice]

function quizSection(questionNum){
    // Fetching questions from local storage
    questionValue.innerText = quizData[questionNum].question

    // fetching answers from local stoarge
    choiceBox.forEach((choice) => {
        // saving unique IDs in a variable to access answers from storage
        let choiceId = choice.id
        choice.innerText = quizData[questionNum][choiceId].data

        let correctAnswer = quizData[questionNum][choiceId].isCorrect
        // console.log(correctAnswer)

        choice.addEventListener('click',(evt)=>{
            // console.log(choice.id)

            const parentAnswerSection = choice.closest('.answer-section');
        // console.log(parentAnswerSection)
        if (parentAnswerSection.classList.contains('answered')) return; // Stop if already answered

        parentAnswerSection.classList.add('answered'); // Mark as answered

            if(correctAnswer){
                evt.target.classList.add('highlight-correct')
            }
            else{
                evt.target.classList.add('highlight-wrong')
            }

            choiceBox.forEach((elem)=>{
                let elementID = elem.id
                let correctAns = quizData[questionNum][elementID].isCorrect

                if(correctAns){
                    elem.classList.add('highlight-correct')
                    elem.classList.add('selected')
                    // correctChoice.style.display = 'flex'
                    // elem.classList.add('selected-option','correct-choice')
                }
            })

        })
})
}


next.addEventListener('click', () => {
    ++questionNumber; // Increment question number
    localStorage.setItem('questionNumber', questionNumber); // Update storage

    if (quizData[questionNumber]) {
        quizSection(questionNumber); // Show next question
    } 
    else 
    {
     alert(`Your score is ${correctAnswer}/${ObjectLength}`);
    localStorage.removeItem('questionNumber'); // Reset question counter
    }
});

quizSection(questionNumber)

// next.addEventListener('click', () => {
//     ++questionNumber; // Increment question number
//     localStorage.setItem('questionNumber', questionNumber); // Update storage
//     questionRemaining.innerText = `${questionNumber}` + "/" + `${ObjectLength}`
//     if (questionNumber > ObjectLength) {
//         questionRemaining.innerText = `${ObjectLength}` + "/" + `${ObjectLength}`
//     }
//     // Check if there's another question, otherwise end the quiz
//     if (quizData[questionNumber]) {
//         displayQuestion(questionNumber); // Show next question
//     } else {
//         // alert(`Your score is ${correctAnswer}/${ObjectLength}`);
//         let widthBar = `${correctAnswer / ObjectLength * 100}%`
//         progressBar.style.width = widthBar
//         progressBar.innerText = widthBar
//         scoreInfo.innerText = `Your score is ${widthBar}`
//         scoreCard.classList.add('show')
//         const quizBackground = document.querySelector('.quiz-section')
//         quizBackground.classList.add('blurry')
//         localStorage.removeItem('questionNumber'); // Reset question counter
//     }

//     timerCounter(60);
// });

// choiceBox.forEach((choice) => {
//     const idData = choice.id
//     choice.firstElementChild.innerText = quizData[2][idData].data
//     questionValue.innerText = quizData[2].question
//     // console.dir(choice.firstElementChild)

//     choice.addEventListener('click', (e) => {

//         choice.classList.add('clicked')
//         const divElem = e.target.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling
//         if (e.target.firstElementChild.innerText == quizData[2][idData].data && quizData[2][idData].isCorrect) {    
//             divElem.classList.add('selected')
//             return
//         }
//         else {
//             divElem.firstElementChild.style.display = 'flex'
//             divElem.previousElementSibling.style.display = 'flex'
//             return
//         }

//    /*      if (!e.currentTarget.classList.contains('clicked')) {
//             e.currentTarget.classList.add('clicked');
    
//             const divElem = e.currentTarget.querySelector('.selected-option'); // Use a more targeted selector
//             if (e.currentTarget.firstElementChild.innerText == quizData[2][idData].data && quizData[2][idData].isCorrect) {
//                 divElem.classList.add('selected');
//             } else {
//                 divElem.firstElementChild.style.display = 'flex';
//                 divElem.previousElementSibling.style.display = 'flex';
//             }
//         } */


//     },{once:true})
// })