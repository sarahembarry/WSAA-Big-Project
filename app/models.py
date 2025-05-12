from flask_sqlalchemy import SQLAlchemy

# Initialise the db connection
db = SQLAlchemy()

# -----------------------
# Stock Model
# -----------------------
class Stock(db.Model):
    # Represents a stock with symbol and company name.
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), unique=True, nullable=False)
    company_name = db.Column(db.String(100), nullable=False)

    # Cascade ensures watchlist entries are deleted if stock is removed
    watchlist_items = db.relationship(
        'Watchlist',
        backref='stock',
        cascade='all, delete',
        lazy=True
    )

    def to_dict(self):
        # Serialise stock object to dictionary
        return {
            "id": self.id,
            "symbol": self.symbol,
            "company_name": self.company_name
        }


# -----------------------
# Watchlist Model
# -----------------------
class Watchlist(db.Model):
    # Represents a user's watchlist entry linked to a stock.
    # Stores price snapshot and date

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey('stock.id'), nullable=False)

    # Snapshot info
    snapshot_price = db.Column(db.Float, nullable=True)
    snapshot_date = db.Column(db.String(10), nullable=True)

    def to_dict(self):
        # Serialise watchlist entry with linked stock info
        return {
            "id": self.id,
            "stock_id": self.stock_id,
            "symbol": self.stock.symbol,
            "company_name": self.stock.company_name,
            "snapshot_price": self.snapshot_price,
            "snapshot_date": self.snapshot_date,
        }
