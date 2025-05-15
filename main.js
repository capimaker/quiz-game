
/* vamos a empezar creando variables donde en la primera guardaremos las 10 preguntas
en la segunda variable le diremos que empezamos desde la posición 0
y en la tercera nos va a llevar la cuenta de los aciertos o errores*/
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

/* aquí llamamos a la API y le decimos que then si la respuesta es correcta response.data.results es donde estan las preguntas
y las guarda en question. luego llamaremos a showQuestion para mostrar la primera pregunta. si hay un error pasaremos al catch*/ 
axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
  .then(response => {
    questions = response.data.results;
     showQuestion();
  })
  .catch(error => {
    console.error(error);
  });
/*obtenemos la pregunta actual, por ejemplo, la pregunta 1 si currentQuestionIndex es 0.*/ 
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
  document.getElementById('question').innerHTML = `Quiz Finished!<br>Your Score: ${score}/10`;
  document.getElementById('answers').innerHTML = '';
  document.getElementById('nextBtn').style.display = 'none';
}

// Esta función corrige caracteres especiales (HTML entities)
function decodeHTMLEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

