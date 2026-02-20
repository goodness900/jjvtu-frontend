// Replace with your Replit backend URL
const BACKEND_URL = "https://jjvtu-backend.yourusername.replit.app";

// DOM Elements
const balanceEl = document.getElementById("balance");
const airtimeBtn = document.getElementById("buyAirtimeBtn");
const logoutBtn = document.getElementById("logoutBtn");
const phoneInput = document.getElementById("phone");
const amountInput = document.getElementById("amount");

// Data section
const dataPhoneInput = document.getElementById("dataPhone");
const dataPlanInput = document.getElementById("dataPlan");
const dataAmountInput = document.getElementById("dataAmount");
const buyDataBtn = document.getElementById("buyDataBtn");

// Login check
let username = localStorage.getItem("user");
if (!username) window.location.href = "index.html";

// Load wallet balance from backend
async function loadBalance() {
  try {
    const res = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    balanceEl.innerText = data.balance;
  } catch (err) {
    console.error(err);
    alert("Error loading balance");
  }
}

// Buy Airtime
async function buyAirtime() {
  const phone = phoneInput.value.trim();
  const amount = Number(amountInput.value);

  if (!phone || amount <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/buy-airtime`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, amount })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      loadBalance();
      phoneInput.value = "";
      amountInput.value = "";
    } else {
      alert(data);
    }

  } catch (err) {
    console.error(err);
    alert("Error connecting to backend");
  }
}

// Buy Data
async function buyData() {
  const phone = dataPhoneInput.value.trim();
  const plan = dataPlanInput.value.trim();
  const amount = Number(dataAmountInput.value);

  if (!phone || !plan || amount <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/buy-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, amount, dataPlan: plan })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      loadBalance();
      dataPhoneInput.value = "";
      dataPlanInput.value = "";
      dataAmountInput.value = "";
    } else {
      alert(data);
    }

  } catch (err) {
    console.error(err);
    alert("Error connecting to backend");
  }
}

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// Event listeners
airtimeBtn.addEventListener("click", buyAirtime);
buyDataBtn.addEventListener("click", buyData);
logoutBtn.addEventListener("click", logout);

// Initial load
loadBalance();