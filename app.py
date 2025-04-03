from flask import Flask, jsonify
from stock_api import fetch_stock_data

app = Flask(__name__)

@app.route('/api/stock/<symbol>')
def get_stock(symbol):
    data = fetch_stock_data(symbol.upper())
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
