// Constant variable who will remain unchanged in whole code can be placed at top (Feels good to me but optional):p
const inputField = document.querySelector(".inputText");
const parentDiv = document.querySelector(".container");

/**
 * Clears the value of the input field.
 *
 * @returns {void}
 */
function clearInput() {
    inputField.value = "";
}

/**
 * Generates Random ID and returns it
 *
 * @returns {int}
 */
function generateRandomId() {
    return Math.floor(100 + Math.random() * 900);
}

/**
 * Validates and saves user input
 *
 * @returns {void}
 */
function saveInput() {
    const entryID = generateRandomId();
    // Trim can be used inside inputs if user just adds spaces and tries to save it'll through an error!
    if (inputField.value.trim() === "") {
        inputField.classList.add("empty");
        alert("The input field is empty!");
    } else {
        const context = inputField.value;
        loadNewEntry(context,entryID);
        clearInput();
    }
}

/**
 * Displays new entry on the screen
 *
 * @param {string} EntryText User input
 * @param {int} id Randomly generated entry ID
 * @returns {void}
 */
function loadNewEntry(EntryText, id) {
    const childDiv = document.createElement("div");
    //Giving id , Class directly:
    childDiv.className = "childCont";
    childDiv.id = `div-${id}`;

    childDiv.innerHTML = `
      <div class="check"></div>
      <div class="test">${EntryText}</div>
      <button id="btn-${id}">&#10006;</button>
    `;

    parentDiv.appendChild(childDiv);
    // For toggle classList.toggle will be used since it saves space!
    childDiv.addEventListener("click", () => {
        childDiv.querySelector(".check").classList.toggle("uncheck");
    });

    const removeButton = document.getElementById(`btn-${id}`);
    removeButton.addEventListener("click", () => {
        document.getElementById(`div-${id}`).remove();
    });
}