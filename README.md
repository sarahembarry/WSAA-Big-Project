# WSAA-Big-Project

## Table of Contents:
1. [Assignment Description](#assignment-description)
2. [References](#references)


## Assignment Description


## References
---

| Topic | Reference | Where Used |
|-------|-----------|------------|
| Flask App Structure | [Flask – Application Factories and Package Layout](https://flask.palletsprojects.com/en/latest/patterns/packages/) | `app.py`, `stock_routes.py`, `watchlist_routes.py`, `config.py` |
| Flask Setup | [Flask – Tutorial: Application Setup](https://flask.palletsprojects.com/en/latest/tutorial/) | `app.py`, `templates`, general layout |
| Flask Templates | [Flask – Tutorial: Layout and Templates](https://flask.palletsprojects.com/en/latest/tutorial/layout/) | `templates/index.html` |
| Flask Factory | [Flask – Tutorial: Application Factory](https://flask.palletsprojects.com/en/latest/tutorial/factory/) | `app.py`, `config.py` |
| Flask Blueprints | [Real Python – Making a Flask Blueprint](https://realpython.com/flask-blueprint/#making-a-flask-blueprint) | `stock_routes.py`, `watchlist_routes.py`, `app.py` |
| Flask Blueprints | [Medium – Learning Flask A-Z: Blueprints](https://medium.com/@basubinayak05/learning-flask-a-z-blueprints-3ae95db95443) | `stock_routes.py`, `watchlist_routes.py`, `app.py` |
| Flask Application Structure | [DigitalOcean – Structure a Large Flask App with Blueprints and SQLAlchemy](https://www.digitalocean.com/community/tutorials/how-to-structure-a-large-flask-application-with-flask-blueprints-and-flask-sqlalchemy) | `stock_routes.py`, `watchlist_routes.py`, `models.py`, `app.py` |
| Flask Mega Tutorial | [Miguel Grinberg – Hello, World!](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) | General research |
| Flask Basics | [Codementor – Basics of Flask](https://www.codementor.io/@overiq/basics-of-flask-fzvh8ueed) | General research |
| Flask Templates | [DigitalOcean – Flask Templates](https://www.digitalocean.com/community/tutorials/how-to-use-templates-in-a-flask-application) | `templates/index.html` |
| Flask Full App Example | [515Tech – Building a PTO App](https://www.515tech.com/post/building-a-pto-app) | `stock_routes.py`, `watchlist_routes.py` |
| Flask HTML Rendering | [Techcrush – How to Render HTML File in Flask](https://medium.com/techcrush/how-to-render-html-file-in-flask-3fbfb16b47f6) | `app.py` |
| Virtual Environments | [Python Docs – venv](https://docs.python.org/3/library/venv.html) | `venv/`, `.gitignore` |
| Virtual Environments | [Real Python – Python Virtual Environments](https://realpython.com/python-virtual-environments-a-primer/) | `venv/`, `.gitignore` |
| Alpha Vantage API | [Alpha Vantage – API Documentation](https://www.alphavantage.co/documentation/) | `stock_api.py` |
| Alpha Vantage Key Setup | [Alpha Vantage – Get API Key](https://www.alphavantage.co/support/#api-key) | `.env`, `stock_api.py` |
| Env Variables in Flask | [Real Python – Flask Environment Variables](https://realpython.com/flask-database/) | `.env`, `stock_api.py` |
| Secure Config | [Medium – Env Vars in Python](https://medium.com/datauniverse/how-to-use-environment-variables-in-python-for-secure-configuration-12d56c7f0a8c) | `.env`, `stock_api.py` |
| API Data Fetching | [Omi.me – Alpha Vantage Fetch Guide](https://www.omi.me/blogs/api-guides/how-to-fetch-stock-data-using-alpha-vantage-api-in-python) | `stock_api.py` |
| SQLAlchemy Model Basics | [Flask-SQLAlchemy – Quickstart Guide](https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/) | `models.py`, `app.py` |
| SQLAlchemy Model Reference | [Flask-SQLAlchemy – Models and Tables](https://flask-sqlalchemy.readthedocs.io/en/stable/models/) | `models.py` |
| SQLAlchemy Relationships | [Flask-SQLAlchemy – Relationships](https://flask-sqlalchemy.palletsprojects.com/en/latest/models/#one-to-many-relationships) | `models.py` |
| SQLAlchemy Update Records | [Restack – Update Records in Flask with SQLAlchemy](https://www.restack.io/p/flask-knowledge-update-records) | `stock_routes.py` |
| SQLAlchemy Delete Records | [Flask-SQLAlchemy – Queries](https://flask-sqlalchemy.palletsprojects.com/en/latest/queries/) | `stock_routes.py`, `watchlist_routes.py` |
| Model to_dict Serialization | [Restack – Convert SQLAlchemy results to dict](https://www.restack.io/p/adding-columns-sqlalchemy-models-answer-query-result-dict) | `models.py` |
| SQLAlchemy Tutorial | [DigitalOcean – SQLAlchemy in Flask](https://www.digitalocean.com/community/tutorials/how-to-use-flask-sqlalchemy-to-interact-with-databases-in-a-flask-application) | `models.py`, `stock_routes.py`, `watchlist_routes.py`, `app.py` |
| Python Module Imports | [Python Docs – Modules](https://docs.python.org/3/tutorial/modules.html) | `app.py`, `stock_routes.py`, `watchlist_routes.py`, `models.py` |
| Project Structure + Imports | [Real Python – Python Modules and Packages](https://realpython.com/python-modules-packages/) | `app.py`, `stock_routes.py`, `watchlist_routes.py`, `stock_api.py` |
| API Testing | [Postman Docs – Sending Requests](https://learning.postman.com/docs/sending-requests/requests/) | API testing |
| Bootstrap CDN | [Bootstrap – CDN Links](https://getbootstrap.com/docs/5.3/getting-started/introduction/#cdn-links) | `templates/index.html` |
| Bootstrap Containers | [Bootstrap – Layout Containers](https://getbootstrap.com/docs/5.3/layout/containers/) | `templates/index.html` |
| Bootstrap Cards | [Bootstrap – Components: Card](https://getbootstrap.com/docs/5.3/components/card/) | `templates/index.html` |
| Bootstrap Form Input | [Bootstrap – Forms: Input Group](https://getbootstrap.com/docs/5.3/forms/input-group/) | `templates/index.html` |
| Topic                          | Reference                                                                                                                      | Where Used                       |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| JavaScript – alert()          | [MDN – Window.alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)                                         | `app.js`                         |
| JavaScript – Fetch API        | [DigitalOcean – JavaScript Fetch API](https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data? | `app.js`                         |
| JavaScript – getElementById   | [MDN – Document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)                     | `app.js`                         |
| JavaScript – preventDefault() | [W3Schools – event.preventDefault()](https://www.w3schools.com/jsref/event_preventdefault.asp)                                | `app.js`                         |
| JavaScript – response.json()  | [MDN – Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)                                       | `app.js`                         |


---





