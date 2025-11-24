import { MONTHLY_TASKS } from "./constants.js";

export function initDreamVacationForm() {
    // Förhindra form från att ladda om sidan
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
    });

    const rangeInputAge = document.getElementById('ageOfUser');
    const rangeOutputAge = document.getElementById('rangeValueAge');

    const rangeInputTime = document.getElementById('screenTime');
    const rangeOutputTime = document.getElementById('rangeValueTime');

    // Visa värdena bredvid sliders
    rangeOutputAge.textContent = rangeInputAge.value;
    rangeOutputTime.textContent = rangeInputTime.value;

    rangeInputAge.addEventListener('input', function () {
        rangeOutputAge.textContent = this.value;
    });
    rangeInputTime.addEventListener('input', function () {
        rangeOutputTime.textContent = this.value;
    });

    // ----------- RITA PRICKAR -----------
    function drawDots(monthsLeft) {
        const grid = document.getElementById("dotGrid");
        grid.innerHTML = "";

        for (let i = 0; i < monthsLeft; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.id = `dot-${i}`;
            grid.appendChild(dot);
        }
    }

    // ----------- RÄKNA UT & UPPDATERA -----------
    function update() {
        const age = Number(document.getElementById("ageOfUser").value);
        const screenTime = Number(document.getElementById("screenTime").value);

        const yearsLeft = 83.82 - age;
        const monthsLeft = Math.round(yearsLeft * 12);

        drawDots(monthsLeft);
    }

    // Kör när användaren ändrar sliders
    rangeInputAge.addEventListener("input", update);
    rangeInputTime.addEventListener("input", update);

    // Kör direkt vid sidstart
    update();
}
