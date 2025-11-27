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
    const continueOne = document.getElementById('btnContinueStepOne');
    const continueTwo = document.getElementById('btnContinueStepTwo');
    const continueThree = document.getElementById('btnContinueStepThree');
    const continueFour = document.getElementById('btnContinueStepFour');
    const backOne = document.getElementById('btnBackStepOne');
    const backTwo = document.getElementById('btnBackStepTwo');
    const backThree = document.getElementById('btnBackStepThree');
    const backFour = document.getElementById('btnBackStepFour');

    ageValue.textContent = ageInput.value;

    // Uppdatera texten direkt
    ageInput.addEventListener('input', () => {
        ageValue.textContent = ageInput.value;
    });

    // Uppdatera prickar när man SLUTAT dra
    ageInput.addEventListener('input', debounce(() => {
        recalculate();
    }, 250));

    continueOne.addEventListener('click', () => {
        document.getElementById("stepOne").classList.add('d-none');
        document.getElementById("stepTwo").classList.remove('d-none');

    });

    continueTwo.addEventListener('click', () => {
        document.getElementById("stepTwo").classList.add('d-none');
        document.getElementById("stepThree").classList.remove('d-none');

    });

    backTwo.addEventListener('click', () => {
        document.getElementById("stepTwo").classList.add('d-none');
        document.getElementById("stepOne").classList.remove('d-none');

    });

    continueThree.addEventListener('click', () => {
        document.getElementById("stepThree").classList.add('d-none');
        document.getElementById("stepFour").classList.remove('d-none');

    });

        backThree.addEventListener('click', () => {
        document.getElementById("stepThree").classList.add('d-none');
        document.getElementById("stepTwo").classList.remove('d-none');

    });

        continueFour.addEventListener('click', () => {
        document.getElementById("stepFour").classList.add('d-none');
        document.getElementById("stepFive").classList.remove('d-none');

    });

        backFour.addEventListener('click', () => {
        document.getElementById("stepFour").classList.add('d-none');
        document.getElementById("stepThree").classList.remove('d-none');

    });


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
