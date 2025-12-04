import { MONTHLY_TASKS } from "./constants.js";
import  { updateDots } from "./flipcard.js";


let GLOBAL_totalScreenTime = 0;

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
    });

    // Age range
    const ageInput = document.getElementById('ageOfUser');
    const ageValue = document.getElementById('rangeValueAge');
    const continueStart = document.getElementById('btnContinueStepStart')
    const continueOne = document.getElementById('btnContinueStepOne');
    const continueTwo = document.getElementById('btnContinueStepTwo');
    const continueThree = document.getElementById('btnContinueStepThree');
    const continueFour = document.getElementById('btnContinueStepFour');
    const backOne = document.getElementById('btnBackStepOne');
    const backTwo = document.getElementById('btnBackStepTwo');
    const backThree = document.getElementById('btnBackStepThree');
    const backFour = document.getElementById('btnBackStepFour');
    const saveFinal = document.getElementById('btnSaveFinal');
    const continueFinal = document.getElementById('btnContinueFinal');

    ageValue.textContent = ageInput.value;

    // Uppdatera texten direkt
    ageInput.addEventListener('input', () => {
        ageValue.textContent = ageInput.value;
    });

    // Uppdatera prickar när man SLUTAT dra
    ageInput.addEventListener('input', debounce(() => {
        recalculate();
    }, 250));

    continueStart.addEventListener('click', () => {
        document.getElementById("stepStart").classList.add('d-none');
        document.getElementById("stepOne").classList.remove('d-none');
        document.querySelectorAll(".legendStepOne").forEach(el => {
            el.classList.remove("d-none");
        });
    });

    continueOne.addEventListener('click', () => {
        document.getElementById("stepOne").classList.add('d-none');
        document.getElementById("stepTwo").classList.remove('d-none');

    });

    backOne.addEventListener('click', () => {
        document.getElementById("stepOne").classList.add('d-none');
        document.getElementById("stepStart").classList.remove('d-none');

        document.querySelectorAll(".legendStepTwo").forEach(el => {
            el.classList.add("d-none");
        });

        document.querySelectorAll(".legendStepOne").forEach(el => {
            el.classList.add("d-none");
        });
    });

    continueTwo.addEventListener('click', () => {
        document.getElementById("stepTwo").classList.add('d-none');
        document.getElementById("stepThree").classList.remove('d-none');
        document.getElementById("dotGrid").classList.add("screen-mode");

        document.querySelectorAll(".legendStepTwo").forEach(el => {
            el.classList.remove("d-none");
        });
    });

    backTwo.addEventListener('click', () => {
        document.getElementById("stepTwo").classList.add('d-none');
        document.getElementById("stepOne").classList.remove('d-none');

    });

    continueThree.addEventListener('click', () => {
        document.getElementById("stepThree").classList.add('d-none');
        document.getElementById("stepFour").classList.remove('d-none');

        document.getElementById("dotGrid").classList.remove("screen-mode");
        document.getElementById("customScreenTime").innerHTML = `De <span class="red font-paragraph-bold">röda prickarna</span> visar på hur stor del av din kvarvarande livstid som kommer att spenderas framför en skärm. <br><br> Detta innebär att du kommer att spendera ${GLOBAL_totalScreenTime} månader av ditt liv framför en skärm.`

    });

    backThree.addEventListener('click', () => {
        document.getElementById("stepThree").classList.add('d-none');
        document.getElementById("stepTwo").classList.remove('d-none');

        document.getElementById("dotGrid").classList.remove("screen-mode");

    });

        continueFour.addEventListener('click', () => {
        document.getElementById("stepFour").classList.add('d-none');
        document.getElementById("stepFinal").classList.remove('d-none');

    });

        backFour.addEventListener('click', () => {
        document.getElementById("stepFour").classList.add('d-none');
        document.getElementById("stepThree").classList.remove('d-none');

        document.getElementById("dotGrid").classList.add("screen-mode");

    });

        continueFinal.addEventListener('click', () => {
        document.getElementById("stepFinal").classList.add('d-none');
        document.getElementById("stepStart").classList.remove('d-none');

        document.getElementById("dotGrid").classList.remove("screen-mode");

        document.querySelectorAll(".legendStepTwo").forEach(el => {
            el.classList.add("d-none");
        });

        document.querySelectorAll(".legendStepOne").forEach(el => {
            el.classList.add("d-none");
        });

        ageInput.value = 18;
        ageValue.textContent = ageInput.value;
        timeInput.value = 0;
        timeValue.textContent = timeInput.value;
        recalculate();
    });

        saveFinal.addEventListener('click', () => {
        // LADDA NER VISUALISERINGEN OCH DATAN.
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

    const monthlyScreenTime = screenTime * 30.4375;
    const percentageOfMonth = monthlyScreenTime / 730.5; 
    const totalScreenTime = monthsLeft * percentageOfMonth;

    const tasksInMonths = {};

    for (const key in MONTHLY_TASKS) {
        const minutesPerMonth = MONTHLY_TASKS[key];
        const fractionOfMonth = minutesPerMonth / 43200;
        const monthsSpent = fractionOfMonth * monthsLeft;
        tasksInMonths[key] = Math.round(monthsSpent);
    }

    // Rita om alla prickar
    updateDots(monthsLeft, tasksInMonths, Math.round(totalScreenTime));
    console.log(totalScreenTime);

    GLOBAL_totalScreenTime = Math.round(totalScreenTime);

}

// 🔥 Gör funktionen global samtidigt
window.recalculate = recalculate;

