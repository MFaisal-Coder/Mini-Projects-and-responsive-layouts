// Initialize variables and DOM elements
const buttonQuiz = document.querySelector('.start-quiz-button');
const mainBody = document.querySelector('.main-body');
const sound = document.querySelector('.sound-section');
const questionValue = document.querySelector('.question');
const choiceBoxes = document.querySelectorAll('.choice-box');
const next = document.querySelector('.next-question');
const questionRemaining = document.querySelector('.questions-remaining');
const tryAgain = document.querySelector('.try-again');
const scoreCard = document.querySelector('.score-card');
const progressBar = document.querySelector('.progress-bar');
const scoreInfo = document.querySelector('.score-info');
const timer = document.querySelector('.timer');
const timerBox = document.querySelector('.timer-box');
const timeOut = document.querySelector('.time-up-box')
const quizSection = document.querySelector('.quiz-section')
const yesOption = document.querySelector('.Yes')
const noOption = document.querySelector('.No')
const soundSection = document.querySelector('.sound-section')
const correctSound = document.getElementById('correctSound');
const errorSound = document.getElementById('errorSound');
const quotes = document.querySelector('.quotes')

const quizData = JSON.parse(localStorage.getItem('quizData')) || {
    "1": {
        question: "What is the capital of India?",
        answer1: { data: "Delhi", isCorrect: true },
        answer2: { data: "New York", isCorrect: false },
        answer3: { data: "Tokyo", isCorrect: false },
        answer4: { data: "Riyadh", isCorrect: false },
    },
    "2": {
        question: "What color is the flag of China?",
        answer1: { data: "White", isCorrect: false },
        answer2: { data: "Blue", isCorrect: false },
        answer3: { data: "Red", isCorrect: true },
        answer4: { data: "Green", isCorrect: false },
    },
    "3": {
        question: "What do Web Devs do?",
        answer1: { data: "Cook food", isCorrect: false },
        answer2: { data: "Build Websites", isCorrect: true },
        answer3: { data: "Sing", isCorrect: false },
        answer4: { data: "Dance", isCorrect: false },
    },
    "4": {
        question: "Who is the king of the Jungle?",
        answer1: { data: "Kangaroo", isCorrect: false },
        answer2: { data: "Bat", isCorrect: false },
        answer3: { data: "Lion", isCorrect: true },
        answer4: { data: "Panther", isCorrect: false },
    },
    "5": {
        question: "What sports does Ronaldo play?",
        answer1: { data: "Cricket", isCorrect: false },
        answer2: { data: "Football", isCorrect: true },
        answer3: { data: "Swimming", isCorrect: false },
        answer4: { data: "Basketball", isCorrect: false },
    },
};


let questionNumber = parseInt(localStorage.getItem('questionNumber')) || 1;
let correctAnswer = parseInt(localStorage.getItem('correctAnswer')) || 0;
let wrongAnswer = parseInt(localStorage.getItem('wrongAnswer')) || 0;
localStorage.setItem('quizData', JSON.stringify(quizData))

const ObjectLength = Object.keys(quizData).length;
let timerInterval;


sound.addEventListener('click', (e) => {
    sound.classList.toggle('sound-off')
})


// Helper function: Start the timer
function timerCounter(timing) {
    clearInterval(timerInterval); // Clear any previous timer
    timer.innerText = timing; // Reset timer display
    timerBox.style.backgroundColor = 'rgba(2, 164, 9, 0.63)';

    const backgroundChanger = document.querySelector('.quiz-section')
    backgroundChanger.style.backgroundColor = 'rgba(204, 226, 194, 1)';

    timerInterval = setInterval(() => {
        timing--;
        timer.innerText = timing < 10 ? `0${timing}` : timing;

        if (timing === 15) {
            backgroundChanger.style.backgroundColor = 'rgba(212, 214, 159, 1)';
            timerBox.style.backgroundColor = 'rgba(197, 177, 0, 1)';
        } else if (timing <= 5) {
            backgroundChanger.style.backgroundColor = 'rgba(219, 173, 173, 1)';
            timerBox.style.backgroundColor = 'rgba(197, 12, 0, 1)';
        }
    
        if (timing == 0) {
            next.click()
        }

        if(timing<0) {
            timing = 0;
            timer.innerText = "00"
        }

    }, 1000);
}

