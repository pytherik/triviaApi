const question = document.getElementById('question');
const answer = document.getElementById('answer');
const choices = document.querySelector('.choices');
const correctAnswer = document.querySelector('.answer');
const nextButton = document.getElementById('next');


const decodeEntities = (s) => {
  const el = document.createElement('p');
  el.innerHTML = s;
  const str = el.textContent
  return str;
}

function shuffle(arr){
  for(let i =arr.length-1 ; i>0 ;i--){
      let j = Math.floor( Math.random() * (i + 1) ); //random index
      [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
  }
}

async function questions() {
  // const req = await fetch('https://opentdb.com/api.php?amount=1&category=9');
  const req = await fetch('https://opentdb.com/api.php?amount=1');
  const data = await req.json();
  const content = data.results[0];
  const dq = decodeEntities(content.question);
  const correct_answer = decodeEntities(content.correct_answer);
  let all_answers = decodeEntities(content.incorrect_answers);
  all_answers = all_answers.split(',');
  all_answers.push(correct_answer);
  console.log(all_answers);
  shuffle(all_answers);
  console.log(all_answers);
  if (content.type === "multiple") {
    for (let i in all_answers) {
      $('.choices').append(`<span class="choice">${parseInt(i) + 1}. ${all_answers[i]}</span>`);
    }
  } else if (content.type === "boolean") {
    $('.choices').append(`<span class="choice">1. True</span><span class="choice">2. False</span>`);
  }
  const choiceEls = document.querySelectorAll('.choice');
  for (let i = 0; i < choiceEls.length; i++) {
    choiceEls[i].addEventListener('click', () => {
      const guess = (choiceEls[i].textContent).slice(3,);
      if (guess === correct_answer) {
        console.log('Richtig!');
        correctAnswer.classList.add('win');
      } else {
        console.log('Falsch!');
        correctAnswer.classList.add('lose');
      }
      choices.hidden = true;
      correctAnswer.textContent = correct_answer;
      correctAnswer.hidden = false;
    });
  }
  console.log(choiceEls)
  question.textContent = dq;
  answer.textContent = correct_answer;
  return true;
}

nextButton.addEventListener('click', () => location.reload())
questions();
