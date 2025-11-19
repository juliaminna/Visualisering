import { MONTHLY_TASKS } from "./constants.js";

export function initDreamVacationForm() {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault(); 
    document.getElementById("searchBtn").click(); 
  });

  document.getElementById("searchBtn").addEventListener("click", async () => {
    const age = document.getElementById("ageOfUser").value;
    const screenTime = document.getElementById("screenTime").value;

    const yearsLeft = 83.82 - age;
    const monthsLeft = yearsLeft * 12;
    const monthlyScreenTime = screenTime * 30.4375;
    const percentageOfMonths = monthlyScreenTime / 730.5;
    const totalScreenTime = monthsLeft * percentageOfMonths;

    const percentageOfLife = totalScreenTime / monthsLeft;

    console.log("Du här " + Math.round(monthsLeft)  + " månader kvar")
    console.log("Varav du kommer att spendera " + Math.round(totalScreenTime) + " framför en skärm");
    console.log("Vilket är " + Math.round(percentageOfLife * 100) + "% av ditt kvarvarande liv.");
  });


}