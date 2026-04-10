// frontend/js/api.js

document.getElementById("saveBtn").addEventListener("click", async () => {
  const data = {
    amount: parseFloat(document.getElementById("amount").value),
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    account: document.getElementById("account").value,
    date: document.getElementById("date").value || new Date()
  };

  try {
    const res = await fetch("http://localhost:5000/api/transactions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result);

    document.getElementById("message").innerText = "Transaction Added ✅";

    // Clear form
    document.getElementById("transactionForm").reset();
  } catch (err) {
    console.error(err);
    document.getElementById("message").innerText = "Error adding transaction ❌";
  }
});