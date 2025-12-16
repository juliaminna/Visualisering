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
    link.download = "visualisering.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
  });
}

window.saveVisualization = saveVisualization;





