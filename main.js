
const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple"
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question')
const answersDiv = document.getElementById('answers');
const questionCounter = document.getElementById("counter");
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn')
const restartBtn = document.getElementById('restartBtn');

/* vamos a empezar creando variables donde en la primera guardaremos las 10 preguntas
en la segunda variable le diremos que empezamos desde la posición 0
y en la tercera nos va a llevar la cuenta de los aciertos o errores*/
let questions = [];
let currentQuestionIndex = 0;
let score = 0;


startBtn.addEventListener('click', async () => {
  startScreen.classList.add('hide');         // Ocultamos el botón de inicio
  quizContainer.classList.remove('hide');
  await loadQuestions()      // Mostramos el quiz
  showQuestion();                              // Empezamos el quiz
});


/* aquí llamamos a la API y le decimos que then si la respuesta es correcta response.data.results es donde estan las preguntas
y las guarda en question. luego llamaremos a showQuestion para mostrar la primera pregunta. si hay un error pasaremos al catch*/ 
 
const loadQuestions = async () =>{
  try{
const res = await axios.get(API_URL);
questions = res.data.results;
currentQuestionIndex = 0;
score = 0;
  } catch(error){
    console.error(error);
  }
};

/*hacemos la funcion de showQuestion y obtenemos la pregunta actual, por ejemplo, la pregunta 1 si currentQuestionIndex es 0.*/ 
const showQuestion = () => {
  const quest = questions[currentQuestionIndex]; 
   const answers = [...quest.incorrect_answers, quest.correct_answer];
  answers.sort(() => Math.random() - 0.5); // Mezclamos aleatoriamente las respuestas

  questionEl.innerHTML = decodeHTMLEntities(quest.question);
  answersDiv.innerHTML = '';

  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerHTML = decodeHTMLEntities(answer);
    btn.addEventListener('click', () => checkAnswer(btn, decodeHTMLEntities(quest.correct_answer)));
    answersDiv.appendChild(btn);

    // Esta parte es para mostrar el contador de la pregunta
  questionCounter.innerText = `${currentQuestionIndex + 1}/ ${questions.length}`;
questionCounter.style.display = 'block';
  });
}
// Aquí voy a verificar la respuesta del jugador
const checkAnswer = (button, correctAnswer) => {
  const buttons = document.querySelectorAll('#answers button');
  

  buttons.forEach(btn => {
    btn.disabled = true;
    const btnText = decodeHTMLEntities(btn.innerHTML); // esto es clave

    if (btnText === correctAnswer) {
      btn.classList.add('correct');
      if (btn === button) score++;
    } else {
      btn.classList.add('incorrect');
    }
  });

  nextBtn.style.display = 'block';
};


nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextBtn.style.display = 'none';
  } else {
    showFinalScore();
  }
});

const showFinalScore = () => {
  questionEl.innerHTML = `Quiz Finished!<br>Your Score: ${score}/10`;
  answersDiv.innerHTML = '';
  nextBtn.style.display ='none';
  restartBtn.classList.remove('hide');
  questionCounter.style.display = 'none';
};
     
  
restartBtn.addEventListener('click', async () => {
restartBtn.classList.add('hide');
quizContainer.classList.remove('hide');     
  startScreen.classList.add('hide');  
  await loadQuestions();       
  showQuestion();                              
});


/* Esta función corrige caracteres especiales de los HTML entities
 La API devuelve cosas como "What is &quot;HTML&quot;" en vez de "What is "HTML"".
Esta función convierte esos caracteres especiales en texto normal usando un <textarea> oculto.*/
const decodeHTMLEntities = (text) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
};

