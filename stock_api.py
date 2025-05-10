# Load required libraries
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
API_KEY = os.getenv('ALPHAVANTAGE_API_KEY')  # Get API key
BASE_URL = 'https://www.alphavantage.co/query'  # Alpha Vantage base URL

# Function to fetch latest daily stock price
def fetch_stock_data(symbol, function='TIME_SERIES_DAILY'):
    # Set up API request parameters
    params = {
        'function': function,
        'symbol': symbol,
        'apikey': API_KEY
    }

    # Make GET request to Alpha Vantage API
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    print(data)

    # Validate response contains daily time series
    if 'Time Series (Daily)' not in data:
        return {
            'error': data.get('Note') or data.get('Error Message') or 'Invalid API response',
            'raw': data
        }

    # Extract the most recent stock data
    time_series = data['Time Series (Daily)']
    latest_date = sorted(time_series.keys())[-1]
    latest_data = time_series[latest_date]

    # Return simplified price and timestamp for frontend
    return {
        'price': round(float(latest_data['4. close']), 2),  # Closing price rounded to 2 decimals
        'timestamp': latest_date
    }


def fetch_historical_data(symbol, function='TIME_SERIES_DAILY'):
    params = {
        'function': function,
        'symbol': symbol,
        'apikey': API_KEY
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    if 'Time Series (Daily)' not in data:
        return {'error': data.get('Note') or data.get('Error Message') or 'Invalid API response'}

    # Extract the last 30 days
    time_series = data['Time Series (Daily)']
    sorted_dates = sorted(time_series.keys(), reverse=True)[:30]
    return [
        {'date': date, 'price': float(time_series[date]['4. close'])}
        for date in reversed(sorted_dates)
    ]








# References: Alpha Vantage docs, Omi.me tutorial, Real Python, Medium (see README)



