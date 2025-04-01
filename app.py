from flask import Flask
from routes import main 
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("ALPHAVANTAGE_API_KEY")

app = Flask(__name__)
app.register_blueprint(main)

if __name__ == "__main__":
    print(f"API Key loaded: {api_key is not None}")
    app.run(debug=True)
