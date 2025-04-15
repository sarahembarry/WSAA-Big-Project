# Watchlist API routes using Flask Blueprint and SQLAlchemy  
# References: see README (Flask Blueprints, Flask-SQLAlchemy, REST API patterns)

from flask import Blueprint, request, jsonify
from models import db, Watchlist, Stock

# Create Blueprint for watchlist routes
watchlist_routes = Blueprint('watchlist_routes', __name__)

# Route: Add a stock to the watchlist (POST)
@watchlist_routes.route('/', methods=['POST'])
def add_to_watchlist():
    data = request.get_json()
    stock = Stock.query.get(data['stock_id'])  # Check if stock exists
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404

    item = Watchlist(
        stock_id=data['stock_id'],
    )
    db.session.add(item)  # Add to DB
    db.session.commit()   # Save changes
    return jsonify({'message': 'Added to watchlist'})

# Route: Get all watchlist items (GET)
@watchlist_routes.route('/', methods=['GET'])
def get_watchlist():
    items = Watchlist.query.all()  # Fetch all items
    return jsonify([i.to_dict() for i in items])  # Return as JSON


# Route: Remove item from watchlist (DELETE)
@watchlist_routes.route('/<int:id>', methods=['DELETE'])
def delete_watchlist_item(id):
    item = Watchlist.query.get_or_404(id)  # Get item or 404
    db.session.delete(item)  # Delete item
    db.session.commit()  # Save changes
    return jsonify({'message': 'Removed from watchlist'})  # Return message
