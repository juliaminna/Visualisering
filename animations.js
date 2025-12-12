let timerInterval = null;
let seconds = 0;

export function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

const timerElement = document.getElementById("timer");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Starta timer
      if (!timerInterval) {
        timerInterval = setInterval(() => {
          seconds++;
          timerElement.textContent = formatTime(seconds);
        }, 1000);
      }
    } else {
      // Sluta räkna (men behåll tiden)
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    timerElement.textContent = "00:00";

    }
  });
}, {
  threshold: 0.5 // Starta när 50% av sektionen syns
});

// Observa sektionen där timern ligger
observer.observe(timerElement.closest("section"));


const section = document.querySelector('.horizontal-scroll-section');
const inner = section.querySelector('div');
const fullPage = document.getElementById('main-page');

section.addEventListener('wheel', (e) => {
    fullPage = e.deltaY;
  e.preventDefault(); // stoppa vertikal scroll
  section.scrollLeft += e.deltaY; // använd vertikalt wheeldrag för horisontell scroll
});
