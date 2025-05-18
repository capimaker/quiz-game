# quiz-game
Objetivo:
El Quiz constará de 10 preguntas. Cada pregunta tendrá 4 opciones y sólo una de ellas será la correcta.
Podrán ser preguntas de https://opentdb.com/ o de otras APIs que busquéis.
La aplicación tendrá que ser una SPA (single-page application). Sólo una pregunta cada vez en pantalla.

Requisitos:

Manipulación dinámica del DOM.
Crear una página SPA para las preguntas.
Manejo de ES6.
Asincronía. Usar API de preguntas https://opentdb.com/
Puedes usar otra API 
Sin frameworks ni librerias externas en la medida de lo posible.
Salvo frameworks de CSS como Bootstrap.
Gestión del proyecto con Github. 
Código limpio, buenas prácticas.
Readme con explicación del proyecto.

Tecnologías Utilizadas:
* Html
* Css
* JavaScript



Instalación:

como vamos a usar Axios deberemos enlazarlo en html al final de nuestro codigo con:
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

también usaremos algo de Bootstrap con lo que deberemos asegurarnos de enlazarlo dentro del head:
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">




Instrucciones del QUIZ:

Se ha creado un quiz con el metodo SPA en el que tenemos una pantalla de inicio con un solo botón de Start.
Al pulsar el botón se muestra una pregunta y 4 posibles respuestas de las cuales, una es la correcta.
al pulsar cualquier respuesta, tanto si aciertas o fallas, se ocultan el resto de respuestas y te muestra la correcta.
Entonces aparece el botón de Next para pasar a la siguiente pregunta.
Hay 10 preguntas en total, totalmente aleatorias, cuando llegamos a la última aparecerá nuestra puntuación y un botón de reset para volver a empezar el juego.

CODIGO

