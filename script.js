import {
  initDreamVacationForm,
} from "./form.js";
initDreamVacationForm();

  document.addEventListener("DOMContentLoaded", () => {
});


export function saveVisualization() {
  const target = document.getElementById("visualization");
  
  html2canvas(target).then(canvas => {
    const link = document.createElement("a");
    link.download = "Screentime-Wrapped_Resultat.png";
    link.href = canvas.toDataURL("image/png", 0.9);
    link.click();
  });
}

window.saveVisualization = saveVisualization;


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModal");

  // Visa endast om den inte redan visats denna session
  if (!sessionStorage.getItem("welcomeModalShown")) {
    modal.classList.add("is-visible");
  }

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("is-visible");
    sessionStorage.setItem("welcomeModalShown", "true");
  });
});



