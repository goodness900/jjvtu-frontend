// DOM Elements for Data
const dataPhoneInput = document.getElementById("dataPhone");
const dataPlanInput = document.getElementById("dataPlan");
const dataAmountInput = document.getElementById("dataAmount");
const buyDataBtn = document.getElementById("buyDataBtn");

// Buy Data Function
async function buyData() {
  const phone = dataPhoneInput.value.trim();
  const plan = dataPlanInput.value.trim();
  const amount = Number(dataAmountInput.value);

  if (!phone || !plan || amount <= 0) {
    alert("Please fill all data fields correctly");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/admin/add-money`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: -amount }) // simulate data deduction
    });

    if (!res.ok) {
      alert("Server error! Try again later.");
      return;
    }

    alert(`Data purchase of ${plan} for ₦${amount} successful!`);
    loadBalance();

    // Clear inputs
    dataPhoneInput.value = "";
    dataPlanInput.value = "";
    dataAmountInput.value = "";

  } catch (err) {
    console.error(err);
    alert("Error connecting to backend");
  }
}

// Event listener for Buy Data
buyDataBtn.addEventListener("click", buyData);