import { CATEGORY_COLORS } from "./constants.js";
import { CATEGORY_LABELS } from "./constants.js";
import { CATEGORY_LEGEND_IDS } from "./constants.js";

export function updateDots(monthsLeft, tasksInMonths, totalScreenTime) {
    const container = document.getElementById("dotGrid");
    if (!container) return;

    // Rensa tidigare prickar
    container.innerHTML = "";

    // 🔄 Nollställ alla legends
    Object.values(CATEGORY_LEGEND_IDS).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "";
    });

    const legendScreen = document.getElementById("legendScreentime");
    const legendFree = document.getElementById("legendFreetime");
    if (legendScreen) legendScreen.textContent = "";
    if (legendFree) legendFree.textContent = "";

    let totalDots = 0;

    // -----------------------------------------------------
    // 1️⃣ RITA SYSSLOR (färgade prickar)
    // -----------------------------------------------------
    for (const [category, months] of Object.entries(tasksInMonths)) {
        const color = CATEGORY_COLORS[category] || "#444";
        const numDots = Math.floor(months);

        const prettyLabel = CATEGORY_LABELS[category] || category.replace(/_/g, " ");
        const legendId = CATEGORY_LEGEND_IDS[category];

        // 🧾 Uppdatera legend med ANTAL prickar för just denna kategori
        if (legendId) {
            const el = document.getElementById(legendId);
            if (el) el.textContent = `${numDots} månader`;
        }

        // Bas för animation (innan vi ökar totalDots)
        const base = totalDots;

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot", "task-dot");
            dot.style.backgroundColor = color;
            dot.style.animationDelay = `${(base + i) * 0.01}s`;

            dot.dataset.tooltip = `${prettyLabel}: ${numDots} månader`;

            container.appendChild(dot);
        }

        // Öka totalen först efter loopen
        totalDots += numDots;
    }

    // -----------------------------------------------------
    // 2️⃣ RITA SKÄRMTID (svarta/röda prickar som ersätter fritid)
    // -----------------------------------------------------

    const screenDots = Math.floor(totalScreenTime);

    // RITA INTE fler än vad som får plats
    const screenDotsToDraw = Math.max(
        0,
        Math.min(screenDots, monthsLeft - totalDots)
    );

    if (legendScreen) legendScreen.textContent = `${screenDotsToDraw} månader`;

    const baseScreen = totalDots;

    for (let i = 0; i < screenDotsToDraw; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot", "screen-dot");
        dot.style.backgroundColor = "#ff5555"; // skärmtidsfärg
        dot.style.animationDelay = `${(baseScreen + i) * 0.01}s`;

        dot.dataset.tooltip = `Skärmtid: ${screenDotsToDraw} månader`;

        container.appendChild(dot);
    }

    totalDots += screenDotsToDraw;

    // -----------------------------------------------------
    // 3️⃣ RITA RESTEN SOM FRITID (grå prickar)
    // -----------------------------------------------------

    const remainingDots = Math.max(0, monthsLeft - totalDots);

    if (legendFree) legendFree.textContent = `${remainingDots} månader`;

    const baseRemain = totalDots;

    for (let i = 0; i < remainingDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot", "remaining-dot");
        dot.style.backgroundColor = "#ccc";
        dot.style.animationDelay = `${(baseRemain + i) * 0.01}s`;

        dot.dataset.tooltip = `Fritid: ${remainingDots} månader`;

        container.appendChild(dot);
    }

    totalDots += remainingDots;
}
