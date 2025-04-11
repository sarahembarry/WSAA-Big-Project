# Stock API routes using Flask Blueprint and SQLAlchemy
# Based on Flask-SQLAlchemy and Blueprint patterns (see README for references)

from flask import Blueprint, request, jsonify
from models import db, Stock

# Create Blueprint API routes
stock_routes = Blueprint('stock_routes', __name__)

# Add a new stock (POST)
@stock_routes.route('/api/stocks', methods=['POST'])
def add_stock():
    data = request.get_json()
    stock = Stock(
        symbol=data['symbol'].upper(),
        company_name=data['company_name']
    )
    db.session.add(stock)       # Add stock to the database
    db.session.commit()         # Commit session
    return jsonify({'message': 'Stock added'})  # Return message

# Route: Get allstocks (GET )
@stock_routes.route('/api/stocks', methods=['GET'])
def get_stocks():
    stocks = Stock.query.all()                         # Query all stocks
    return jsonify([s.to_dict() for s in stocks])      # Return list of stocks as JSON


