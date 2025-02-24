document.addEventListener("DOMContentLoaded", () => {
  let deferredPrompt;
  const heading = document.getElementById("heading");
  const description = document.getElementById("description");
  const installBtn = document.getElementById("install-btn");

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;

    installBtn.style.display = "block"; // Show the install button when the event is fired

    // Listen for the button click to trigger the install prompt
    installBtn.addEventListener("click", () => {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");

          heading.textContent = "Thank you for installing the app!";
          description.textContent = "We appreciate your support!";
          installBtn.style.display = "none"; // Hide the install button after installation
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  });

  document.addEventListener("scroll", () => {
    if (deferredPrompt) {
      installBtn.style.display = "block";
    }
  });

  document.addEventListener("tap", () => {
    if (deferredPrompt) {
      installBtn.style.display = "block";
    }
  });

  if (window.matchMedia("(display-mode: standalone)").matches) {
    heading.textContent = "Thank you for installing the app!";
    description.textContent = "We appreciate your support!";
    installBtn.style.display = "none";
  }
});
const taskDiv = document.getElementById("taskDiv");
const popup = document.getElementById("inputDiv");
const overlay = document.getElementById("overlay");
const tasklist = document.getElementById("taskList");

// Date function to update day and date dynamically
function dates() {
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const monthName = months[today.getMonth()];
  const datePoints = document.querySelector(".date-points");
  datePoints.innerHTML = `${date} ${monthName}`;
  const dateBox = document.querySelector(".date-box");
  dateBox.innerHTML = `
          <div class="day">${dayName}</div>
          <div class="date">${date}</div>
      `;
}

// Function to generate unique ID for each task
let newId = function generateID() {
  return Math.floor(100 + Math.random() * 900).toString();
};

// Initialize filtered array for tasks, get it from localStorage if available
let filteredArr = JSON.parse(localStorage.getItem("tasks")) || [];
// Update the total aura displayed in the UI

// Function to show input popup for adding a task
function inputPopup() {
  const justDoItDiv = document.querySelector(".justDoIt");
  popup.style.display = "flex";
  overlay.style.display = "block";
  justDoItDiv.style.display = "none";
  overlay.style.opacity = "1";
  overlay.style.visibility = "visible";
}

// Function to handle task creation from popup
function actionPopup() {
  const taskName = document.querySelector(".task-name").value.trim();
  const startTime = formatTime(document.querySelector(".start-time").value);
  const deadlineTime = formatTime(
    document.querySelector(".deadline-time").value
  );
  const selectedCategory = document.querySelector(".category-btn.selected");
  const selectedAura = document.querySelector(".aura-btn.selected");

  if (
    taskName &&
    startTime &&
    deadlineTime &&
    selectedCategory &&
    selectedAura
  ) {
    document.getElementById("inputDiv").style.display = "none";
    showPopup("successDiv");

    const auraValue = selectedAura.textContent.match(/\d+/)[0];

    const taskDetails = {
      id: newId(),
      taskName,
      startTime,
      deadlineTime,
      category: selectedCategory.textContent.trim(),
      aura: Number(auraValue),
      checkStatus: "unchecked", // Initially tasks are unchecked
    };

    filteredArr.push(taskDetails);
    localStorage.setItem("tasks", JSON.stringify(filteredArr));
    filterTasks("all");
  } else {
    document.getElementById("inputDiv").style.display = "none";
    showPopup("enterDiv");
  }
}

