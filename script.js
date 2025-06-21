let mode = 'free';
const dhol = document.getElementById('dhol');
const modeDisplay = document.getElementById('mode-display');

const thapiSound = new Audio('./asset/Thapi.mp3');
const dhinSound = new Audio('./asset/dhin.mp3');

const hitImage = document.createElement("img");
hitImage.id = "hit-type";
document.querySelector('.container').appendChild(hitImage);

function setMode(newMode) {
  mode = newMode;
  modeDisplay.innerText = `Mode: ${mode === 'free' ? 'Free Hand' : 'Learn Tunes'}`;
}

dhol.addEventListener('touchstart', handleTouch);
dhol.addEventListener('click', handleTouch); // for desktop

function handleTouch(event) {
  if (mode !== 'free') return;

  const x = event.touches ? event.touches[0].clientX : event.clientX;
  const half = window.innerWidth / 2;

  if (x < half) {
    thapiSound.play();
    hitImage.src = "assets/thapi.png";
  } else {
    dhinSound.play();
    hitImage.src = "assets/thoka.png";
  }

  dhol.classList.add("animate");
  setTimeout(() => dhol.classList.remove("animate"), 100);
}
