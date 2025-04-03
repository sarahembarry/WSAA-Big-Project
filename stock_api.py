
import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('ALPHAVANTAGE_API_KEY')
BASE_URL = 'https://www.alphavantage.co/query'

def fetch_stock_data(symbol, function='TIME_SERIES_DAILY'):
    params = {
        'function': function,
        'symbol': symbol,
        'apikey': API_KEY
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    if 'Time Series (Daily)' not in data:
        raise ValueError('Invalid API response. Make sure the symbol is correct and try again.')

    return data['Time Series (Daily)']
