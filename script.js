const heatmap = document.getElementById("heatmap");

const popupOverlay = document.getElementById("popupOverlay");

const saveDayBtn = document.getElementById("saveDayBtn");
const cancelBtn = document.getElementById("cancelBtn");
const studyInput = document.getElementById("studyInput");
const sleepInput = document.getElementById("sleepInput");
const foodInput = document.getElementById("foodInput");
const fitnessInput = document.getElementById("fitnessInput");
const extraInput = document.getElementById("extraInput");
const godStreakDisplay = document.getElementById("godStreak");

let godStreak = 0;

let currentDay = null;

const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
document.body.appendChild(tooltip);

for (let i = 0; i < 365; i++) {

    const startDate = new Date(2026, 0, 1);
const currentDate = new Date(startDate);

currentDate.setDate(startDate.getDate() + i);
    
    const day = document.createElement("div");

    day.dataset.date =
currentDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
});

    day.classList.add("day");

        day.addEventListener("click", () => {

    const today = new Date();

    const todayString = today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    if(day.dataset.date !== todayString){
        alert("This day is locked.");
        return;
    }

    currentDay = day;
    popupOverlay.style.display = "flex";
});

day.addEventListener("mouseenter", () => {

    if (!day.dataset.total) {

        tooltip.innerHTML = `
            <strong>${day.dataset.date}</strong>
            <hr>
            No activity logged
        `;

        tooltip.style.display = "block";

        return;
    }

    tooltip.innerHTML = `
        <strong>${day.dataset.date}</strong>
        <hr>

        Study: ${day.dataset.study}/5<br>
        Sleep: ${day.dataset.sleep}/2<br>
        Food: ${day.dataset.food}/1<br>
        Fitness: ${day.dataset.fitness}/1<br>
        Extra: ${day.dataset.extra}/1

        <hr>

        Total: ${day.dataset.total}/10
    `;

    tooltip.style.display = "block";

});        

day.addEventListener("mousemove", (e) => {

    let tooltipWidth = 220;

    if (e.pageX + tooltipWidth > window.innerWidth) {

        tooltip.style.left = (e.pageX - tooltipWidth - 20) + "px";

    } else {

        tooltip.style.left = (e.pageX + 15) + "px";

    }

    tooltip.style.top = (e.pageY + 15) + "px";

});

day.addEventListener("mouseleave", () => {

    tooltip.style.display = "none";
});

       

    heatmap.appendChild(day);
}

saveDayBtn.addEventListener("click", () => {

    let study = Number(studyInput.value);
    let sleep = Number(sleepInput.value);
    let food = Number(foodInput.value);
    let fitness = Number(fitnessInput.value);
    let extra = Number(extraInput.value);

    if (study > 5 || sleep > 2 || food > 1 || fitness > 1 || extra > 1) {

        alert("INVALID VALUES");

        return;
    }

    let total =
        study +
        sleep +
        food +
        fitness +
        extra;

        
        if (total >= 9) {
    godStreak++;
} else {
    godStreak = 0;
}

godStreakDisplay.textContent =
    `🔥 GOD STREAK: ${godStreak} DAYS`;



        currentDay.dataset.study = study;
currentDay.dataset.sleep = sleep;
currentDay.dataset.food = food;
currentDay.dataset.fitness = fitness;
currentDay.dataset.extra = extra;
currentDay.dataset.total = total;

    localStorage.setItem(
    currentDay.dataset.date,
    JSON.stringify({
        study,
        sleep,
        food,
        fitness,
        extra,
        total
    })
);

    currentDay.classList.remove(
        "red",
        "yellow",
        "green",
        "purple"
    );

    if (total >= 1 && total <= 3) {
        currentDay.classList.add("red");
    }

    else if (total >= 4 && total <= 6) {
        currentDay.classList.add("yellow");
    }

    else if (total >= 7 && total <= 8) {
        currentDay.classList.add("green");
    }

    else if (total >= 9 && total <= 10) {
        currentDay.classList.add("purple");
    }

    popupOverlay.style.display = "none";

    studyInput.value = "";
    sleepInput.value = "";
    foodInput.value = "";
    fitnessInput.value = "";
    extraInput.value = "";
});
cancelBtn.addEventListener("click", () => {

    popupOverlay.style.display = "none";

});

for (let day of heatmap.children) {

    const savedData = localStorage.getItem(day.dataset.date);

    if (!savedData) continue;

    const data = JSON.parse(savedData);

    day.dataset.study = data.study;
    day.dataset.sleep = data.sleep;
    day.dataset.food = data.food;
    day.dataset.fitness = data.fitness;
    day.dataset.extra = data.extra;
    day.dataset.total = data.total;

    if (data.total <= 3) {
        day.classList.add("red");
    }
    else if (data.total <= 6) {
        day.classList.add("yellow");
    }
    else if (data.total <= 8) {
        day.classList.add("green");
    }
    else {
        day.classList.add("purple");
    }
}

function updateYearCountdown() {
    const today = new Date();

    const endOfYear = new Date(2026, 11, 31);

    const daysLeft = Math.ceil(
        (endOfYear - today) / (1000 * 60 * 60 * 24)
    );

    const percentLeft = ((daysLeft / 365) * 100).toFixed(1);

    document.getElementById("yearCountdown").innerHTML =
        `😬 2026 ENDS IN: <span class="days-left-red">${daysLeft}</span> DAYS (${percentLeft}% REMAINING)`;
}
updateYearCountdown();
