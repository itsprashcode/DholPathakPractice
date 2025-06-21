let mode = 'free';
let loopEnabled = false;
let tuneTimeout;
let bpm = 100;

const dhol = document.getElementById('dhol');
const modeDisplay = document.getElementById('mode-display');
const tuneSelector = document.getElementById('tune-selector');
const toggleLoopBtn = document.getElementById('toggle-loop');
const bpmSlider = document.getElementById('bpm-slider');
const stopBtn = document.getElementById('stop-btn');
const beatIndicator = document.getElementById('beat-indicator');

const thapiSound = new Audio("./asset/Thapi.mp3");
const dhinSound = new Audio("./asset/dhin.mp3");

const tunes = [
  {
    name: "Tune 1 - Taak Dhin Dha",
    sequence: ["taak", "dhin", "dhin"],
    delay: 1500
  },
  // Add more tunes here
    {
        name: "Tune 2 - Taak Taak Dhin",
        sequence: ["taak", "taak", "dhin"],
        delay: 1500
    },
    {
        name: "Tune 3 - Dhin Taak Dha",
        sequence: ["dhin", "taak", "dhin"],
        delay: 1500
    },
    {
        name: "Tune 4 - Dha Dhin Taak",
        sequence: ["dhin", "dhin", "taak"],
        delay: 1500
    },
    {
        name: "Tune 5 - taak taak taak dhin taak dhin dhin taak",
        sequence: ["taak","taak","dhin", "taak","dhin","dhin","taak","dhin","taak"],
        delay: 1500
    },
    {
        name: "Tune 6 - Dhin Dhin Dhin Taak",
        sequence: ["dhin", "dhin",  "dhin","taak"],
        delay: 1500
    }
];

tunes.forEach((tune, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.text = tune.name;
  tuneSelector.appendChild(option);
});

function setMode(newMode) {
  mode = newMode;
  modeDisplay.innerText = `Mode: ${mode === 'free' ? 'Free Hand' : 'Learn Tunes'}`;
  const show = (mode === 'learn');
  tuneSelector.style.display = show ? 'inline' : 'none';
  toggleLoopBtn.style.display = show ? 'inline' : 'none';
  bpmSlider.style.display = show ? 'inline' : 'none';
  stopBtn.style.display = show ? 'inline' : 'none';
  beatIndicator.innerText = '';

  if (show) {
    playTune(tunes[tuneSelector.value]);
  } else {
    stopTune();
  }
}

tuneSelector.addEventListener('change', () => {
  if (mode === 'learn') playTune(tunes[tuneSelector.value]);
});

bpmSlider.addEventListener('input', () => {
  bpm = bpmSlider.value;
});

function toggleLoop() {
  loopEnabled = !loopEnabled;
  toggleLoopBtn.innerText = `Loop: ${loopEnabled ? 'On' : 'Off'}`;
}

function stopTune() {
  clearTimeout(tuneTimeout);
  beatIndicator.innerText = '';
}

function playTune(tune) {
  let i = 0;
  clearTimeout(tuneTimeout);
  
  function playNext() {
    if (i >= tune.sequence.length) {
    if (loopEnabled) {
        i = 0;
        beatIndicator.innerText = ''; // Clear beat trail on repeat
    } else {
        beatIndicator.innerText += '🎵 Done';
        return;
    }
    }

    const hit = tune.sequence[i];
    beatIndicator.innerText += `${hit.toUpperCase()} ➡️ `;

    
        if (hit === "taak") {
            new Audio("./asset/Thapi.mp3").play();
        } else if (hit === "dhin") {
            new Audio("./asset/dhin.mp3").play();
        }


    dhol.classList.add("animate");
    setTimeout(() => dhol.classList.remove("animate"), 100);

    i++;
    const delay = (60000 / bpm); // calculate delay from BPM
    tuneTimeout = setTimeout(playNext, delay);
  }

  playNext();
}

dhol.addEventListener('touchstart', handleTouch);
dhol.addEventListener('click', handleTouch);

function handleTouch(event) {
  if (mode !== 'free') return;

  const x = event.touches ? event.touches[0].clientX : event.clientX;
  const half = window.innerWidth / 2;
    if (x < half) {
    new Audio("./asset/Thapi.mp3").play();
    } else {
    new Audio("./asset/dhin.mp3").play();
    }


  dhol.classList.add("animate");
  setTimeout(() => dhol.classList.remove("animate"), 100);
}
