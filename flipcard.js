
export function flipCard() {
    const card = document.getElementById("myCard");
    const btn = document.getElementById("flipBtn");

    btn.addEventListener("click", () => {
    card.classList.toggle("flipped");

    if (card.classList.contains("flipped")) {
        // baksidan syns
        btn.innerHTML = "Tillbaka";
    } else {
        // framsidan syns
        btn.innerHTML = "Visa mer";
    }
    });
}

// ------------------------------
// Generate dots
// ------------------------------
export function updateDots(monthsLeft) {
    const container = document.getElementById("dotGrid");
    if (!container) return;

    container.innerHTML = "";

    const totalDots = Math.round(monthsLeft);

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        container.appendChild(dot);
    }

}