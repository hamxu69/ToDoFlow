const inputField = document.querySelector(".inputText");
const noTasks = document.querySelector("#noTasks");
const parentDiv = document.querySelector(".container");
const characters = "HamzaZenin69726897361639806923";

function clearInput() {
  inputField.value = "";
}
function generateRandomId() {
  let randomId = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }
  return randomId;
}

function saveInput() {
  const id = generateRandomId();
  if (inputField.value.trim() === "") {
    inputField.classList.add("empty");
    alert("The input field is empty!");
  } else {
    const context = inputField.value;

    const childDiv = document.createElement("div");
    childDiv.className = "childCont";
    childDiv.id = `div-${id}`;
    childDiv.innerHTML = `
      <div class="check"></div>
      <div class="test" readonly>${context}</div>
      <button id="btn-${id}">&#10006;</button>
    `;

    parentDiv.appendChild(childDiv);
    const checkToggle = childDiv.querySelector(".check");
    childDiv.addEventListener("click", () => {
      checkToggle.classList.toggle("uncheck");
    });

    const removeButton = document.getElementById(`btn-${id}`);
    removeButton.addEventListener("click", () => {
      const tobeRemoved = document.getElementById(`div-${id}`);
      if (tobeRemoved) {
        tobeRemoved.remove();
        parentDiv.children.length === 1
          ? (noTasks.style.display = "block")
          : (noTasks.style.display = "none");
      }
    });

    noTasks.style.display = "none";
    inputField.value = "";
  }
}