// Function to format time to AM/PM format
function formatTime(time) {
  if (!time) return "";
  let [hours, minutes] = time.split(":").map(Number);
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

// Function to display success or error popup
function showPopup(popupId) {
  const popupT = document.getElementById(popupId);
  popupT.style.opacity = "1";
  popupT.style.visibility = "visible";

  if (popupId !== "warningDiv") {
    setTimeout(() => {
      popupT.style.opacity = "0";
      popupT.style.visibility = "hidden";
      if (
        !document.querySelector(
          ".task-added-popup[style*='visible'], .enter-input-popup[style*='visible']"
        )
      ) {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
      }
    }, 2000);
  }
}

// Function to close the warning popup
function closePopup() {
  document.getElementById("warningDiv").style.opacity = "0";
  document.getElementById("warningDiv").style.visibility = "hidden";
  if (
    !document.querySelector(
      ".task-added-popup[style*='visible'], .enter-input-popup[style*='visible'], #inputDiv[style*='display: flex']"
    )
  ) {
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
  }
}

// Function to select a category button for a task
function selectCategory(button) {
  document
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
}

// Function to select an aura button for a task
function selectAura(button) {
  document
    .querySelectorAll(".aura-btn")
    .forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
}
function filterTasks(category) {
  console.log("Selected category:", category); // Debugging line

  // Get the dropdown label element
  const dropdownLabel = document.querySelector(".dropdown-label");

  // Update the label text with the selected category
  dropdownLabel.innerHTML = `${
    category.charAt(0).toUpperCase() + category.slice(1)
  } <span class="task-count">69</span>`;

  // Filter tasks based on the selected category
  const filteredTasks =
    category === "all"
      ? filteredArr
      : filteredArr.filter((task) => task.category === category);

  // Update the task count
  updateTaskCount(filteredTasks);

  // Render the tasks based on the filtered list
  render(filteredTasks);

  // Close the dropdown menu (optional)
  document.getElementById("touch").checked = false;
}

function updateTaskCount(filteredTasks) {
  const taskCountElement = document.querySelector(".task-count");
  if (taskCountElement) {
    taskCountElement.innerText = filteredTasks.length; // Update task count
  }
}
// Function to render tasks to the UI
function render(filtered) {
  let html = "";
  if (filtered.length === 0) {
    html += `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: bold; text-align: center; font-size: 20px; color:rgb(119, 117, 117);">Behold, there are no tasks left in your realm of responsibility.</div>`;
  } else {
    filtered.forEach((el) => {
      html += `<div class="task" id="task-${el.id}">
                  <div class="checkbox-wrapper-15">
                      <input class="inp-cbx" id="checkBox-${
                        el.id
                      }" type="checkbox" onclick="toggleStatus(event)" style="display: none" ${
        el.checkStatus === "checked" ? "checked" : ""
      } />
                      <label class="cbx" for="checkBox-${el.id}">
                          <span>
                              <svg width="12px" height="9px" viewbox="0 0 12 9">
                                  <polyline points="1 5 4 8 11 1"></polyline>
                              </svg>
                          </span>
                          <span style="font-size: larger">${el.taskName}</span>
                      </label>
                  </div>
                  <span class="task-time">Aura ${el.aura}+</span>
                  <div class="lower">
                      <span class="task-time">${el.startTime} - ${
        el.deadlineTime
      }</span>
                      <div class="category" onclick="deleteTask('${el.id}')">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                              <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                          </svg>
                      </div>
                  </div>
              </div>`;
    });
  }
  tasklist.innerHTML = html;
}

// Function to toggle the task's completion status and update aura
let totalAura = Number(localStorage.getItem("totalAura")) || 0;

// Update the total aura displayed in the UI and save it to localStorage
function updateAuraCount(auraChange) {
  totalAura += auraChange; // Update total aura count
  const auraElement = document.querySelector(".aura-count");

  if (auraElement) {
    auraElement.innerText = `${totalAura}+ Aura`; // Display the aura count in the UI
  }

  // Save the updated aura count to localStorage
  localStorage.setItem("totalAura", totalAura);
}
function toggleStatus(event) {
  const checkbox = event.target;
  const taskId = checkbox.id.replace("checkBox-", "");
  const taskIndex = filteredArr.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    const task = filteredArr[taskIndex];
    const aura = task.aura;

    if (checkbox.checked) {
      // Add aura when checked
      task.checkStatus = "checked";
      updateAuraCount(aura); // Update the UI with the new aura count
    } else {
      // Subtract aura when unchecked
      task.checkStatus = "unchecked";
      updateAuraCount(-aura); // Update the UI with the subtracted aura count
    }

    // Update the task's check status in the array and localStorage
    localStorage.setItem("tasks", JSON.stringify(filteredArr));
  }
}

// Function to delete a task from the list
function deleteTask(taskId) {
  const taskIndex = filteredArr.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    const task = filteredArr[taskIndex];
    const taskAura = task.aura;

    // Remove the task from the array
    filteredArr.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(filteredArr));
    filterTasks("all");
  }
}

// Initialize date, aura, and render tasks
dates();
document.addEventListener("DOMContentLoaded", function () {
  filterTasks("all");
  const auraElement = document.querySelector(".aura-count");
  if (auraElement) {
    auraElement.innerText = `${totalAura}+ Aura`; // Display aura count from localStorage
  }
});
function toggle() {
  const justDoItDiv = document.querySelector(".justDoIt");

  if (
    justDoItDiv.style.opacity === "0" ||
    justDoItDiv.style.display === "none"
  ) {
    justDoItDiv.style.display = "flex"; // Make it visible first

    justDoItDiv.style.opacity = "1";
    justDoItDiv.style.transform = "translateY(0)";
    // Small delay to allow transition to take effect
  } else {
    justDoItDiv.style.opacity = "0";
    justDoItDiv.style.transform = "translateY(-10px)";
    justDoItDiv.style.display = "none";
    // Wait for transition before hiding
  }
}

// Apply initial styles when page loads
document.addEventListener("DOMContentLoaded", () => {
  const justDoItDiv = document.querySelector(".justDoIt");
  justDoItDiv.style.position = "absolute";
  justDoItDiv.style.top = "120px";
  justDoItDiv.style.flexDirection = "column";
  justDoItDiv.style.gap = "10px";
  justDoItDiv.style.opacity = "0";
  justDoItDiv.style.transform = "translateY(-10px)";
  justDoItDiv.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  justDoItDiv.style.display = "none"; // Ensure it's hidden initially
});

inputValue.addEventListener("input", function () {
  this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.log("Service Worker Failed", err));
}

window.onload = () => {
  render(filteredArr);
};
