import { CATEGORY_COLORS } from "./constants.js";

// ------------------------------
// Generate dots
// ------------------------------
export function updateDots(monthsLeft, tasksInMonths, totalScreenTime) {
    const container = document.getElementById("dotGrid");
    if (!container) return;

    container.innerHTML = ""; // Rensa gamla prickar

    let totalDots = 0; // håller reda på hur många prickar som ritats totalt

    // 1️⃣ Rita färgade prickar för sysslor
    for (const [category, months] of Object.entries(tasksInMonths)) {
        const color = CATEGORY_COLORS[category] || "#444";
        const numDots = Math.floor(months);

        totalDots += numDots;

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot", "task-dot");
            dot.style.backgroundColor = color;
            dot.style.animationDelay = `${(totalDots + i) * 0.01}s`; // staggered animation
            container.appendChild(dot);
        }
    }

    // 2️⃣ Rita prickar för skärmtid (svarta)
    const screenDots = Math.floor(totalScreenTime);
    const screenDotsToDraw = Math.min(screenDots, monthsLeft - totalDots); // säkerställ att vi inte överskrider monthsLeft

    for (let i = 0; i < screenDotsToDraw; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot", "screen-dot");
        dot.style.backgroundColor = "#ff5555"; // svart för skärmtid
        dot.style.animationDelay = `${(totalDots + i) * 0.01}s`;
        container.appendChild(dot);
    }

    totalDots += screenDotsToDraw;

    // 3️⃣ Fyll upp resterande månader med grå prickar
    const remainingDots = monthsLeft - totalDots;

    for (let i = 0; i < remainingDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot", "remaining-dot");
        dot.style.backgroundColor = "#ccc"; // grå för övriga månader
        dot.style.animationDelay = `${(totalDots + i) * 0.01}s`;
        container.appendChild(dot);
    }
}

