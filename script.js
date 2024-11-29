// Constant variable who will remain unchanged in whole code can be placed at top (Feels good to me but optional):p
const inputField = document.querySelector(".inputText");
const noTasks = document.querySelector("#noTasks");
const parentDiv = document.querySelector(".container");
const characters = "HamzaZenin69726897361639806923";

function clearInput() {
  inputField.value = "";
}
// Gpt generated but makes things easier!
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
  // Trim can be used inside inputs if user just adds spaces and tries to save it'll through an error!
  if (inputField.value.trim() === "") {
    inputField.classList.add("empty");
    alert("The input field is empty!");
  } else {
    const context = inputField.value;

    const childDiv = document.createElement("div");
    //Giving Id , Class directly:
    childDiv.className = "childCont";
    childDiv.id = `div-${id}`;
    // Template string method is far more convenient than appending each element again and again!
    childDiv.innerHTML = `
      <div class="check"></div>
      <div class="test" readonly>${context}</div>
      <button id="btn-${id}">&#10006;</button>
    `;

    parentDiv.appendChild(childDiv);
    // For toggle classList.toggle will be used since it saves space!
    const checkToggle = childDiv.querySelector(".check");
    childDiv.addEventListener("click", () => {
      checkToggle.classList.toggle("uncheck");
    });

    const removeButton = document.getElementById(`btn-${id}`);
    removeButton.addEventListener("click", () => {
      const tobeRemoved = document.getElementById(`div-${id}`);
      if (tobeRemoved) {
        tobeRemoved.remove();
        // From now on Ternary Operator will be used for single line changes instead of ifelse.
        parentDiv.children.length === 1
          ? (noTasks.style.display = "block")
          : (noTasks.style.display = "none");
      }
    });

    noTasks.style.display = "none";
    inputField.value = "";
  }
}