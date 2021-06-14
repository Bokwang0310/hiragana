const question = document.querySelector(".question");
const answer = document.querySelector(".answer");
const btn = document.querySelector(".util-btn");
const modeSelector = document.querySelector(".mode-selector");

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const setText = (questionText, answerText) => {
  question.innerText = questionText;
  answer.innerText = answerText;
};

function startQuiz(quizSet, mode) {
  switch (mode) {
    case "hiragana":
      return setText(...quizSet);

    case "alphabet":
      return setText(...[...quizSet].reverse());

    case "random":
      return setText(...shuffle(quizSet));
  }
}

function initQuiz() {
  answer.classList.remove("visible");
  btn.innerText = "답";
}

(async function main() {
  const src = await fetch("./data.json").then((res) => res.json());

  startQuiz(getRandomElement(src), modeSelector.value);

  btn.addEventListener("click", () => {
    if (!answer.classList.toggle("visible")) {
      startQuiz(getRandomElement(src), modeSelector.value);
      btn.innerText = "답";
      return;
    }
    btn.innerText = "다음";
  });

  modeSelector.addEventListener("change", ({ target }) => {
    initQuiz();
    startQuiz(getRandomElement(src), target.value);
  });
})();
