const questions = [
  {
    name: "Baleine à bosse",
    image: "images/whale-humpback.png",
    sound: "sounds/whale-humpback.mp3",
    options: ["Baleine à bosse", "Beluga", "Grand Cachalot", "Rorqual Commun"],
  },
  {
    name: "Baleine Bleue",
    image: "images/blue-whale.png",
    sound: "sounds/blue-whale.mp3",
    options: ["Baleine Bleue", "Petit Rorqual", "Beluga", "Rorqual Commun"],
  },
  {
    name: "Belugas",
    image: "images/beluga.png",
    sound: "sounds/beluga.mp3",
    options: ["Belugas", "Grand Cachalot", "Petit Rorqual", "Baleine à bosse"],
  },
  {
    name: "Grand Cachalot",
    image: "images/sperm-whale.png",
    sound: "sounds/sperm-whale.mp3",
    options: ["Grand Cachalot", "Baleine Bleue", "Belugas", "Petit Rorqual"],
  },
  {
    name: "Petit Rorqual",
    image: "images/minke-whale.png",
    sound: "sounds/minke-whale.mp3",
    options: ["Petit Rorqual", "Belugas", "Rorqual Commun", "Baleine Bleue"],
  },
  {
    name: "Rorqual Commun",
    image: "images/fin-whale.png",
    sound: "sounds/fin-whale.mp3",
    options: [
      "Rorqual Commun",
      "Grand Cachalot",
      "Baleine Bleue",
      "Petit Rorqual",
    ],
  },
];

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  shuffledQuestions = shuffleArray([...questions]);
  document.getElementById("start-page").style.display = "none";
  document.getElementById("quiz-page").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = shuffledQuestions[currentQuestion];
  document.getElementById("question-title").innerText = `Question ${currentQuestion + 1}`;
  document.getElementById("question-image").src = q.image;
  document.getElementById("image-container").style.display = "none";
  document.getElementById("show-image-btn").style.display = "inline-block";

  document.getElementById("audio-source").src = q.sound;
  document.getElementById("question-audio").load();

  const options = shuffleArray([...q.options]);
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  options.forEach(opt => {
    optionsDiv.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="answer" value="${opt}" id="${opt}">
        <label class="form-check-label" for="${opt}">${opt}</label>
      </div>`;
  });

  document.getElementById("feedback").innerHTML = "";

  document.querySelector('#submit-button').disabled = false;
}

function showImage() {
  document.getElementById("image-container").style.display = "block";
  document.getElementById("show-image-btn").style.display = "none";
}

function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  const feedback = document.getElementById("feedback");
  if (!selected) {
    alert("Merci de choisir une réponse avant de continuer.");
    return;
  }

  document.querySelector('#submit-button').disabled = true;

  const answer = selected.value;
  const correct = shuffledQuestions[currentQuestion].name;

  if (answer === correct) {
    feedback.innerHTML = `<div class="alert alert-success" role="alert">Bonne réponse !</div>`;
    score++;
  } else {
    feedback.innerHTML = `<div class="alert alert-danger" role="alert">Mauvaise réponse. C’était : <strong>${correct}</strong>.</div>`;
  }

  currentQuestion++;
  setTimeout(() => {
    if (currentQuestion < shuffledQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 3000);
}

function showResults() {
  document.getElementById("quiz-page").style.display = "none";
  document.getElementById("result-page").style.display = "block";
  const name = document.getElementById("player-name").value || "Participant";
  document.getElementById("final-score").innerText = `${name}, votre score est ${score} / ${shuffledQuestions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("result-page").style.display = "none";
  document.getElementById("start-page").style.display = "block";
}
