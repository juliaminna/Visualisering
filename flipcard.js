
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