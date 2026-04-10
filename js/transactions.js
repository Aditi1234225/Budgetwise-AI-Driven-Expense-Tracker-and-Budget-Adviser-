// frontend/js/transactions.js

let editId = null; // Edit साठी selected transaction ID

// Load all transactions and display
async function loadTransactions() {
    const res = await fetch("http://localhost:5000/api/transactions");
    const data = await res.json();

    let html = "";
    data.forEach(t => {
        html += `
        <div class="transaction-item">
            <strong>${t.description}</strong> - ${t.amount} [${t.category}]
            <button onclick="editTx('${t._id}')">Edit</button>
            <button onclick="deleteTx('${t._id}')">Delete</button>
        </div>
        `;
    });

    document.getElementById("list").innerHTML = html;
}

// Add or Update transaction
async function saveTransaction() {
    const data = {
        amount: document.getElementById("amount").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        account: document.getElementById("account").value,
        date: document.getElementById("date").value
    };

    if (editId) {
        // Update existing transaction
        const res = await fetch(`http://localhost:5000/api/transactions/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        console.log("Updated:", result);
        editId = null; // Reset edit
    } else {
        // Add new transaction
        const res = await fetch("http://localhost:5000/api/transactions/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        console.log("Added:", result);
    }

    resetForm();
    loadTransactions();
}

// Delete transaction
async function deleteTx(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE"
    });
    const result = await res.json();
    console.log("Deleted:", result);
    loadTransactions();
}

// Edit transaction
async function editTx(id) {
    const res = await fetch("http://localhost:5000/api/transactions");
    const data = await res.json();
    const tx = data.find(t => t._id === id);

    document.getElementById("amount").value = tx.amount;
    document.getElementById("description").value = tx.description;
    document.getElementById("category").value = tx.category;
    document.getElementById("account").value = tx.account;
    document.getElementById("date").value = tx.date.split("T")[0];

    editId = id; // Set current edit ID
}

// Reset form
function resetForm() {
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("account").value = "";
    document.getElementById("date").value = "";
}

document.getElementById("saveBtn").addEventListener("click", saveTransaction);

// Initial load
loadTransactions();