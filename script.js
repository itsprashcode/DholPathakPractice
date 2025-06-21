let mode = 'free';
const dhol = document.getElementById('dhol');
const modeDisplay = document.getElementById('mode-display');
const tuneSelector = document.getElementById('tune-selector');

const thapiSound = new Audio("./asset/thapi.mp3");
const dhinSound = new Audio("./asset/dhin.mp3");

const hitImage = document.createElement("img");
hitImage.id = "hit-type";
document.querySelector('.container').appendChild(hitImage);

// Define configurable tunes
const tunes = [
  {
    name: "Tune 1 - Taak Dhin Dha",
    sequence: ["thapi", "dhin", "dhin"],
    delay: 1200
  },
  // Add more tunes here
];

// Populate dropdown
tunes.forEach((tune, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.text = tune.name;
  tuneSelector.appendChild(option);
});

function setMode(newMode) {
  mode = newMode;
  modeDisplay.innerText = `Mode: ${mode === 'free' ? 'Free Hand' : 'Learn Tunes'}`;
  tuneSelector.style.display = mode === 'learn' ? 'inline' : 'none';

  if (mode === 'learn') {
    playTune(tunes[tuneSelector.value]);
  }
}

tuneSelector.addEventListener('change', () => {
  if (mode === 'learn') {
    playTune(tunes[tuneSelector.value]);
  }
});

dhol.addEventListener('touchstart', handleTouch);
dhol.addEventListener('click', handleTouch); // for desktop

function handleTouch(event) {
  if (mode !== 'free') return;

  const x = event.touches ? event.touches[0].clientX : event.clientX;
  const half = window.innerWidth / 2;

  if (x < half) {
    thapiSound.play();
  } else {
    dhinSound.play();
  }

  dhol.classList.add("animate");
  setTimeout(() => dhol.classList.remove("animate"), 100);
}

function playTune(tune) {
  let i = 0;

  function playNext() {
    if (i >= tune.sequence.length) return;

    const hit = tune.sequence[i];
    if (hit === "thapi") {
      thapiSound.play();
    } else if (hit === "dhin") {
      dhinSound.play();
    }

    dhol.classList.add("animate");
    setTimeout(() => dhol.classList.remove("animate"), 100);

    i++;
    setTimeout(playNext, tune.delay);
  }

  playNext();
}
