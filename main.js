
const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';         // Ocultamos el botón de inicio
  quizContainer.style.display = 'block';      // Mostramos el quiz
  showQuestion();                              // Empezamos el quiz
});




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
     
  })
  .catch(error => {
    console.error(error);
  });
/*hacemos la funcion de showQuestion y obtenemos la pregunta actual, por ejemplo, la pregunta 1 si currentQuestionIndex es 0.*/ 
function showQuestion() {
  const quest = questions[currentQuestionIndex]; 
  const answers = [...quest.incorrect_answers];// aquí hacemos un array con la copia de las respuestas incorrectas
  answers.splice(Math.floor(Math.random() * 4), 0, quest.correct_answer); // aquí lo separamos y le decimos hey meteme la respuesta dentro de 4 posibles de manera random 

  document.getElementById('question').innerHTML = decodeHTMLEntities(quest.question);
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerHTML = decodeHTMLEntities(answer);
    btn.addEventListener('click', () => checkAnswer(btn, decodeHTMLEntities(quest.correct_answer)));
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(button, correct) {
  const buttons = document.querySelectorAll('#answers button');
  buttons.forEach(btn => {
    btn.disabled = true;
      if (btn.innerHTML === correct) { //Compara el texto del botón con la respuesta correcta y i es igual, le añade una clase CSS llamada correct
        btn.classList.add('correct');
        if (btn === button) score++; // Si el botón que se ha pulsado era el correcto, sube el marcador
    } else {
      btn.classList.add('incorrect'); // sino es correcto se le pone la clase incorrect que desde css lo hemos puesto en rojo
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

/* Esta función corrige caracteres especiales de los HTML entities
 La API devuelve cosas como "What is &quot;HTML&quot;" en vez de "What is "HTML"".
Esta función convierte esos caracteres especiales en texto normal usando un <textarea> oculto.*/
function decodeHTMLEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

