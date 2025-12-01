import {
  initDreamVacationForm,
} from "./form.js";

  initDreamVacationForm();

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnContinueStepTwo");

    if (btn) {
        btn.addEventListener("click", () => {
            const taskDots = document.querySelectorAll(".task-dot");
            taskDots.forEach(dot => {
                dot.style.opacity = "0.5";
            });
        });
    }
});

export function saveVisualization() {
  const target = document.getElementById("dotGrid");
  
  html2canvas(target).then(canvas => {
    const link = document.createElement("a");
    link.download = "visualisering.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
  });
}

window.saveVisualization = saveVisualization;