function showPopUp() {
    if (questionNumber > ObjectLength) {
        clearInterval(timerInterval)
        return
    }
    else {
        timeOut.classList.add('show')
        quizSection.classList.add('blurry')

        yesOption.addEventListener('click', () => {
            displayQuestion(questionNumber);
            timerCounter(30);

            timeOut.classList.remove('show')
            quizSection.classList.remove('blurry')
        })
        noOption.addEventListener('click', () => {
            location.reload()
            mainBody.classList.remove('quiz-started');
            localStorage.clear()
        })
    }
    return
}

// Helper function: Display question and reset state
function displayQuestion(questionNum) {
    const currentQuestion = quizData[questionNum];

    // Update question text
    questionValue.innerText = currentQuestion.question;

    // Update choices dynamically
    choiceBoxes.forEach((box, index) => {
        const answerKey = `answer${index + 1}`;
        const choiceData = currentQuestion[answerKey];

        // Reset styles and populate choice text
        box.className = 'choice-box';
        box.querySelector('.choice').innerText = choiceData.data;
        box.querySelector('.correct-choice').style.display = 'none';
        box.querySelector('.wrong-choice').style.display = 'none';

        // Attach event listener
        box.onclick = () => handleChoiceSelection(box, choiceData);
    });

    // Reset answered state
    const parentAnswerSection = document.querySelector('.answer-section');
    parentAnswerSection.classList.remove('answered');

    // Update question counter
    questionRemaining.innerText = `${questionNum}/${ObjectLength}`;
}

// Helper function: Handle choice selection
function handleChoiceSelection(selectedBox, choiceData) {
    const parentAnswerSection = selectedBox.closest('.answer-section');
    if (parentAnswerSection.classList.contains('answered')) return;

    parentAnswerSection.classList.add('answered');

    if (choiceData.isCorrect) {
        selectedBox.classList.add('highlight-correct');
        selectedBox.querySelector('.correct-choice').style.display = 'flex';
        correctAnswer++;
        localStorage.setItem('correctAnswer', correctAnswer);


        if (!soundSection.classList.contains('sound-off')) {
            correctSound.currentTime = 0.1; // Reset to from where thes sound begins in original track
            correctSound.play();
        }
        else {
            return
        }
    } else {
        selectedBox.classList.add('highlight-wrong');
        selectedBox.querySelector('.wrong-choice').style.display = 'flex';

        // Highlight the correct answer
        choiceBoxes.forEach((box, index) => {
            const answerKey = `answer${index + 1}`;
            const boxData = quizData[questionNumber][answerKey];
            if (boxData.isCorrect) {
                box.classList.add('highlight-correct');
                box.querySelector('.correct-choice').style.display = 'flex';
            }
        });

        wrongAnswer++;
        localStorage.setItem('wrongAnswer', wrongAnswer);

        if (!soundSection.classList.contains('sound-off')) {
            errorSound.currentTime = 0.5; // Reset to from where thes sound begins in original track
            errorSound.play();
        }
        else {
            return
        }
    }
}

// Event: Start quiz
buttonQuiz.addEventListener('click', () => {
    mainBody.classList.add('quiz-started');
    displayQuestion(questionNumber);
    timerCounter(30);
});

// Event: Next question
next.addEventListener('click', () => {
    questionNumber++;

    if(questionNumber === ObjectLength) next.innerText = 'Submit';
    
    if (questionNumber > ObjectLength) {
        // End quiz and show results
        let widthBar = `${(correctAnswer / ObjectLength) * 100}`;
        progressBar.style.width = `${widthBar}%`;
        progressBar.innerText = `${widthBar}%`;
        scoreInfo.innerText = `Your score is ${widthBar}%`;
        

        if(widthBar==100){
            quotes.innerText = "Woohoo! You are a champ!"
        }
        else if(widthBar==80){
            quotes.innerText = "Well Done! You did a great job!"
        }
        else if(widthBar==60){
            quotes.innerText = "You can do better!"
        }
        else if(widthBar==40){
            quotes.innerText = "Try again friend, Believe in yourself!"
        }
        else if(widthBar==20){
            quotes.innerText = "A soldier never gives up :D"
        }
        else{
            quotes.innerText = "Never lose hope! There's always a brighter day!"
        }

        scoreCard.classList.add('show');
        quizSection.classList.add('blurry')
        localStorage.removeItem('questionNumber');
        clearInterval(timerInterval)
    }
    else {
        localStorage.setItem('questionNumber', questionNumber);
        displayQuestion(questionNumber);
        timerCounter(30);
    }

});

// Event: Try again
tryAgain.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

// Initial Setup



