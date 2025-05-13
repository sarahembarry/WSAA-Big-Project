from flask import Blueprint, request, jsonify
from app.models import db, Stock

# Create Blueprint
stock_routes = Blueprint('stock_routes', __name__)

# ------------------------
# Add a new stock (POST)
# ------------------------
@stock_routes.route('/', methods=['POST'])
def add_stock():
    data = request.get_json()

    # Prevent duplicate stock by symbol
    exists = Stock.query.filter_by(symbol=data['symbol'].upper()).first()
    if exists:
        return jsonify({'message': 'Stock already exists'}), 400

    stock = Stock(
        symbol=data['symbol'].upper(),
        company_name=data['company_name']
    )

    db.session.add(stock)
    db.session.commit()
    return jsonify({'message': 'Stock added'})

# ------------------------
# Get all stocks (GET)
# ------------------------
@stock_routes.route('/', methods=['GET'])
def get_stocks():
    stocks = Stock.query.all()
    return jsonify([s.to_dict() for s in stocks])

# ------------------------
# Update stock by ID (PUT)
# ------------------------
@stock_routes.route('/<int:id>', methods=['PUT'])
def update_stock(id):
    stock = Stock.query.get_or_404(id)
    data = request.get_json()

    if 'symbol' in data:
        stock.symbol = data['symbol'].upper()
    if 'company_name' in data:
        stock.company_name = data['company_name']

    db.session.commit()
    return jsonify({'message': 'Stock updated'})

# ------------------------
# Delete stock by ID (DELETE)
# ------------------------
@stock_routes.route('/<int:id>', methods=['DELETE'])
def delete_stock(id):
    try:
        stock = Stock.query.get_or_404(id)
        db.session.delete(stock)
        db.session.commit()
        return jsonify({'message': 'Stock deleted'})

    except Exception as e:
        print("Delete failed:", e)
        return jsonify({'error': 'Delete failed'}), 500
