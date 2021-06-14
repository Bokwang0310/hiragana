const question = document.querySelector(".question");
const answer = document.querySelector(".answer");
const btn = document.querySelector(".util-btn");

const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const applyQuiz = (quizSet) => {
  const [questionText, answerText] = quizSet;

  question.innerText = questionText;
  answer.innerText = answerText;
};

async function init() {
  const src = await fetch("./data.json").then((res) => res.json());

  applyQuiz(getRandomElement(src));

  btn.addEventListener("click", () => {
    if (!answer.classList.toggle("visible")) {
      applyQuiz(getRandomElement(src));
      return (btn.innerText = "답");
    }
    return (btn.innerText = "다음");
  });
}

init();
