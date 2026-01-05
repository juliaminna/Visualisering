
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


const bg = document.getElementById("phone-bg");

if (bg) {
  const colors = ["#55ffb5", "#ff5555", "#ee55ff", "#55c1ff", "#ffc355"];
  let index = 0;

  bg.setAttribute("fill", colors[0]);

  setInterval(() => {
    bg.setAttribute("fill", colors[index]);
    index = (index + 1) % colors.length;
  }, 1700);
}




if (document.body.classList.contains("page-am-i-addicted")) {
  initSectionNavigation();
}

function initSectionNavigation() {
  const sections = [...document.querySelectorAll("main section")];
  const arrowUp = document.getElementById("arrowUp");
  const arrowDown = document.getElementById("arrowDown");

  if (!arrowUp || !arrowDown || sections.length === 0) return;

  let arrowsLocked = false;

  function getCurrentSectionIndex() {
    let index = 0;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= window.innerHeight / 2) {
        index = i;
      }
    });
    return index;
  }

  function updateArrowVisibility() {
    const current = getCurrentSectionIndex();

    arrowUp.style.opacity = current === 0 ? "0" : "1";
    arrowUp.style.pointerEvents = current === 0 ? "none" : "auto";

    arrowDown.style.opacity =
      current === sections.length - 1 ? "0" : "1";
    arrowDown.style.pointerEvents =
      current === sections.length - 1 ? "none" : "auto";
  }

  function temporarilyHideArrows() {
    arrowsLocked = true;

    arrowUp.style.opacity = "0";
    arrowDown.style.opacity = "0";
    arrowUp.style.pointerEvents = "none";
    arrowDown.style.pointerEvents = "none";

    setTimeout(() => {
      arrowsLocked = false;
      updateArrowVisibility();
    }, 5000);
  }

  arrowDown.addEventListener("click", () => {
    if (arrowsLocked) return;

    const next = sections[getCurrentSectionIndex() + 1];
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
      temporarilyHideArrows();
    }
  });

  arrowUp.addEventListener("click", () => {
    if (arrowsLocked) return;

    const prev = sections[getCurrentSectionIndex() - 1];
    if (prev) {
      prev.scrollIntoView({ behavior: "smooth" });
      temporarilyHideArrows();
    }
  });

  window.addEventListener("scroll", () => {
    if (!arrowsLocked) {
      updateArrowVisibility();
    }
  });

  updateArrowVisibility();
}