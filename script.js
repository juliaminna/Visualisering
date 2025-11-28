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