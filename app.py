# App structure follows Flask factory/blueprint layout
# Database setup based on Flask-SQLAlchemy and DigitalOcean tutorials 
# (See README for references)

from flask import Flask, jsonify, render_template
from stock_api import fetch_stock_data
from models import db  # Import the db instance from models.py
from stocks_routes import stock_routes  # Import blueprint stocks
from watchlist_routes import watchlist_routes # Import blueprint Watchlist 
from stock_api import fetch_historical_data


# Create Flask app instance
app = Flask(__name__) 

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stocks.db'

# Initialize the database with the app
db.init_app(app)

# Register the blueprint stocks
app.register_blueprint(stock_routes, url_prefix='/api/stocks')

# Register the blueprint watchlist
app.register_blueprint(watchlist_routes, url_prefix='/api/watchlist')


# Create the database tables 
with app.app_context():
    db.create_all()

# API route to fetch live stock data for a specific stock symbol
@app.route('/api/live/<symbol>')
def get_stock(symbol):
    data = fetch_stock_data(symbol.upper())

    if 'error' in data:
        return jsonify({
            'error': data['error'],
            'debug': data.get('raw') 
        }), 400

    return jsonify(data)



@app.route('/')
def home():
    return render_template('index.html')





@app.route('/api/historical/<symbol>')
def get_historical(symbol):
    data = fetch_historical_data(symbol.upper())
    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True)  # Run the app in debug mode