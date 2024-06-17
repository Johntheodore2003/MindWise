// Define questions and answers
const questions = [
    {
        question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
        answers: ["Rarely or none of the time", "Some of the time", "Often", "All of the time"]
    },
    {
        question: "How often have you experienced little interest or pleasure in doing things?",
        answers: ["Rarely or none of the time", "Some of the time", "Often", "All of the time"]
    },
    {
        question: "In the last two weeks, how often have you felt nervous, anxious, or on edge?",
        answers: ["Rarely or none of the time", "Some of the time", "Often", "All of the time"]
    },
    {
        question: "How often have you had trouble relaxing or feeling easily annoyed or irritable?",
        answers: ["Rarely or none of the time", "Some of the time", "Often", "All of the time"]
    },
    {
        question: "Over the past two weeks, how often have you felt that you were a failure or let yourself or your family down?",
        answers: ["Rarely or none of the time", "Some of the time", "Often", "All of the time"]
    }
];

let currentQuestion = 0;


// Function to display current question and answer options
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const answerBtnsElement = document.getElementById("answer-btns");
    questionElement.textContent = currentQuestion+1 + ". " + questions[currentQuestion].question;

    // Clear previous answer buttons
    answerBtnsElement.innerHTML = "";

    // Create new answer buttons
    questions[currentQuestion].answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = answer;
        button.setAttribute("onclick", `selectAnswer(${index})`);
        answerBtnsElement.appendChild(button);
    });
}

// Initialize userAnswers array with default values
let userAnswers = Array(questions.length).fill(-1);

// Function to handle user's answer selection
function selectAnswer(answerIndex) {
    userAnswers[currentQuestion] = answerIndex;
    // Get all answer buttons
    const answerButtons = document.querySelectorAll(".btn");
    // Reset background color and text color of all buttons
    answerButtons.forEach(button => {
        button.style.backgroundColor = "";
        button.style.color = "";
    });
    // Set background color of selected button to black
    answerButtons[answerIndex].style.backgroundColor = "black";
    answerButtons[answerIndex].style.color = "white";
}

// Function to display score and tips
function displayResult(totalScore, tips) {
    // Remove the survey section
    document.querySelector('.survey').remove();
    // Create elements to display results
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    const scoreElement = document.createElement("p");
    scoreElement.textContent = "Total Score: " + totalScore;
    const tipsElement = document.createElement("p");
    tipsElement.textContent = "Tips: " + tips;
    // Append elements to result container
    resultContainer.appendChild(scoreElement);
    resultContainer.appendChild(tipsElement);
    // Append result container to main section
    document.querySelector('.main').appendChild(resultContainer);
}

// Function to calculate the total score based on user's answers
function calculateScore(answers) {
    let score = 0;
    answers.forEach(answer => {
        if (answer !== -1) {
            switch (answer) {
                case 0:
                    score += 0;
                    break;
                case 1:
                    score += 1;
                    break;
                case 2:
                    score += 2;
                    break;
                case 3:
                    score += 3;
                    break;
                default:
                    console.log("Invalid answer choice.");
            }
        }
    });
    return score;
}


function provideTips(totalScore) {
    let tips = "";
    if (totalScore >= 0 && totalScore <= 4) {
        tips = ["Practice mindfulness", "Engage in physical activity","Maintain a healthy lifestyle"];
    } else if (totalScore >= 5 && totalScore <= 9) {
        tips = ["Talk to a trusted friend","Practice relaxation techniques", "Prioritize self-care activities"];
    } else if (totalScore >= 10 && totalScore <= 14) {
        tips = ["Seek support from a mental health professional", "Create a structured routine", "Practice self-compassion."];
    } else if (totalScore >= 15 && totalScore <= 19) {
        tips = ["Reach out to a crisis helpline", "Consider medication management", "Engage in therapeutic activities."];
    } else if (totalScore >= 20 && totalScore <= 27) {
        tips = ["Urgently seek professional help", "Develop a safety plan", "Involve trusted individuals in your support network."];
    } else {
        tips = "Invalid score.";
    }
    return tips;
}

// Function to handle user's answer selection
function selectAnswer(answerIndex) {
    userAnswers[currentQuestion] = answerIndex;
    // Get all answer buttons
    const answerButtons = document.querySelectorAll(".btn");
    // Reset background color and text color of all buttons
    answerButtons.forEach(button => {
        button.style.backgroundColor = "";
        button.style.color = "";
    });
    // Set background color of selected button to black
    answerButtons[answerIndex].style.backgroundColor = "black";
    answerButtons[answerIndex].style.color = "white";
}


// Function to display score and time upon completing the survey
// Function to move to the next question or display results
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        // Survey completed, calculate score and display tips
        const totalScore = calculateScore(userAnswers);
        const tips = provideTips(totalScore);
        console.log("Total Score:", totalScore);
        console.log("Tips:", tips);
        // Display total score and tips on the page
        displayResult(totalScore, tips);
    }
}

// Function to display score and tips
function displayResult(totalScore, tips) {
    // Remove the survey section
    document.querySelector('.survey').remove();
    // Create elements to display results
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    const scoreElement = document.createElement("p");
    scoreElement.innerHTML = "<strong>Total Score: </strong>" + totalScore;

    const tipsElement = document.createElement("ul");
    tipsElement.innerHTML = "<strong>Tips:</strong>";
    tips.forEach(tip => {
        const tipItem = document.createElement("li");
        tipItem.textContent = tip.trim();
        tipsElement.appendChild(tipItem);
    });

    // Append elements to result container
    resultContainer.appendChild(scoreElement);
    resultContainer.appendChild(tipsElement);
    // Append result container to main section
    document.querySelector('.main').appendChild(resultContainer);
}


// Display the first question when the page loads
displayQuestion();
