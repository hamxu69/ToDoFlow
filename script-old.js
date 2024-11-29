// Constant variable who will remain unchanged in whole code can be placed at top (Feels good to me but optional):p
// This is good :D
const inputField = document.querySelector(".inputText");
// const noTasks = document.querySelector("#noTasks");
const parentDiv = document.querySelector(".container");
// const characters = "HamzaZenin69726897361639806923";

// If you hover over the function it will display little box about how the fucntion works
// void = returns nothing (technically it returns undefined)

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

    // noTasks.style.display = "none";
    // Can be done using CSS selectors, faster computing time BUT limited to handle less logic
    // body:has(.childCont) #noTasks {
    //     display: none;
    // }

    // inputField.value = "";
    // reuse the function you made :D
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
    // Template string method is far more convenient than appending each element again and again!
    // | |
    // | |
    // |-|
    // \ /
    //  v
    //
    // Yes lol it is (Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') - CWE 79 severity 8.8 => https://fossa.com/blog/all-about-cwe-79-cross-site-scripting/)
    // Sorry if this sounded rude or something
    // I could steal your cookies and log into your bank account (if this was on server)
    // <div class="test" readonly>${EntryText}</div> This inserts anything I paste in input, it doesn't execute right now since the page cant keep the data but
    // If you implement the LocalStorage and insert <script>Alert("Hello World")</script>, then every time you refresh the page it will prompt you with hello world

    // Div can't be readonly :D
    childDiv.innerHTML = `
      <div class="check"></div>
      <div class="test">${EntryText}</div>
      <button id="btn-${id}">&#10006;</button>
    `;

    parentDiv.appendChild(childDiv);
    // For toggle classList.toggle will be used since it saves space!
    childDiv.addEventListener("click", () => {
        // This is great :D you can further make it better by removing the unnecessary variable
        // On this top, it is not always good to write everything in one line
        // but as long as it is easily readable it could be potential to save memory by not assigning a variable
        // especially when you do not plan on using it later on
        childDiv.querySelector(".check").classList.toggle("uncheck");
    });

    const removeButton = document.getElementById(`btn-${id}`);
    removeButton.addEventListener("click", () => {
        document.getElementById(`div-${id}`).remove();

        // Unnecessary check, the element will exist since you just created and since you clicked this tobeRemoved will always be true
        // const tobeRemoved = document.getElementById(`div-${id}`);
        // if (tobeRemoved) {
        //tobeRemoved.remove();
        //
        // From now on Ternary Operator will be used for single line changes instead of ifelse. Great :D
        //
        // parentDiv.children.length === 1
        //    ? (noTasks.style.display = "block")
        //    : (noTasks.style.display = "none");
        //
        // Can be done using CSS selectors, faster computing time BUT limited to handle less logic
        // body:has(.childCont) #noTasks {
        //     display: none;
        //
    });
}