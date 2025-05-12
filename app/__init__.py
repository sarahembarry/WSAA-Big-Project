import os
from flask import Flask, render_template, jsonify
from app.models import db
from app.stock_api import fetch_stock_data, fetch_historical_data
from app.routes.stocks_routes import stock_routes
from app.routes.watchlist_routes import watchlist_routes

def create_app():
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_folder=os.path.join(os.path.dirname(__file__), '..', 'static'),
        template_folder=os.path.join(os.path.dirname(__file__), '..', 'templates')
    )

    # Ensure instance folder exists
    try:
        os.makedirs(app.instance_path, exist_ok=True)
    except OSError:
        pass

    # Correct absolute path to the database in the instance folder
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'stocks.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(stock_routes, url_prefix='/api/stocks')
    app.register_blueprint(watchlist_routes, url_prefix='/api/watchlist')

    # Create tables
    with app.app_context():
        db.create_all()

    # Routes
    @app.route('/')
    def home():
        return render_template('index.html')

    @app.route('/api/live/<symbol>')
    def get_stock(symbol):
        data = fetch_stock_data(symbol.upper())
        if 'error' in data:
            return jsonify({'error': data['error'], 'debug': data.get('raw')}), 400
        return jsonify(data)

    @app.route('/api/historical/<symbol>')
    def get_historical(symbol):
        data = fetch_historical_data(symbol.upper())
        return jsonify(data)

    return app