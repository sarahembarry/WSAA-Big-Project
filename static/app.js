// JavaScript fetch-based form submission (see README for references: fetch API, preventDefault, JSON.stringify)


// Combined Search + Add to Stocks
// Search for live stock data by symbol, show result, allow entering company name, then add it


function showPopup(message, type = 'info') {
  const popup = document.createElement('div');
  popup.className = `custom-popup alert alert-${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 3000);
}

// Inject CSS for popup if not present
if (!document.getElementById('popup-style')) {
  const style = document.createElement('style');
  style.id = 'popup-style';
  style.innerHTML = `
    .custom-popup {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 1055;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
      font-weight: 500;
      opacity: 0.95;
    }
  `;
  document.head.appendChild(style);
}













document.getElementById('searchAddStockForm').addEventListener('submit', handleSearchAddFormSubmit);

function handleSearchAddFormSubmit(e) {
  e.preventDefault();
  const symbol = document.getElementById('searchSymbolCombined').value.trim().toUpperCase();
  const resultDiv = document.getElementById('searchAddResult');
  const submitBtn = e.target.querySelector('button[type="submit"]');

  
  resultDiv.innerHTML = '';
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;

  fetch(`/api/live/${symbol}`)
    .then(res => res.json())
    .then(data => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Get Stock Data`;

      if (data.error) {
        resultDiv.innerHTML = `<div class="alert alert-danger mt-2">${data.error}</div>`;
        return;
      }

      resultDiv.innerHTML = `
        <div class="alert alert-info fade show mt-2" role="alert">
          <strong>${symbol}</strong><br>
          Price: $${data.price}<br>
          Date: ${data.timestamp}
        </div>
        <input type="text" id="companyNameCombined" class="form-control mb-2 mt-2" placeholder="Enter Company Name" required>
        <button class="btn btn-primary" onclick="addStockFromSearch('${symbol}')">Add to Stocks</button>
      `;
    })
    .catch(err => {
      console.error('Error:', err);
      
      resultDiv.innerHTML = `<div class="alert alert-danger mt-2" role="alert">Error fetching stock data. Please try again.</div>`;
    });
}




function addStockFromSearch(symbol) {
  const companyName = document.getElementById('companyNameCombined').value;
  const messageDiv = document.getElementById('stockMessage');
  messageDiv.innerHTML = '';  

  if (!companyName) {
    messageDiv.innerHTML = `<div class="alert alert-warning">Please enter a company name.</div>`;
    return;
  }

  fetch('/api/stocks/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, company_name: companyName })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      messageDiv.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
    } else {
      messageDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
      document.getElementById('companyNameCombined').value = '';
      loadStocks();
    }
  })
  .catch(err => {
    console.error('Error adding stock:', err);
    messageDiv.innerHTML = `<div class="alert alert-danger">Something went wrong. Please try again.</div>`;
  });
}




// Load all stocks and display them with action buttons
function loadStocks() {
  fetch('/api/stocks/')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('stocksContainer');
      container.innerHTML = '';

      if (data.length === 0) {
        container.innerHTML = '<div class="text-muted">No stocks added.</div>';
        return;
      }

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
              <small class="text-muted">Snapshot Price: $${item.snapshot_price} on ${item.snapshot_date}</small>
            </div>
            <div>
              <button class="btn btn-sm btn-success me-2" onclick="refreshSnapshot(${item.id})">Refresh</button>
              <button class="btn btn-sm btn-danger" onclick="removeFromWatchlist(${item.id})">Remove</button>
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
    showPopup(data.message, data.message.includes('already') ? 'warning' : 'success');
    loadWatchlist();
  })
  .catch(err => {
    console.error('Error:', err);
    showPopup('Error adding to watchlist.', 'danger');
  });
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
      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      alert(data.message);
      loadWatchlist(); // Reload updated data
    })
    .catch(err => {
      console.error('Error refreshing snapshot:', err);
      alert('An error occurred while refreshing the snapshot.');
    });
}














// Run when page loads
window.onload = function () {
  loadStocks();
  loadWatchlist();
  loadLivePrices(); // Uncomment when needed manually
};