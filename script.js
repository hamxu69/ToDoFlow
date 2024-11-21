const inputField = document.querySelector(".inputText");
inputField.addEventListener("input", () => {
  inputField.style.borderColor = "";
});
function clear() {
  inputField.value = "";
}
function save() {
  if (inputField.value === "") {
    inputField.style.borderColor = "red";
    inputField.style.borderWidth = "2px";
    alert("Add a Task first!");
  } else {
    const newContainer = document.createElement("div");
    const newText = document.createElement("div");
    const checkDiv = document.createElement("div");
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    newContainer.className = "childCont";
    newText.className = "test";
    checkDiv.className = "check";
    const childContainer = document.querySelector(".childCont");
    const parentContainer = document.querySelector(".container");
    const noTasksMessage = document.querySelector("#noTasks");
    noTasksMessage.style.display = "none";
    newText.textContent = inputField.value;
    newContainer.appendChild(checkDiv);
    newContainer.appendChild(newText);
    parentContainer.appendChild(newContainer);
    newContainer.appendChild(removeButton);
    newContainer.addEventListener("click", () => {
      checkDiv.classList.toggle("uncheck");
    });
    removeButton.addEventListener("click", () => {
      newContainer.remove();
      if (parentContainer.children.length === 1) {
        noTasksMessage.style.display = "block";
        console.log(parentContainer.children);
      }
    });
    inputField.value = "";
  }
}
// tmr we will add localStorage!
