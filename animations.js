
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



const wrapper = document.getElementById("wrapper");
const strip = wrapper.querySelector(".horizontal-strip");

$horizontalStrip.animation(
    {
        transform: ['', 'translateX(calc(-100% + 100vw))'],
    },
    {
        timeline: new ViewTimeline({
            subject: $wrapper,
            axis: 'block',
        }),
        fill: 'forwards',
        rangeStart: 'contain 0%',
        rangeEnd: 'contain 100%',
    }
);