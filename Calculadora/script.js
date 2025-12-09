const display = document.getElementById("display");
const historyList = document.getElementById("history-list");

let currentValue = "";
let firstValue = null;
let operator = null;

document.querySelectorAll("[data-num]").forEach(button => {
    button.addEventListener("click", () => {
        currentValue += button.dataset.num;
        display.textContent = currentValue;
    });
});

document.querySelectorAll("[data-op]").forEach(button => {
    button.addEventListener("click", () => {
        if (currentValue === "") return;

        firstValue = parseFloat(currentValue);
        operator = button.dataset.op;
        currentValue = "";
    });
});

document.getElementById("equals").addEventListener("click", () => {
    if (firstValue === null || currentValue === "" || !operator) return;

    let secondValue = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
        case "+": result = firstValue + secondValue; break;
        case "-": result = firstValue - secondValue; break;
        case "*": result = firstValue * secondValue; break;
        case "/": 
            if (secondValue === 0) {
                display.textContent = "Erro";
                return;
            }
            result = firstValue / secondValue;
        break;
    }

    display.textContent = result;

    addToHistory(`${firstValue} ${operator} ${secondValue} = ${result}`);

    currentValue = result.toString();
    firstValue = null;
    operator = null;
});

document.getElementById("clear").addEventListener("click", () => {
    currentValue = "";
    firstValue = null;
    operator = null;
    display.textContent = "0";
});

function addToHistory(text) {
    const li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", () => {
        const result = text.split(" = ")[1];
        display.textContent = result;
        currentValue = result;
    });

    historyList.prepend(li);
}
