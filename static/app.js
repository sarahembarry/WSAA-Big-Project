// JavaScript fetch-based form submission (see README for references: fetch API, preventDefault, JSON.stringify)


// Combined Search + Add to Stocks
// Search for live stock data by symbol, show result, allow entering company name, then add it

document.getElementById('searchAddStockForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const symbol = document.getElementById('searchSymbolCombined').value;

  fetch(`/api/live/${symbol}`)
    .then(res => res.json())
    .then(data => {
      const resultDiv = document.getElementById('searchAddResult');

      if (data.error) {
        resultDiv.innerHTML = `<div class="alert alert-danger mt-2">${data.error}</div>`;
        return;
      }

      resultDiv.innerHTML = `
        <div class="alert alert-info mt-2">
          <strong>${symbol.toUpperCase()}</strong><br>
          Price: ${data.price}<br>
          Date: ${data.timestamp}
        </div>
        <input type="text" id="companyNameCombined" class="form-control mb-2 mt-2" placeholder="Enter Company Name" required>
        <button class="btn btn-primary" onclick="addStockFromSearch('${symbol.toUpperCase()}')">Add to Stocks</button>
      `;
    })
    .catch(err => {
      console.error('Error:', err);
      document.getElementById('searchAddResult').innerHTML =
        `<div class="alert alert-danger mt-2">Error fetching stock data.</div>`;
    });
});


// Add stock using symbol + user-provided company name
function addStockFromSearch(symbol) {
  const companyName = document.getElementById('companyNameCombined').value;
  if (!companyName) {
    alert('Please enter a company name.');
    return;
  }

  fetch('/api/stocks/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, company_name: companyName })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadStocks();
  })
  .catch(err => console.error('Error adding stock:', err));
}


// Load all stocks and display them with action buttons
function loadStocks() {
  fetch('/api/stocks/')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('stocksContainer');
      container.innerHTML = '';

      data.forEach(stock => {
        const stockCard = `
          <div class="d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
            <div>
              <strong>${stock.symbol}</strong> - ${stock.company_name}
            </div>
            <div>
              <button class="btn btn-sm btn-success me-2" onclick="addToWatchlist(${stock.id})">Watchlist</button>
              <button class="btn btn-sm btn-warning me-2" onclick="updateStock(${stock.id})">Edit</button>
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
      container.innerHTML = '';

      if (data.length === 0) {
        container.innerHTML = '<div class="text-muted">No items in watchlist.</div>';
        return;
      }

      data.forEach(item => {
        const watchlistCard = `
          <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
            <div>
              <strong>${item.symbol}</strong> – ${item.company_name}<br>
              <small class="text-muted">Snapshot Price: €${item.snapshot_price} on ${item.snapshot_date}</small>
            </div>
            <div>
              <button class="btn btn-sm btn-outline-primary me-2" onclick="refreshSnapshot(${item.id})">Refresh</button>
              <button class="btn btn-sm btn-outline-danger" onclick="removeFromWatchlist(${item.id})">Remove</button>
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
    body: JSON.stringify({ stock_id: stockId })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    loadWatchlist();
  })
  .catch(err => console.error('Error:', err));
}


// Remove from watchlist 
function removeFromWatchlist(watchlistId) {
  if (!confirm('Remove this stock from your watchlist?')) return;

  fetch(`/api/watchlist/${watchlistId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      loadWatchlist();
    })
    .catch(err => console.error('Error removing from watchlist:', err));
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
    loadStocks();
  })
  .catch(err => console.error('Error updating:', err));
}


// Delete a stock with confirmation
function deleteStock(stockId) {
  const confirmDelete = confirm("⚠️ Are you sure you want to permanently delete this stock?");
  if (!confirmDelete) return;

  fetch(`/api/stocks/${stockId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      loadStocks();
      loadWatchlist();
    })
    .catch(err => console.error('Error deleting:', err));
}



// Fetch  prices for all stocks
function loadLivePrices() {
  fetch('/api/stocks/')
    .then(response => response.json())
    .then(stocks => {
      const container = document.getElementById('livePricesContainer');
      container.innerHTML = '';

      stocks.forEach(stock => {
        fetch(`/api/live/${stock.symbol}`)
          .then(res => res.json())
          .then(data => {
            const card = `
              <div class="border rounded p-2 mb-2 bg-light">
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


function refreshSnapshot(watchlistId) {
  fetch(`/api/watchlist/${watchlistId}/refresh`, {
    method: 'PUT'
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadWatchlist(); // Reload updated data
  })
  .catch(err => console.error('Error refreshing snapshot:', err));
}












// Run when page loads
window.onload = function () {
  loadStocks();
  loadWatchlist();
  loadLivePrices(); // Uncomment when needed manually
};
