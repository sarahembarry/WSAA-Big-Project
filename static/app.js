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



// load all stocks and display them with action buttons
function loadStocks() {
  fetch('/api/stocks/')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('stocksContainer');
      container.innerHTML = ''; // Clear previous entries

      data.forEach(stock => {
        const stockCard = `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>${stock.symbol}</strong> - ${stock.company_name}
            </div>
            <div>
              <button class="btn btn-sm btn-success me-1" onclick="addToWatchlist(${stock.id})">Watchlist</button>
              <button class="btn btn-sm btn-warning me-1" onclick="updateStock(${stock.id})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteStock(${stock.id})">Delete</button>
            </div>
          </div>
        `;
        container.innerHTML += stockCard;
      });
    })
    .catch(err => console.error('Error loading stocks:', err));
}




// Load all watchlist items  
function loadWatchlist() {
  fetch('/api/watchlist/')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('watchlistContainer');
      container.innerHTML = ''; // Clear previous entries

      data.forEach(item => {
        const watchlistCard = `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>${item.symbol}</strong> - ${item.company_name}
            </div>
            <div>
              <span class="badge bg-secondary">Watchlist</span>
            </div>
          </div>
        `;
        container.innerHTML += watchlistCard;
      });
    })
    .catch(err => console.error('Error loading watchlist:', err));
}







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


// Update a stock's company name
function updateStock(stockId) {
  const newName = prompt("Enter new company name:");
  if (!newName) return;

  fetch(`/api/stocks/${stockId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_name: newName })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadStocks(); // Reload stock list
  })
  .catch(err => console.error('Error updating:', err));
}



// Delete a stock
function deleteStock(stockId) {
  if (!confirm('Are you sure you want to delete this stock?')) return;

  fetch(`/api/stocks/${stockId}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadStocks(); // Reload stock list
  })
  .catch(err => console.error('Error deleting:', err));
}





// Fetch live prices for all stocks
function loadLivePrices() {
  fetch('/api/stocks/')
    .then(response => response.json())
    .then(stocks => {
      const container = document.getElementById('livePricesContainer');
      container.innerHTML = ''; // Clear previous entries

      stocks.forEach(stock => {
        fetch(`/api/live/${stock.symbol}`)
          .then(res => res.json())
          .then(data => {
            const card = `
              <div class="border rounded p-2 mb-2">
                <strong>${stock.symbol}</strong> – ${stock.company_name}<br>
                Price: ${data.price}<br>
                Date: ${data.timestamp}
              </div>
            `;
            container.innerHTML += card;
          })
          .catch(err => console.error(`Error fetching ${stock.symbol}:`, err));
      });
    });
}




window.onload = function () {
  loadStocks();
  loadWatchlist(); 
  loadLivePrices(); 
};
