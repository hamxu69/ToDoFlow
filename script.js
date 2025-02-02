document.addEventListener('DOMContentLoaded', () => {
  let deferredPrompt; 
  const heading = document.getElementById('heading');
  const description = document.getElementById('description');
  const installBtn = document.getElementById('install-btn');

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    
    installBtn.style.display = 'block'; // Show the install button when the event is fired
    
    // Listen for the button click to trigger the install prompt
    installBtn.addEventListener('click', () => {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          
          heading.textContent = 'Thank you for installing the app!';
          description.textContent = 'We appreciate your support!';
          installBtn.style.display = 'none'; // Hide the install button after installation
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });
  });

  document.addEventListener('scroll', () => {
    if (deferredPrompt) {
      installBtn.style.display = 'block'; 
    }
  });

  document.addEventListener('tap', () => {
    if (deferredPrompt) {
      installBtn.style.display = 'block';
    }
  });

  if (window.matchMedia('(display-mode: standalone)').matches) {
    heading.textContent = 'Thank you for installing the app!';
    description.textContent = 'We appreciate your support!';
    installBtn.style.display = 'none';
  }
});

const checkBox = document.querySelector("#checkBox");
const sheet = document.querySelector("#sheet");
const popUp = document.querySelector("#popUp");
const inputValue = document.querySelector("#taskText");
const Category = document.querySelector("#taskCategory");
const allCount = document.querySelector("#allCount");
const personalCount = document.querySelector("#personalCount");
const workCount = document.querySelector("#workCount");
const hobbiesCount = document.querySelector("#hobbiesCount");
const tasklist = document.querySelector("#taskAppend");
const formattedDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "short",
});
let localArr = JSON.parse(localStorage.getItem("localArr")) || [];
function inputPopup() {
  popUp.style.display === "none" && sheet.style.display === "none"
    ? ((popUp.style.display = "flex"), (sheet.style.display = "block"))
    : ((popUp.style.display = "none"), (sheet.style.display = "none"));
}
function addTask() {
  inputValue.value.trim() !== "" && Category.value.trim() !== ""
    ? (showPopup(),
      pushToLocal(),
      (popUp.style.display = "none"),
      (sheet.style.display = "none"))
    : showWarningPopup();
}
function pushToLocal() {
  const newId = localArr.length || 0;
  const newtime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  let obj = {
    task: inputValue.value.charAt(0).toUpperCase() + inputValue.value.slice(1),
    category: Category.value,
    checkStatus: "unchecked",
    id: newId,
    time: newtime,
  };
  localArr.push(obj);
  localStorage.setItem("localArr", JSON.stringify(localArr));
  Category.value = "";
  inputValue.value = "";
  filterArr("All");
  filteredCount();
}
function render(filteredArr) {
  let html = "";
  if (filteredArr.length === 0) {
    html += `<img src="icons/notask.png" style="position:absolute; top:50%;">`;
  } else {
    filteredArr.forEach((el) => {
      html += `<div class="taskDiv"  id="task-${el.id}">
            <div class="top">
              <div class="taskDetails">
                <div class="taskcontent">
                  <div class="checkbox-wrapper-15">
                    <input
                      class="inp-cbx"
                      id="checkBox-${el.id}"
                      type="checkbox"
                      onclick="toggleStatus(${el.id})"
                      style="display: none"
                      ${el.checkStatus}
                    />
                    <label class="cbx" for="checkBox-${el.id}">
                      <span>
                        <svg width="12px" height="9px" viewbox="0 0 12 9">
                          <polyline points="1 5 4 8 11 1"></polyline>
                        </svg>
                      </span>
                      <span class="main">${el.task}.</span>
                    </label>
                  </div>
                </div>
              </div>
              <svg
              onclick="deletebtn(${el.id})"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="25"
                height="25"
              >
                <path
                  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                />
              </svg>
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div>Added at: ${el.time}</div>
              <div class="category"> ${el.category}</div>
            </div>
          </div>`;
    });
  }
  tasklist.innerHTML = html;
}
function deletebtn(target) {
  const targetTask = document.querySelector(`#task-${target}`);
  targetTask.remove();
  localArr = localArr.filter((el) => el.id !== target);
  localStorage.setItem("localArr", JSON.stringify(localArr));
  filterArr("All");
}
function filterArr(type) {
  activeCategory(type);
  filteredCount();
  if (type === "All") {
    let allArr = localArr;
    render(allArr);
  }
  if (type === "Personal") {
    let personalArr = localArr.filter((el) => el.category == "Personal");
    render(personalArr);
  }
  if (type === "Work") {
    let workArr = localArr.filter((el) => el.category == "Work");
    render(workArr);
  }
  if (type === "Hobbies") {
    let hobbiesArr = localArr.filter((el) => el.category == "Hobbies");
    render(hobbiesArr);
  }
  document.querySelector("#date").textContent = formattedDate;
}
function filteredCount() {
  let hobbies = 0;
  let work = 0;
  let personal = 0;
  let all = 0;
  localArr.forEach((count) => {
    if (count.category === "Hobbies") {
      hobbies++;
      all++;
    }
    if (count.category === "Work") {
      work++;
      all++;
    }
    if (count.category === "Personal") {
      personal++;
      all++;
    }
  });
  allCount.textContent = all;
  personalCount.textContent = personal;
  workCount.textContent = work;
  hobbiesCount.textContent = hobbies;
}
function activeCategory(type) {
  const allBtns = document.querySelectorAll(".categories button");
  allBtns.forEach((btn) => {
    if (btn.id === type) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
function toggleStatus(target) {
  let status = localArr[target].checkStatus;
  status = status === "unchecked" ? "checked" : "unchecked";
  localArr[target].checkStatus = status;
  localStorage.setItem("localArr", JSON.stringify(localArr));
}
function showPopup() {
  let popup = document.getElementById("popup");
  popup.style.display = "block";

  setTimeout(() => {
    popup.classList.add("show");
  }, 10);

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      popup.style.display = "none";
    }, 200);
  }, 3000);
}
function showWarningPopup() {
  const warningPopup = document.getElementById("warningPopup");
  warningPopup.style.display = "block";

  setTimeout(() => {
    warningPopup.classList.add("show");
  }, 10);

  setTimeout(() => {
    warningPopup.classList.remove("show");
    setTimeout(() => {
      warningPopup.style.display = "none";
    }, 500);
  }, 3000);
}
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
  filterArr("All");
};
