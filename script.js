let expenses = [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addBtn").addEventListener("click", addExpense);
    document.getElementById("filter").addEventListener("change", filterExpenses);
    document.getElementById("clearBtn").addEventListener("click", clearAll);

    displayExpenses(expenses);
});

function addExpense() {
    const desc = document.getElementById("desc").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (!desc || isNaN(amount) || amount <= 0) {
        alert("Enter valid data");
        return;
    }

    expenses.push({ desc, amount, category });

    displayExpenses(expenses);

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function displayExpenses(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    if (data.length === 0) {
        list.innerHTML = "<p>No expenses found</p>";
        document.getElementById("total").innerText = 0;
        return;
    }

    data.forEach((exp, index) => {
        total += exp.amount;

        const li = document.createElement("li");

        li.innerHTML = `
            ${exp.desc} - ₹${exp.amount} (${exp.category})
            <button onclick="deleteExpense(${index})">❌</button>
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
    const category = document.getElementById("filter").value;

    if (category === "All") {
        displayExpenses(expenses);
    } else {
        const filtered = expenses.filter(e => e.category === category);
        displayExpenses(filtered);
    }
}

function clearAll() {
    if (!confirm("Delete all expenses?")) return;

    expenses = [];
    displayExpenses(expenses);
}
