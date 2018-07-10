
let score = 0;
let questionNumber = 0;

function questionStart(){
  $('.questionNumber').text(`${questionNumber}/${STORE.length}`);

}

//The role of this function is to generate each question. Once the final question has been answered, results will be shown along with an option for them to restart the quiz

function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form id = "js-form-questions">
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button id ="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    generateQuizResultPage();
    restartQuiz();
    $('.questionNumber').text(STORE.length);
    $('questionAnswerForm').css('display', 'none'); 

  }
}

//This starts the game
function startGame() {
  console.log(questionNumber);
  $('.quizArea').on('click', '.js-start-button', function(event) {
    $('.quizArea').css('display','none');
    showQuestions();
    $('.questionNumber').text(`${questionNumber+1}/${STORE.length}`);
    console.log('handleStartEvent ran'); 
  });
}

//This displays the question - inserts it into html 
  function showQuestions(){
    $('.questionAnswerForm').html(generateQuestion());
    console.log('showQuestions ran');
  }

//This updates the score value
function updateScore(){
  score++;
  $('.score').text(score);
}

//This updates the question number
function updateQuestion(){
  questionNumber++;
  $('.questionNumber').text(`${questionNumber+1}/${STORE.length}`);
}

//This checks the question. Depending on if it's correct or not, a different message will appear

  function checkQuestion() {
    $('.js-question-page').on('submit', '#js-form-questions', function(event){
      event.preventDefault();
      let userChecked = $('input:checked');
      let userAnswer = userChecked.val();
      let masterCorrect = `${STORE[questionNumber].correctAnswer}`;
      let correctAnswer = userAnswer === masterCorrect
      if (correctAnswer) {
           updateScore();
           updateCorrectAnswer();
          } 
      if (!correctAnswer) {
           incorrectAnswer();
          }
      $('.js-question-page').css('display', 'none');
      $('.js-answer-pages').css('display', 'block');
    });
  }

//If the question is incorrect, the user will see this

function incorrectAnswer(){
  $('.js-answer-pages').html(`<img src = "https://cdn2.iconfinder.com/data/icons/basketball-player/332/basketball-player-009-512.png" alt = "Answer Blocked" </img>
  <h1>Wrong Answer!</h1>
  <p>The correct answer is ${STORE[questionNumber].correctAnswer}.</p>
  <button class="next-button" type="button">NEXT</button>
  `
 
  );}

//If the quesitn is correct, the user will see this

function updateCorrectAnswer(){
$('.js-answer-pages').html(`<img src = "https://images.vexels.com/media/users/3/144005/isolated/preview/e827b291d2659d9dddc783a15cddd9da-basketball-ball-stroke-icon-by-vexels.png" alt = "Answer Made" </img>
  <h1>Score!</h1>
  <p>You got it!</p>
  <button class="next-button" type="button">NEXT</button>
  `
)
;}

//This allows the user to go to the next question

function nextQuestion(){
  $('.js-answer-pages').on('click', '.next-button', function(event){
    $('.js-answer-pages').css('display', 'none');
    updateQuestion();
    showQuestions();
    $('.js-question-page').css('display', 'block');
  });
}

//This generates the results based off of their score

function generateQuizResultPage() {
  $('.js-answer-pages').css('display', 'none');  
  $('.js-question-page').css('display', 'none');  

  if (score >= 7) {
    $('.js-question-page').html(`<h3>EXCELLENT!</h3>
      <p>Your Final Score Is: ${score} out of 10!</p>
      <p>Maybe you do know how to ball! You're an NBA fanatic!</p>
      <button class="restart-button js-restart-button">Re-start</button>`);

    } else if (score < 7 && score >= 5) {
      $('.js-question-page').html(`<h3>Well Done!</h3>
        <p>Your Final Score Is: ${score} out of 10!</p>
        <p>You had a few turnovers, but overall you're a fanatic!</p>
        <button class="restart-button js-restart-button">Re-start</button>`);

    } else {
      $('.js-question-page').html(`<h3>Better Luck Next Time!</h3>
        <p>Your Final Score Is: ${score} out of 10!</p>
        <p>We've all been a rookie. Next time is your time to shine!</p>
        <button class="restart-button js-restart-button">Re-start</button>`);
    }

  console.log('`generateResultPage` ran');
}

//This allows the user to restart the quiz

function restartQuiz() {
  $('.js-question-page').on('click', '.js-restart-button', function(event) {
    location.reload();
  });
}

function handleQuiz() {
  questionStart();
  startGame();
  checkQuestion();
  nextQuestion();
  restartQuiz();
}

$(handleQuiz);
