import os
from flask import Flask, render_template, jsonify
from app.models import db
from app.stock_api import fetch_stock_data, fetch_historical_data
from app.routes.stocks_routes import stock_routes
from app.routes.watchlist_routes import watchlist_routes

def create_app():
    # Create Flask app with static and template folder paths
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_folder=os.path.join(os.path.dirname(__file__), '..', 'static'),
        template_folder=os.path.join(os.path.dirname(__file__), '..', 'templates')
    )

    # Ensure instance folder exists (for db + .env)
    try:
        os.makedirs(app.instance_path, exist_ok=True)
    except OSError:
        pass

    # Configure SQLite database inside instance/
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'stocks.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Init database
    db.init_app(app)

    # Register API blueprints
    app.register_blueprint(stock_routes, url_prefix='/api/stocks')
    app.register_blueprint(watchlist_routes, url_prefix='/api/watchlist')

    # Create tables on first run
    with app.app_context():
        db.create_all()

    # ------------------------
    # Frontend route
    # ------------------------
    @app.route('/')
    def home():
        return render_template('index.html')

    # ------------------------
    # API: Get live stock price
    # ------------------------
    @app.route('/api/live/<symbol>')
    def get_stock(symbol):
        data = fetch_stock_data(symbol.upper())
        if 'error' in data:
            return jsonify({'error': data['error'], 'debug': data.get('raw')}), 400
        return jsonify(data)

    # ------------------------
    # API: Get historical prices
    # ------------------------
    @app.route('/api/historical/<symbol>')
    def get_historical(symbol):
        data = fetch_historical_data(symbol.upper())
        return jsonify(data)

    return app
