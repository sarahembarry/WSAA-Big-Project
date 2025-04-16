// JavaScript fetch-based form submission (see README for references: fetch API, preventDefault, JSON.stringify)




// Add new stock to the database using a form (via POST /api/stocks)
document.getElementById('addStockForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const symbol = document.getElementById('symbol').value;
  const companyName = document.getElementById('companyName').value;

  // Send stock data to backend
  fetch('/api/stocks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      symbol: symbol,
      company_name: companyName
    })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message); // Show success message
    document.getElementById('addStockForm').reset(); // Reset form
  })
  .catch(err => console.error('Error:', err));
});



// Search for live stock data by symbol (via GET /api/live/<symbol>)
document.getElementById('searchStockForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const symbol = document.getElementById('searchSymbol').value;

  // Fetch stock data from backend
  fetch(`/api/live/${symbol}`)
    .then(response => response.json())
    .then(data => {
      // Display stock info
      const result = `
        <div class="alert alert-info">
          <strong>${symbol.toUpperCase()}</strong><br>
          Price: ${data.price}<br>
          Date: ${data.timestamp}
        </div>
      `;
      document.getElementById('liveStockResult').innerHTML = result;
      document.getElementById('searchStockForm').reset();
    })
    .catch(err => {
      console.error('Error:', err);
      document.getElementById('liveStockResult').innerHTML =
        `<div class="alert alert-danger">Stock not found</div>`;
    });
});



// Load all stocks and show "Add to Watchlist" buttons
function loadStocks() {
  fetch('/api/stocks/')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('stocksContainer');
      container.innerHTML = ''; // Clear previous results

      data.forEach(stock => {
        const stockCard = `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>${stock.symbol}</strong> - ${stock.company_name}
            </div>
            <button class="btn btn-sm btn-success" onclick="addToWatchlist(${stock.id})">
              Add to Watchlist
            </button>
          </div>
        `;
        container.innerHTML += stockCard;
      });
    })
    .catch(err => console.error('Error loading stocks:', err));
}

// Run when page loads
window.onload = function () {
  loadStocks();
};



// Add stock to watchlist by ID (via POST /api/watchlist)
function addToWatchlist(stockId) {
  fetch('/api/watchlist/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      stock_id: stockId
    })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message); // Confirm added to watchlist
  })
  .catch(err => console.error('Error:', err));
}
