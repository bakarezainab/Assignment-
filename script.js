const questions = [
  {
    question: "Who is the founder of Web3bridge?",
    answers: [
      { "text": "Mr. Ayodeji Awosika", "correct": true },
        { "text": "Mr. Micheal", "correct": false },
        { "text": "Mr. Laide", "correct": false },
        { "text": "Mrs. Sule", "correct": false },
    ],
  },
  {
    question: "Which continent is Nigeria?",
    answers: [
      { "text": "Asia", "correct": false },
        { "text": "Africa", "correct": true },
        { "text": "North America", "correct": false },
        { "text": "South America", "correct": false },
    ],
  },
  {
    question: "What is a verb?",
    answers: [
      { "text": "A noun", "correct": false },
        { "text": "An action word", "correct": true },
        { "text": "Adverb", "correct": false },
        { "text": "All of the above", "correct": false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add("hide");
  scoreContainer.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct) {
      button.classList.add("correct");
    }
  });

  nextButton.classList.remove("hide");
}

function showScore() {
  scoreContainer.classList.remove("hide");
  finalScoreElement.textContent = `You scored ${score} out of ${questions.length}!`;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  nextQuestion();
});

restartButton.addEventListener("click", () => {
  startGame();
});

startGame();
