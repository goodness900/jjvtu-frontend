const BACKEND_URL = "https://jjvtu-backend.yourusername.replit.app";

function login() {
  const username = document.getElementById("username").value;
  if (!username) {
    alert("Enter username");
    return;
  }

  localStorage.setItem("user", username);
  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

async function loadBalance() {
  const res = await fetch(`${BACKEND_URL}/admin/balance`);
  const data = await res.json();
  document.getElementById("balance").innerText = data.balance;
}

async function buyAirtime() {
  const phone = document.getElementById("phone").value;
  const amount = document.getElementById("amount").value;

  if (!phone || !amount) {
    alert("Fill all fields");
    return;
  }

  await fetch(`${BACKEND_URL}/admin/add-money`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: -amount })
  });

  alert("Airtime purchase simulated!");
  loadBalance();
}

if (window.location.pathname.includes("dashboard.html")) {
  loadBalance();
}
