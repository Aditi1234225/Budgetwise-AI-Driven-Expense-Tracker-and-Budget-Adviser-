// frontend/js/dashboard.js

async function loadDashboard() {
  try {
    const res = await fetch("http://localhost:5000/api/transactions");
    const data = await res.json();

    let income = 0, expense = 0;

    data.forEach(t => {
      if (t.amount >= 0) income += t.amount;
      else expense += t.amount;
    });

    const balance = income + expense;

    document.getElementById("income").innerText = income.toFixed(2);
    document.getElementById("expense").innerText = Math.abs(expense).toFixed(2);
    document.getElementById("balance").innerText = balance.toFixed(2);

    // Recent 5 transactions
    const recentDiv = document.getElementById("recent");
    recentDiv.innerHTML = "";
    const recent = data.slice(-5).reverse();
    recent.forEach(t => {
      recentDiv.innerHTML += `
        <div>
          ${t.description || "No Description"} - ₹${t.amount} (${t.category})
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
  }
}

loadDashboard();