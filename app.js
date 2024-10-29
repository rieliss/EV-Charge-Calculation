function toggleInputs() {
  const mode = document.getElementById("calculation-mode").value;
  const expectBatteryRow = document.getElementById("expect-battery-row");
  const chargeTimeRow = document.getElementById("charge-time-row");

  if (mode === "price") {
    const resultElement = document.getElementById("result");
    expectBatteryRow.style.display = "flex";
    chargeTimeRow.style.display = "none";
  } else {
    expectBatteryRow.style.display = "none";
    chargeTimeRow.style.display = "flex";
  }
}

function calculate() {
  const mode = document.getElementById("calculation-mode").value;
  const max = parseFloat(document.getElementById("max").value);
  const price = parseFloat(document.getElementById("price").value);
  const percentBattery = parseFloat(
    document.getElementById("percent_battery").value
  );

  if (mode === "price") {
    const expectBattery = parseFloat(
      document.getElementById("expect_battery").value
    );
    calculatePrice(max, price, percentBattery, expectBattery);
  } else {
    const chargeTime = parseFloat(document.getElementById("charge_time").value);
    calculateBatteryGain(max, price, percentBattery, chargeTime);
  }
}

function calculatePrice(max, price, percentBattery, expectBattery) {
  console.log("Input values:", { max, price, percentBattery, expectBattery });

  const energyNeeded = (max * (expectBattery - percentBattery)) / 100;
  const totalPrice = energyNeeded * price;
  const chargingTime = (energyNeeded / max) * 60;

  console.log("Calculated values:", { energyNeeded, totalPrice, chargingTime });

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `
    <h2>Price Calculation Result:</h2>
    <p>Energy needed: ${energyNeeded.toFixed(2)} kWh</p>
    <p>Total price: $${totalPrice.toFixed(2)}</p>
    <p>Estimated charging time: ${chargingTime.toFixed(2)} minutes</p>
  `;
}

function calculateBatteryGain(max, price, percentBattery, chargeTime) {
  console.log("Input values:", { max, price, percentBattery, chargeTime });

  const maxChargingRate = max / 60; // kWh per minute
  const energyGained = maxChargingRate * chargeTime;
  const percentageGained = (energyGained / max) * 100;
  const newBatteryPercentage = Math.min(percentBattery + percentageGained, 100);
  const totalPrice = energyGained * price;

  console.log("Calculated values:", {
    energyGained,
    percentageGained,
    newBatteryPercentage,
    totalPrice,
  });

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `
    <h2>Battery Gain Calculation Result:</h2>
    <p>Energy gained: ${energyGained.toFixed(2)} kWh</p>
    <p>Percentage gained: ${percentageGained.toFixed(2)}%</p>
    <p>New battery percentage: ${newBatteryPercentage.toFixed(2)}%</p>
    <p>Total price: $${totalPrice.toFixed(2)}</p>
  `;
}
toggleInputs();

window.toggleInputs = toggleInputs;
window.calculate = calculate;