# Loads API key from .env file 
import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('ALPHAVANTAGE_API_KEY') 
BASE_URL = 'https://www.alphavantage.co/query' 

def fetch_stock_data(symbol, function='TIME_SERIES_DAILY'):
    # Define API parameters
    params = {
        'function': function,
        'symbol': symbol,
        'apikey': API_KEY
    }

    # Send GET request to Alpha Vantage
    response = requests.get(BASE_URL, params=params)
    data = response.json()

    # Check for valid response
    if 'Time Series (Daily)' not in data:
        raise ValueError('Invalid API response. Make sure the symbol is correct and try again.')

    return data['Time Series (Daily)']  # Return daily stock data


# References: Alpha Vantage docs, Omi.me tutorial, Real Python, Medium (see README)

