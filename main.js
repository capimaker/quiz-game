

/*const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");



 const API_URL ="https://opentdb.com/api.php?amount=10&category=9&type=multiple";
console.log(API_URL);

const quiz = async (e) =>{
e.preventDedault();
try{
  const quizz = quest.value;
  const res = await axios.get(API_URL)
  console.log(res)
  const quizzy = res.data.results;
    showQuiz(quizzy);
}catch(error){
console.log(error);
}
};

const showQuiz = (questions) => {
  questionContainer.innerHTML = "";
  quizzy.forEach((questions) => {
    questionContainer.innerHTML += `
    `;
  });
};

startButton.addEventListener("submit" quiz);
//console.log((Response.data));
*/

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
  .then(response => {
    questions = response.data.results;
    showQuestion();
  })
  .catch(error => {
    console.error("Error al cargar las preguntas:", error);
  });

function showQuestion() {
  const question = questions[currentQuestionIndex];
  const answers = [...question.incorrect_answers];
  answers.splice(Math.floor(Math.random() * 4), 0, question.correct_answer);

  document.getElementById('question').innerHTML = decodeHTMLEntities(question.question);
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerHTML = decodeHTMLEntities(answer);
    btn.addEventListener('click', () => checkAnswer(btn, decodeHTMLEntities(question.correct_answer)));
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(button, correct) {
  const buttons = document.querySelectorAll('#answers button');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerHTML === correct) {
      btn.classList.add('correct');
      if (btn === button) score++;
    } else {
      btn.classList.add('incorrect');
    }
  });
  document.getElementById('nextBtn').style.display = 'block';
}

document.getElementById('nextBtn').addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    document.getElementById('nextBtn').style.display = 'none';
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  document.getElementById('question').innerHTML = `¡Quiz terminado!<br>Tu puntuación: ${score}/10`;
  document.getElementById('answers').innerHTML = '';
  document.getElementById('nextBtn').style.display = 'none';
}

// Esta función corrige caracteres especiales (HTML entities)
function decodeHTMLEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

