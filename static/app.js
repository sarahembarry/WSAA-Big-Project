// JavaScript fetch-based form submission (see README for references: fetch API, preventDefault, JSON.stringify)

document.getElementById('addStockForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Stop the form from reloading the page

  // Get form input values
  const symbol = document.getElementById('symbol').value;
  const companyName = document.getElementById('companyName').value;

  // Send POST request to Flask API to add new stock
  fetch('/api/stocks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Set request type
    },
    body: JSON.stringify({ // Convert data to JSON
      symbol: symbol,
      company_name: companyName
    })
  })
  .then(response => response.json()) // Pass JSON response
  .then(data => {
    alert(data.message); // Show success message
    document.getElementById('addStockForm').reset(); // Clear form fields
  })
  .catch(err => console.error('Error:', err)); // Log any errors
});
