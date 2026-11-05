// Массив вопросов и ответов (п. 1, 2)
const questions = [
  {
    text: 'А когда с человеком может произойти дрожемент?',
    explanation: 'Правильно! Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят».',
    answers: [
      { text: 'Когда он влюбляется', correct: false },
      { text: 'Когда он идет шопиться', correct: false },
      { text: 'Когда он слышит смешную шутку', correct: false },
      { text: 'Когда он боится, пугается', correct: true }
    ]
  },
  {
    text: 'Говорят, Антон заовнил всех. Это еще как понимать?',
    explanation: 'Правильно! Термин «заовнить» происходит от слова own и переводится как «победить», «завладеть», «получить».',
    answers: [
      { text: 'Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?', correct: false },
      { text: 'Антон очень надоедливый и въедливый человек, всех задолбал', correct: false },
      { text: 'Молодец, Антон, всех победил!', correct: true },
      { text: 'Нет ничего плохого в том, что Антон тщательно выбирает себе друзей', correct: false }
    ]
  },
  {
    text: 'А фразу «заскамить мамонта» как понимать?',
    explanation: 'Правильно! Заскамить мамонта — значит обмануть или развести на деньги неискушенного человека.',
    answers: [
      { text: 'Разозлить кого-то из родителей', correct: false },
      { text: 'Увлекаться археологией', correct: false },
      { text: 'Развести недотепу на деньги', correct: true },
      { text: 'Оскорбить пожилого человека', correct: false }
    ]
  },
  {
    text: 'Кто такие бефефе?',
    explanation: 'Правильно! Бефефе — это лучшие друзья (от английского best friends forever).',
    answers: [
      { text: 'Вши?', correct: false },
      { text: 'Милые котики, такие милые, что бефефе', correct: false },
      { text: 'Лучшие друзья', correct: true },
      { text: 'Люди, которые не держат слово', correct: false }
    ]
  },
  {
    text: 'Что из перечисленного можно назвать крашем, если ты чиллишь в компании и вдруг залипаешь на кого-то?',
    explanation: 'Правильно! «Краш» — объект симпатии; «чиллить» — отдыхать; «залипать» — засматриваться.',
    answers: [
      { text: 'Человек, который тебе очень нравится и вызывает симпатию.', correct: true },
      { text: 'Тот, на кого приятно смотреть и хочется общаться.', correct: false },
      { text: 'Твоя сильно накрашенная подруга, которая переоценила свой макияж.', correct: false },
      { text: 'Трэш в более мягкой интерпретации.', correct: false }
    ]
  }
];

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

const shuffledQuestions = shuffle(questions);
let currentIndex = 0;
let score = 0;
let isFinished = false;

const nextBtn = document.getElementById('next-btn');
const quizArea = document.getElementById('quiz-area');
const statusBox = document.getElementById('status-box');

nextBtn.addEventListener('click', function () {
  nextBtn.disabled = true;

  const qData = shuffledQuestions[currentIndex];
  const questionNumber = currentIndex + 1;

  const wrapper = document.createElement('div');
  wrapper.className = 'question-wrapper';

  const questionBlock = document.createElement('div');
  questionBlock.className = 'question-block';

  const questionTitle = document.createElement('span');
  questionTitle.textContent = questionNumber + '. ' + qData.text;

  const marker = document.createElement('span');

  questionBlock.appendChild(questionTitle);
  questionBlock.appendChild(marker);

  const correctAns = qData.answers.find(a => a.correct);
  const infoBlock = document.createElement('div');
  infoBlock.className = 'correct-info';
  infoBlock.textContent = 'Правильный ответ: ' + correctAns.text + ' (' + qData.explanation + ')';

  questionBlock.addEventListener('click', function () {
    if (!isFinished) return;

    const allInfoBlocks = document.querySelectorAll('.correct-info');
    allInfoBlocks.forEach(block => {
      if (block !== infoBlock) {
        block.style.display = 'none';
      }
    });

    infoBlock.style.display = infoBlock.style.display === 'block' ? 'none' : 'block';
  });

  const answersRow = document.createElement('div');
  answersRow.className = 'answers-row';

  const shuffledAnswers = shuffle(qData.answers);
  let answered = false;

  shuffledAnswers.forEach(ans => {
    const ansBlock = document.createElement('div');
    ansBlock.className = 'answer-block';
    ansBlock.textContent = ans.text;

    ansBlock.addEventListener('click', function () {
      if (answered) return;
      answered = true;

      ansBlock.classList.add('answer-selected');

      if (ans.correct) {
        score++;
        const exp = document.createElement('div');
        exp.className = 'explanation';
        exp.textContent = qData.explanation;
        ansBlock.appendChild(exp);
      }

      const allAnswers = Array.from(answersRow.children);

      setTimeout(function () {
        if (ans.correct) {
          marker.textContent = '✔';
          marker.className = 'marker-correct';
        } else {
          marker.textContent = '✘';
          marker.className = 'marker-wrong';
        }

        let blocksToMove = allAnswers;
        if (ans.correct) {
          const wrongBlocks = allAnswers.filter(b => b !== ansBlock);
          blocksToMove = wrongBlocks.concat([ansBlock]);
        }

        blocksToMove.forEach((block, i) => {
          setTimeout(function () {
            block.classList.add('move-right');
          }, i * 250);
        });

        setTimeout(function () {
          answersRow.remove();
          currentIndex++;

          if (currentIndex < shuffledQuestions.length) {
            nextBtn.disabled = false;
          } else {
            finishQuiz();
          }
        }, blocksToMove.length * 250 + 500);

      }, 2000);
    });

    answersRow.appendChild(ansBlock);
  });

  wrapper.appendChild(questionBlock);
  wrapper.appendChild(infoBlock);
  wrapper.appendChild(answersRow);
  quizArea.appendChild(wrapper);
});

function finishQuiz() {
  isFinished = true;
  nextBtn.disabled = true;

  statusBox.style.display = 'block';
  statusBox.innerHTML = '<strong>Вопросы закончились.</strong><br>Правильных ответов: ' + score + ' из ' + shuffledQuestions.length;

  const allQuestions = document.querySelectorAll('.question-block');
  allQuestions.forEach(q => q.classList.add('clickable'));
}