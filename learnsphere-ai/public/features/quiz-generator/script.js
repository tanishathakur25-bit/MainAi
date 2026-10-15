
const questionBank = {
  web: [
    { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "HomeText Markup Language"], answer: 0 },
    { q: "Which language styles a web page?", options: ["Python", "CSS", "SQL", "C"], answer: 1 },
    { q: "Which HTML tag creates a hyperlink?", options: ["<link>", "<url>", "<a>", "<href>"], answer: 2 },
    { q: "Which CSS property changes text color?", options: ["font-style", "text-color", "background", "color"], answer: 3 },
    { q: "Which tag links an external CSS file?", options: ["<style>", "<css>", "<link>", "<script>"], answer: 2 }
  ],
  javascript: [
    { q: "Which keyword declares a block-scoped variable that can be reassigned?", options: ["const", "let", "fixed", "static"], answer: 1 },
    { q: "Which operator checks strict equality?", options: ["=", "==", "===", "!="], answer: 2 },
    { q: "Which method adds an item to the end of an array?", options: ["push()", "pop()", "shift()", "join()"], answer: 0 },
    { q: "What does DOM stand for?", options: ["Data Object Mode", "Document Order Method", "Digital Ordinance Model", "Document Object Model"], answer: 3 },
    { q: "Which function runs code after a delay?", options: ["setDelay()", "setTimeout()", "wait()", "delayCode()"], answer: 1 }
  ],
  general: [
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Mercury"], answer: 2 },
    { q: "How many sides does a hexagon have?", options: ["Five", "Six", "Seven", "Eight"], answer: 1 },
    { q: "Which is the largest ocean on Earth?", options: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"], answer: 0 },
    { q: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Bangkok", "Tokyo"], answer: 3 },
    { q: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Helium"], answer: 1 }
  ]
};

const allQuestions = [
  ...questionBank.web,
  ...questionBank.javascript,
  ...questionBank.general
];

const intro = document.getElementById("intro");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const categorySelect = document.getElementById("category");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const retryBtn = document.getElementById("retryBtn");
const homeBtn = document.getElementById("homeBtn");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const questionCount = document.getElementById("questionCount");
const quizCategory = document.getElementById("quizCategory");
const progressFill = document.getElementById("progressFill");
const optionsContainer = document.getElementById("options");
const answeredLabel = document.getElementById("answeredLabel");

const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const resultIcon = document.getElementById("resultIcon");
const scoreValue = document.getElementById("scoreValue");
const totalValue = document.getElementById("totalValue");
const scoreFill = document.getElementById("scoreFill");
const percentageText = document.getElementById("percentageText");

let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answerLocked = false;
let selectedCategory = "all";

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function getQuestions(category) {
  if (category === "all") {
    return shuffle(allQuestions).slice(0, 5);
  }

  return shuffle(questionBank[category]).slice(0, 5);
}

function startQuiz() {
  selectedCategory = categorySelect.value;
  questions = getQuestions(selectedCategory);
  currentQuestion = 0;
  score = 0;

  intro.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  const labels = {
    all: "MIXED KNOWLEDGE",
    web: "WEB DEVELOPMENT",
    javascript: "JAVASCRIPT",
    general: "GENERAL KNOWLEDGE"
  };

  quizCategory.textContent = labels[selectedCategory];
  showQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showQuestion() {
  selectedAnswer = null;
  answerLocked = false;

  const question = questions[currentQuestion];

  questionNumber.textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;

  questionCount.textContent =
    `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

  questionText.textContent = question.q;
  progressFill.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  answeredLabel.textContent = "Choose an answer";
  nextBtn.disabled = true;
  nextBtn.innerHTML = currentQuestion === questions.length - 1
    ? 'See results <span>→</span>'
    : 'Next question <span>→</span>';

  optionsContainer.replaceChildren();

  const oldFeedback = document.getElementById("answerFeedback");
  if (oldFeedback) oldFeedback.remove();

  question.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.className = "option-text";
    text.textContent = optionText;

    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index));

    optionsContainer.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answerLocked) return;

  selectedAnswer = index;
  answerLocked = true;

  const question = questions[currentQuestion];
  const optionButtons = optionsContainer.querySelectorAll(".option");
  const isCorrect = index === question.answer;

  if (isCorrect) score++;

  optionButtons.forEach((button, i) => {
    button.disabled = true;

    if (i === question.answer) {
      button.classList.add("correct");
      button.querySelector(".option-letter").textContent = "✓";
    } else if (i === index) {
      button.classList.add("incorrect");
      button.querySelector(".option-letter").textContent = "×";
    }
  });

  const feedback = document.createElement("p");
  feedback.id = "answerFeedback";
  feedback.className = `answer-feedback ${isCorrect ? "good" : "bad"}`;
  feedback.textContent = isCorrect
    ? "Correct! Great work."
    : `Not quite. The correct answer is: ${question.options[question.answer]}`;

  optionsContainer.after(feedback);

  answeredLabel.textContent = isCorrect ? "Correct answer ✓" : "Answer reviewed";
  progressFill.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  nextBtn.disabled = false;
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  scoreValue.textContent = score;
  totalValue.textContent = total;
  percentageText.textContent = `${percentage}% correct`;

  resultTitle.textContent =
    percentage === 100 ? "Perfect score!" :
    percentage >= 60 ? "Well done!" : "Keep learning!";

  resultMessage.textContent =
    percentage === 100
      ? "Excellent work! You answered every question correctly."
      : percentage >= 60
        ? "You're making progress. Keep practising to improve."
        : "Every attempt helps you learn. Review the answers and try again.";

  resultIcon.textContent =
    percentage === 100 ? "★" : percentage >= 60 ? "✓" : "✦";

  scoreFill.style.width = `${percentage}%`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  resultScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  intro.classList.remove("hidden");
  categorySelect.value = "all";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", () => {
  if (selectedAnswer === null) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
});

retryBtn.addEventListener("click", startQuiz);
homeBtn.addEventListener("click", goHome);
