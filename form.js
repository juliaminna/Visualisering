import { MONTHLY_TASKS } from "./constants.js";
import  { updateDots } from "./flipcard.js";

// ------------------------------
// Debounce helper
// ------------------------------
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}



// ------------------------------
// MAIN INIT FUNCTION
// ------------------------------
export function initDreamVacationForm() {

    // Hantera form-submission → trigga knapp
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    });

    // Age range
    const ageInput = document.getElementById('ageOfUser');
    const ageValue = document.getElementById('rangeValueAge');

    ageValue.textContent = ageInput.value;

    // Uppdatera texten direkt
    ageInput.addEventListener('input', () => {
        ageValue.textContent = ageInput.value;
    });

    // Uppdatera prickar när man SLUTAT dra
    ageInput.addEventListener('input', debounce(() => {
        recalculate();
    }, 250));


    // Screen time range
    const timeInput = document.getElementById('screenTime');
    const timeValue = document.getElementById('rangeValueTime');

    timeValue.textContent = timeInput.value;

    timeInput.addEventListener('input', () => {
        timeValue.textContent = timeInput.value;
    });

    timeInput.addEventListener('input', debounce(() => {
        recalculate();
    }, 250));


    // Första körningen
    recalculate();
}



// ------------------------------
// CALCULATE EVERYTHING
// ------------------------------
export function recalculate() {
    const age = Number(document.getElementById("ageOfUser").value);
    const screenTime = Number(document.getElementById("screenTime").value);

    const yearsLeft = 83.82 - age;
    const monthsLeft = Math.round(yearsLeft * 12);

    const monthlyScreenTime = screenTime * 30.4375; // minuter per månad
    const percentageOfMonth = monthlyScreenTime / 730.5; 
    const totalScreenTime = monthsLeft * percentageOfMonth;

    const tasksInMonths = {};

    for (const key in MONTHLY_TASKS) {
        const minutesPerMonth = MONTHLY_TASKS[key];
        const fractionOfMonth = minutesPerMonth / 43200;
        const monthsSpent = fractionOfMonth * monthsLeft;
        tasksInMonths[key] = Math.round(monthsSpent);
    }

    // Skicka med totalScreenTime avrundat till heltal prickar
    updateDots(monthsLeft, tasksInMonths, Math.round(totalScreenTime));
}
