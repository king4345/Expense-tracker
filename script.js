let expenses = [];

// Load data when page starts
document.addEventListener("DOMContentLoaded", () => {
    loadExpenses();
    displayExpenses(expenses);
});

// Event listeners
document.getElementById("addBtn").addEventListener("click", addExpense);
document.getElementById("filter").addEventListener("change", filterExpenses);
document.getElementById("clearBtn").addEventListener("click", clearAll);

// Add expense
function addExpense() {
    const desc = document.getElementById("desc").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (!desc || isNaN(amount) || amount <= 0) {
        alert("Enter valid data");
        return;
    }

    const expense = {
        id: Date.now(),
        desc,
        amount,
        category
    };

    expenses.push(expense);
    saveExpenses();

    displayExpenses(expenses);
    resetForm();
}

// Display expenses
function displayExpenses(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    if (data.length === 0) {
        list.innerHTML = "<p>No expenses found</p>";
        document.getElementById("total").innerText = 0;
        return;
    }

    let total = 0;

    data.forEach(exp => {
        total += exp.amount;

        const li = document.createElement("li");

        li.innerHTML = `
            ${exp.desc} - ₹${exp.amount} (${exp.category})
        `;

        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.addEventListener("click", () => deleteExpense(exp.id));

        li.appendChild(btn);
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    displayExpenses(expenses);
}

// Filter
function filterExpenses() {
    const category = document.getElementById("filter").value;

    if (category === "All") {
        displayExpenses(expenses);
        return;
    }

    const filtered = expenses.filter(exp => exp.category === category);
    displayExpenses(filtered);
}

// Clear all
function clearAll() {
    if (!confirm("Delete all expenses?")) return;

    expenses = [];
    saveExpenses();
    displayExpenses(expenses);
}

// Reset form
function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").selectedIndex = 0;
}

// Local storage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
    const data = localStorage.getItem("expenses");
    if (data) {
        expenses = JSON.parse(data);
    }
}
