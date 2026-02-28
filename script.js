let expenses = [];

function addExpense() {
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (desc.trim() === "" || amount <= 0) {
    alert("Please enter valid description and amount");
    return;
}

    let expense = {
        desc: desc,
        amount: Number(amount),
        category: category
    };

    expenses.push(expense);

    displayExpenses(expenses);
}

function displayExpenses(data) {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    data.forEach((e, index) => {
        total += e.amount;

        let li = document.createElement("li");

        li.innerHTML = `
            ${e.desc} - ₹${e.amount} (${e.category})
            <button onclick="deleteExpense(${index})">Delete</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses(expenses);
}

function filterExpenses() {
    let category = document.getElementById("filter").value;

    let filtered = expenses.filter(e => e.category === category);

    displayExpenses(filtered);
}

function clearAll() {
    expenses = [];
    displayExpenses(expenses);
}