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
  const messageDiv = document.getElementById('stockMessage'); 
  messageDiv.innerHTML = '';  

  resultDiv.innerHTML = '';
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;


  // Fetch live stock data
  fetch(`/api/live/${symbol}`)
    .then(res => res.json())
    .then(data => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Get Stock Data`;

      if (data.error) {
        const debugInfo = data.debug
          ? `<br><small class="text-muted">${JSON.stringify(data.debug)}</small>`
          : '';
        resultDiv.innerHTML = `<div class="alert alert-danger mt-2">${data.error}${debugInfo}</div>`;
        return;
      }
    

      // Display result info and input
      resultDiv.innerHTML = `
      <div class="alert alert-info fade show mt-2" role="alert">
        <strong>${symbol}</strong><br>
        Price: $${data.price}<br>
        Date: ${data.timestamp}
      </div>
      <input type="text" id="companyNameCombined" class="form-control mb-2 mt-2" placeholder="Enter Company Name" required>
      <small class="text-muted mb-2 d-block">Add a custom company name for this stock before saving.</small>
      <button class="btn btn-primary" onclick="addStockFromSearch('${symbol}')">Add to Stocks</button>
      <canvas id="historicalChart" class="mt-4" height="100"></canvas>
    `;
    

      // Fetch historical data for chart
      fetch(`/api/historical/${symbol}`)
        .then(res => res.json())
        .then(prices => {
          const existingChart = Chart.getChart("historicalChart");
          if (existingChart) existingChart.destroy(); // avoid duplicates

          let canvas = document.getElementById('historicalChart');
          if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'historicalChart';
            canvas.height = 100;
            resultDiv.appendChild(canvas);
          }

          const ctx = canvas.getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: prices.map(p => p.date),
              datasets: [{
                label: `${symbol} - Last 30 Days`,
                data: prices.map(p => p.price),
                borderColor: 'rgba(40,167,69,1)',
                tension: 0.2,
                fill: false
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Price ($)' } }
              }
            }
          });
        })
        .catch(err => {
          console.error('Error loading chart data:', err);
          resultDiv.innerHTML += `<div class="alert alert-warning mt-2">Unable to load chart data.</div>`;
        });
    })
    .catch(err => {
      console.error('Error:', err);
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Get Stock Data`;
      resultDiv.innerHTML = `<div class="alert alert-danger mt-2" role="alert">Error fetching stock data. Please try again.</div>`;
    });
}




function addStockFromSearch(symbol) {
  const companyNameInput = document.getElementById('companyNameCombined');
  const resultDiv = document.getElementById('searchAddResult');

  // Remove any previous warning
  const existingAlert = document.getElementById('companyNameWarning');
  if (existingAlert) existingAlert.remove();

  if (!companyNameInput.value.trim()) {
    const warning = document.createElement('div');
    warning.id = 'companyNameWarning';
    warning.className = 'alert alert-warning py-1 mb-2';
    warning.textContent = 'Please enter a company name.';
    resultDiv.insertBefore(warning, companyNameInput); // <-- insert just before the input
    return;
  }

  fetch('/api/stocks/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, company_name: companyNameInput.value })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      showPopup(data.error, 'danger');
    } else {
      showPopup(data.message, 'success');
      companyNameInput.value = '';
      loadStocks();
    }
  })
  .catch(err => {
    console.error('Error adding stock:', err);
    showPopup('Something went wrong. Please try again.', 'danger');
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
  watchlistToRemove = watchlistId;
  const modal = new bootstrap.Modal(document.getElementById('confirmRemoveModal'));
  modal.show();
}

document.getElementById('confirmRemoveBtn').addEventListener('click', () => {
  if (!watchlistToRemove) return;

  fetch(`/api/watchlist/${watchlistToRemove}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      showPopup(data.message, 'success');
      loadWatchlist();
    })
    .catch(err => {
      console.error('Error removing from watchlist:', err);
      showPopup('Error removing from watchlist.', 'danger');
    })
    .finally(() => {
      bootstrap.Modal.getInstance(document.getElementById('confirmRemoveModal')).hide();
      watchlistToRemove = null;
    });
});




// Update a stock's company name
function updateStock(stockId) {
  stockToUpdate = stockId;
  const modal = new bootstrap.Modal(document.getElementById('updateStockModal'));
  modal.show();
}

document.getElementById('confirmUpdateBtn').addEventListener('click', function () {
  const newName = document.getElementById('updateCompanyNameInput').value.trim();
  if (!newName) {
    showPopup('Please enter a valid company name.', 'warning');
    return;
  }

  fetch(`/api/stocks/${stockToUpdate}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_name: newName })
  })
  .then(res => res.json())
  .then(data => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('updateStockModal'));
    modal.hide();
    showPopup(data.message, 'success');
    loadStocks();
  })
  .catch(err => {
    console.error('Error updating stock:', err);
    showPopup('Error updating stock.', 'danger');
  });
});


//delete stock
function deleteStock(stockId) {
  stockToDelete = stockId;
  const modal = new bootstrap.Modal(document.getElementById('confirmStockDeleteModal'));
  modal.show();
}

document.getElementById('confirmStockDeleteBtn').addEventListener('click', function () {
  fetch(`/api/stocks/${stockToDelete}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('confirmStockDeleteModal'));
      modal.hide();
      showPopup(data.message, 'success');
      loadStocks();
      loadWatchlist();
    })
    .catch(err => {
      console.error('Error deleting stock:', err);
      showPopup('Error deleting stock.', 'danger');
    });
});




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
                Price: $${data.price}<br>
                Date: ${data.timestamp}
              </div>
            `;
            container.innerHTML += card;
          })
          .catch(err => console.error(`Error fetching ${stock.symbol}:`, err));
      });
    });
}


// Refresh snapshot for a watchlist item
function refreshSnapshot(watchlistId) {
  fetch(`/api/watchlist/${watchlistId}/refresh`, {
    method: 'PUT'
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        showPopup(`Error: ${data.error}`, 'danger');
        return;
      }

      showPopup(data.message, 'success');
      loadWatchlist(); // Reload updated data
    })
    .catch(err => {
      console.error('Error refreshing snapshot:', err);
      showPopup('An error occurred while refreshing the snapshot.', 'danger');
    });
}















// Run when page loads
window.onload = function () {
  loadStocks();
  loadWatchlist();
 loadLivePrices(); // Uncomment when needed manually
};