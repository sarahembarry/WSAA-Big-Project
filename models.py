from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

# Stock model using SQLAlchemy (see README for model and serialization references)
class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # ID for each stock
    symbol = db.Column(db.String(10), unique=True, nullable=False)  # Stock symbol
    company_name = db.Column(db.String(100), nullable=False)  # Company name

    # Link to Watchlist items, delete them if stock is deleted
    watchlist_items = db.relationship('Watchlist', backref='stock', cascade='all, delete', lazy=True)

    # Return stock data as a Python dictionary
    def to_dict(self):
        return {
            "id": self.id,
            "symbol": self.symbol,
            "company_name": self.company_name
        }

# Stock Watchlist model using SQLAlchemy (see README for model and serialization references)
class Watchlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey('stock.id'), nullable=False)
    personal_note = db.Column(db.String(250))

    # Return Watchlist entry as a Python dictionary
    def to_dict(self):
        return {
            "id": self.id,
            "stock_id": self.stock_id,
            "symbol": self.stock.symbol,
            "company_name": self.stock.company_name,
        }
