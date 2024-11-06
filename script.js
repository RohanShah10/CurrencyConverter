// apiKey and apiUrl for exchangerate-api.com
const apiKey = "95c242037bd6092a528b5ce7";
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

document.addEventListener("DOMContentLoaded", () => {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const amount = document.getElementById("amount");
  const convertButton = document.getElementById("convertButton");
  const result = document.getElementById("result");

  // Fetch currency codes from API and place in dropdown menu
  fetch(apiURL + "USD")
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.conversion_rates);
      currencies.forEach((currency) => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.text = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.text = currency;
        toCurrency.appendChild(option2);
      });
      fromCurrency.value = "USD";
      toCurrency.value = "EUR";
    })
    .catch((error) => {
      console.error("Error fetching currency data:", error);
      alert("Failed to load currency data. Please check your API key.");
    });

  // Convert currency when button is clicked
  convertButton.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);

    if (isNaN(amountValue) || amountValue <= 0) {
      result.textContent = "Please enter a valid amount.";
      return;
    }

    fetch(apiURL + from)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rates[to];
        const convertedAmount = (amountValue * rate).toFixed(2);
        result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
      })
      .catch((error) => {
        console.error("Error fetching conversion rate:", error);
        result.textContent = "Error retrieving conversion rate.";
      });
  });
});
