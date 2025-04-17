# Stock API routes using Flask Blueprint and SQLAlchemy
# References: see README (Flask Blueprints, Flask-SQLAlchemy, REST API patterns)

from flask import Blueprint, request, jsonify
from models import db, Stock

# Create Blueprint API routes
stock_routes = Blueprint('stock_routes', __name__)

# Route: Add a new stock (POST)
@stock_routes.route('/', methods=['POST'])
def add_stock():
    data = request.get_json()
    stock = Stock(
        symbol=data['symbol'].upper(),
        company_name=data['company_name']
    )


    db.session.add(stock)       # Add stock to the database
    db.session.commit()         # Commit session
    return jsonify({'message': 'Stock added'})  # Return message

# Route: Get all stocks (GET)
@stock_routes.route('/', methods=['GET'])
def get_stocks():
    stocks = Stock.query.all()                         # Query all stocks
    return jsonify([s.to_dict() for s in stocks])      # Return list of stocks as JSON

# Route: Update a stock (PUT)
@stock_routes.route('/<int:id>', methods=['PUT'])
def update_stock(id):
    stock = Stock.query.get_or_404(id)  # Find stock or return 404
    data = request.get_json()           # Parse JSON payload

    # Update fields only if they are provided
    if 'symbol' in data:
        stock.symbol = data['symbol'].upper()
    if 'company_name' in data:
        stock.company_name = data['company_name']

    db.session.commit()  # Save changes to the database
    return jsonify({'message': 'Stock updated'})  # Return success message

# Delete a stock (DELETE)
@stock_routes.route('/<int:id>', methods=['DELETE'])
def delete_stock(id):
    try:
     stock = Stock.query.get_or_404(id) # Find stock or return 404
     db.session.delete(stock) # Delete stock from database
     db.session.commit()  # Save changes to DB
     return jsonify({'message': 'Stock deleted'}) # Return success message
    
    except Exception as e:
        print("Delete failed:", e)  # Log error to terminal
        return jsonify({'error': 'Delete failed'}), 500
