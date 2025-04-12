# App structure follows Flask factory/blueprint layout
# Database setup based on Flask-SQLAlchemy and DigitalOcean tutorials 
# (See README for references)

from flask import Flask, jsonify
from stock_api import fetch_stock_data
from models import db  # Import the db instance from models.py
from routes import stock_routes  # Import blueprint

# Create Flask app instance
app = Flask(__name__) 

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stocks.db'

# Initialize the database with the app
db.init_app(app)

# Register the blueprint
app.register_blueprint(stock_routes, url_prefix='/api/stocks')


# Create the database tables 
with app.app_context():
    db.create_all()

# API route to fetch live stock data for a specific stock symbol
@app.route('/api/stock/<symbol>')
def get_stock(symbol):
    data = fetch_stock_data(symbol.upper())
    return jsonify(data)  # Return stock data as JSON

if __name__ == '__main__':
    app.run(debug=True)  # Run the app in debug mode


