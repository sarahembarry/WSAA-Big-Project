# Watchlist API routes using Flask Blueprint and SQLAlchemy  
# References: see README (Flask Blueprints, Flask-SQLAlchemy, REST API patterns)

from flask import Blueprint, request, jsonify
from app.models import db, Watchlist, Stock
from app.stock_api import fetch_stock_data 

# Create Blueprint for watchlist routes
watchlist_routes = Blueprint('watchlist_routes', __name__)

# Route: Add a stock to the watchlist (POST)
@watchlist_routes.route('/', methods=['POST'])
def add_to_watchlist():
    data = request.get_json()
    stock = Stock.query.get(data['stock_id'])  # Check if stock exists
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    # Check for duplicates
    existing = Watchlist.query.filter_by(stock_id=stock.id).first()
    if existing:
        return jsonify({'message': 'Stock already in watchlist'}), 400
    # Get snapshot price + date
    snapshot = fetch_stock_data(stock.symbol)
    price = snapshot.get('price')
    date = snapshot.get('timestamp')
    
    # Create new watchlist item with snapshot data
    item = Watchlist(
        stock_id=stock.id,
        snapshot_price=price,
        snapshot_date=date
    )
    db.session.add(item)       
    db.session.commit()        
    return jsonify({'message': 'Added to watchlist with snapshot'})

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


# Route: Refresh snapshot for a watchlist item (PUT)
@watchlist_routes.route('/<int:id>/refresh', methods=['PUT'])
def refresh_snapshot(id):
    item = Watchlist.query.get_or_404(id)
    stock = item.stock  # Get associated Stock

    snapshot = fetch_stock_data(stock.symbol)

    if 'error' in snapshot:
        return jsonify({'error': snapshot['error']}), 400

    price = snapshot.get('price')
    date = snapshot.get('timestamp')

    if price is None or date is None:
        return jsonify({'error': 'Incomplete snapshot data'}), 502

    item.snapshot_price = price
    item.snapshot_date = date
    db.session.commit()

    return jsonify({'message': 'Snapshot refreshed'})


