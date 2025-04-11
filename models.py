from flask_sqlalchemy import SQLAlchemy


# Stock model using SQLAlchemy (see README for model and serialization references)
db = SQLAlchemy()

class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # ID for each stock
    symbol = db.Column(db.String(10), unique=True, nullable=False)  # Stock symbol
    company_name = db.Column(db.String(100), nullable=False) 
    
    # Return stock data as a Python dictionary
    def to_dict(self):
        return {
            "id": self.id,
            "symbol": self.symbol,
            "company_name": self.company_name
        }
