
document.getElementById("start-btn").addEventListener("click", function () {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    document.getElementById("main-app").innerHTML = `
      <div class="container">
        <div class="header">
          <h1>🌿 Your Daily Tasks</h1>
        </div>
        <div class="task-input-section">
          <input type="text" id="task-input" placeholder="Enter task...">
          <input type="number" id="task-time" placeholder="Min" min="1" value="5">
          <button onclick="addTask()">Add Task</button>
        </div>
        <ul id="task-list"></ul>
      </div>
    `;
  });
  
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskTime = document.getElementById("task-time");
    const taskList = document.getElementById("task-list");
    const taskText = taskInput.value.trim();
    const minutes = parseInt(taskTime.value) || 5;
  
    if (taskText === "") return;
  
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.addEventListener("change", () => {
      li.classList.toggle("completed");
    });
  
    const textSpan = document.createElement("span");
    textSpan.textContent = taskText;
  
    const timerSpan = document.createElement("span");
    timerSpan.className = "timer";
    let seconds = minutes * 60;
    timerSpan.textContent = formatTime(seconds);
  
    const interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        timerSpan.textContent = formatTime(seconds);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(timerSpan);
    taskList.appendChild(li);
  
    taskInput.value = "";
    taskTime.value = "5";
  }
  
  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }


  const toggle = document.getElementById("themeToggle");
  const label = document.getElementById("theme-label");

  // Load mode from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
    label.textContent = "Dark Mode";
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    label.textContent = isDark ? "Dark Mode" : "Light Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
