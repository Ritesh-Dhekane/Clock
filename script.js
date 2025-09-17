// ========== CLOCK ==========
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const month = now.toLocaleDateString('en-US', { month: 'long' });
  const date = now.getDate();

  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
  document.getElementById("date").textContent = `${day}, ${month} ${date}`;
}
setInterval(updateClock, 1000);
updateClock();

// ========== STOPWATCH ==========
let stopwatchInterval;
let stopwatchTime = 0;

function updateStopwatch() {
  let hours = Math.floor(stopwatchTime / 3600);
  let minutes = Math.floor((stopwatchTime % 3600) / 60);
  let seconds = stopwatchTime % 60;

  document.getElementById("stopwatch-hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("stopwatch-minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("stopwatch-seconds").textContent = String(seconds).padStart(2, '0');
}

document.getElementById("stopwatch-start").addEventListener("click", () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatch();
    }, 1000);
  }
});

document.getElementById("stopwatch-pause").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

document.getElementById("stopwatch-reset").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchTime = 0;
  updateStopwatch();
});

updateStopwatch();

// ========== TIMER ==========
let timerInterval;
let timerTime = 600; // default 10 minutes

function updateTimer() {
  let minutes = Math.floor(timerTime / 60);
  let seconds = timerTime % 60;

  document.getElementById("timer-minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("timer-seconds").textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
  if (!timerInterval && timerTime > 0) {
    timerInterval = setInterval(() => {
      timerTime--;
      updateTimer();

      if (timerTime <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("⏰ Time’s up!");
      }
    }, 1000);
  }
}

document.getElementById("timer-start").addEventListener("click", startTimer);

document.getElementById("timer-pause").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.getElementById("timer-reset").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerTime = 600;
  updateTimer();
});

document.querySelectorAll(".timer-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.minutes) {
      timerTime = parseInt(btn.dataset.minutes) * 60;
      updateTimer();
    }
  });
});

document.getElementById("custom-start").addEventListener("click", () => {
  const customMinutes = parseInt(document.getElementById("custom-minutes").value);
  if (customMinutes > 0) {
    timerTime = customMinutes * 60;
    updateTimer();
    startTimer();
  }
});

updateTimer();

// ========== CALENDAR ==========
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month = currentMonth, year = currentYear) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let html = `<div class="calendar-header">
                <button id="prev-month">&#8592;</button>
                <h3>${new Date(year, month).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h3>
                <button id="next-month">&#8594;</button>
              </div>`;
  html += "<table><tr>";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(day => { html += `<th>${day}</th>`; });
  html += "</tr><tr>";

  for (let i = 0; i < firstDay; i++) html += "<td></td>";

  for (let date = 1; date <= lastDate; date++) {
    if ((firstDay + date - 1) % 7 === 0) html += "</tr><tr>";
    const isToday =
      date === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();
    html += `<td class="${isToday ? "today" : ""}">${date}</td>`;
  }

  html += "</tr></table>";
  document.getElementById("apple-calendar").innerHTML = html;

  // Navigation buttons
  document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  });

  document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
  });
}

// Initial calendar render
generateCalendar();


// ========== FEATURE TOGGLE ==========
function showSection(sectionId, btnId) {
  document.querySelectorAll(".feature-section").forEach((sec) => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");

  document.querySelectorAll(".control-btn").forEach((btn) =>
    btn.classList.remove("active")
  );
  document.getElementById(btnId).classList.add("active");
}

// Button listeners
document.getElementById("clock-btn").addEventListener("click", () => {
  showSection("clock", "clock-btn");
});
document.getElementById("stopwatch-btn").addEventListener("click", () => {
  showSection("stopwatch", "stopwatch-btn");
});
document.getElementById("timer-btn").addEventListener("click", () => {
  showSection("timer", "timer-btn");
});
document.getElementById("calendar-btn").addEventListener("click", () => {
  showSection("calendar", "calendar-btn");
});

// ========== THEMES ==========
document.getElementById("theme-btn").addEventListener("click", () => {
  document.body.classList.toggle("theme-light");
});
