# WSAA-Big-Project

## Table of Contents:
1. [Assignment Description](#assignment-description)
2. [Live demo on Render] (#live-demo-on-render)
3. [References](#references)



## Assignment Description




### References

| Topic | Reference | Where Used |
|-------|-----------|------------|
| **Flask & App Structure** |||
| Flask App Structure | [Flask – Application Factories and Package Layout](https://flask.palletsprojects.com/en/latest/patterns/packages/) | `app.py`, `stock_routes.py`, `watchlist_routes.py`, `config.py` |
| Flask Setup | [Flask – Tutorial: Application Setup](https://flask.palletsprojects.com/en/latest/tutorial/) | `app.py`, `templates`, general layout |
| Flask Factory | [Flask – Tutorial: Application Factory](https://flask.palletsprojects.com/en/latest/tutorial/factory/) | `app.py`, `config.py` |
| Flask Blueprints | [Real Python – Making a Flask Blueprint](https://realpython.com/flask-blueprint/#making-a-flask-blueprint) | `stock_routes.py`, `watchlist_routes.py`, `app.py` |
| Flask Blueprints | [Medium – Learning Flask A-Z: Blueprints](https://medium.com/@basubinayak05/learning-flask-a-z-blueprints-3ae95db95443) | `stock_routes.py`, `watchlist_routes.py`, `app.py` |
| Flask Application Structure | [DigitalOcean – Structure a Large Flask App with Blueprints and SQLAlchemy](https://www.digitalocean.com/community/tutorials/how-to-structure-a-large-flask-application-with-flask-blueprints-and-flask-sqlalchemy) | `stock_routes.py`, `watchlist_routes.py`, `models.py`, `app.py` |
| Flask Templates | [Flask – Tutorial: Layout and Templates](https://flask.palletsprojects.com/en/latest/tutorial/layout/) | `templates/index.html` |
| Flask Templates | [DigitalOcean – Flask Templates](https://www.digitalocean.com/community/tutorials/how-to-use-templates-in-a-flask-application) | `templates/index.html` |
| Flask Full App Example | [515Tech – Building a PTO App](https://www.515tech.com/post/building-a-pto-app) | `stock_routes.py`, `watchlist_routes.py` |
| Flask HTML Rendering | [Techcrush – How to Render HTML File in Flask](https://medium.com/techcrush/how-to-render-html-file-in-flask-3fbfb16b47f6) | `app.py` |

| **Python & APIs** |||
| Alpha Vantage API | [Alpha Vantage – API Documentation](https://www.alphavantage.co/documentation/) | `stock_api.py` |
| Alpha Vantage Key Setup | [Alpha Vantage – Get API Key](https://www.alphavantage.co/support/#api-key) | `.env`, `stock_api.py` |
| API Data Fetching | [Omi.me – Alpha Vantage Fetch Guide](https://www.omi.me/blogs/api-guides/how-to-fetch-stock-data-using-alpha-vantage-api-in-python) | `stock_api.py` |
| Env Variables in Flask | [Real Python – Flask Environment Variables](https://realpython.com/flask-database/) | `.env`, `stock_api.py` |
| Secure Config | [Medium – Env Vars in Python](https://medium.com/datauniverse/how-to-use-environment-variables-in-python-for-secure-configuration-12d56c7f0a8c) | `.env`, `stock_api.py` |

| **SQLAlchemy ORM** |||
| SQLAlchemy Quickstart | [Flask-SQLAlchemy – Quickstart Guide](https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/) | `models.py`, `app.py` |
| SQLAlchemy Models | [Flask-SQLAlchemy – Models and Tables](https://flask-sqlalchemy.readthedocs.io/en/stable/models/) | `models.py` |
| SQLAlchemy Relationships | [Flask-SQLAlchemy – Relationships](https://flask-sqlalchemy.palletsprojects.com/en/latest/models/#one-to-many-relationships) | `models.py` |
| SQLAlchemy Relationship API | [SQLAlchemy Docs – relationship API](https://docs.sqlalchemy.org/en/14/orm/relationship_api.html) | `models.py` |
| SQLAlchemy Cascade Delete | [Dev.to – SQLAlchemy Cascading Deletes](https://dev.to/zchtodd/sqlalchemy-cascading-deletes-8hk) | `models.py` |
| SQLAlchemy Update Records | [Restack – Update Records in Flask with SQLAlchemy](https://www.restack.io/p/flask-knowledge-update-records) | `stock_routes.py` |
| SQLAlchemy Delete Records | [Flask-SQLAlchemy – Queries](https://flask-sqlalchemy.palletsprojects.com/en/latest/queries/) | `stock_routes.py`, `watchlist_routes.py` |
| Model to_dict Serialization | [Restack – Convert SQLAlchemy results to dict](https://www.restack.io/p/adding-columns-sqlalchemy-models-answer-query-result-dict) | `models.py` |
| SQLAlchemy Tutorial | [DigitalOcean – SQLAlchemy in Flask](https://www.digitalocean.com/community/tutorials/how-to-use-flask-sqlalchemy-to-interact-with-databases-in-a-flask-application) | `models.py`, `stock_routes.py`, `watchlist_routes.py`, `app.py` |

| **JavaScript & UI Logic** |||
| JavaScript DOM – getElementById   | [MDN – Document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)                                                         | `app.js`              |
| JavaScript – alert()              | [MDN – Window.alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)                                                                             | `app.js`              |
| JavaScript – preventDefault()     | [W3Schools – event.preventDefault()](https://www.w3schools.com/jsref/event_preventdefault.asp)                                                                    | `app.js`              |
| JavaScript – Fetch API            | [MDN – Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)                                                                         | `app.js`              |
| JavaScript – response.json()      | [MDN – Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)                                                                           | `app.js`              |
| JavaScript Confirm Delete         | [SitePoint – Confirm Before Delete](https://www.sitepoint.com/community/t/confirm-before-delete/221197)                                                           | `app.js`              |
| JavaScript Dynamic Buttons        | [SitePoint – Using onclick on dynamically created button](https://www.sitepoint.com/community/t/using-onclick-on-dynamically-created-button/358755)               | `app.js`              |
| JavaScript DOM & forEach          | [Medium – Using forEach and innerHTML](https://medium.com/@ianflurkey/using-foreach-and-innerhtml-to-create-search-results-6b11b9985d6b)                          | `app.js`              |
| JavaScript Template Literals      | [MDN – Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)                                                    | `app.js`              |
| REST Methods – PUT vs PATCH       | [GeeksforGeeks – Difference between PUT and PATCH](https://www.geeksforgeeks.org/difference-between-put-and-patch-request/)                                       | `watchlist_routes.py` |
| JavaScript – createElement()      | [MDN – Document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)                                                           | `app.js`              |
| JavaScript – appendChild()        | [MDN – Node.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)                                                                       | `app.js`              |
| CSS Positioning                   | [MDN – position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)                                                                                       | `popup styling`       |
| JavaScript – Clear Form on Submit | [GeeksforGeeks – Clear Form after Submit](https://www.geeksforgeeks.org/how-to-clear-form-after-submit-in-javascript-without-using-reset/) | `app.js`              |
| JavaScript – Form Validation      | [MDN – Form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)                   | `app.js`              |
| JavaScript – Fetch Error Handling | [Dev.to – Fetch API error handling](https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0?)                                        | `app.js`              |
| JavaScript – String.toUpperCase()     | [MDN – String.toUpperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) | `app.js` |
| JavaScript – String.trim()            | [MDN – String.trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)               | `app.js` |
| JavaScript – HTMLButtonElement.disabled | [MDN – HTMLButtonElement.disabled](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/disabled)                  | `app.js` |
| Chart.js – getChart API               | [Chart.js – getChart()](https://www.chartjs.org/docs/latest/developers/api.html#getchart)                                         | `app.js` |
| Chart.js – Line Chart                 | [Chart.js – Line Chart](https://www.chartjs.org/docs/latest/charts/line.html)                                                     | `app.js` |
| Chart.js – Main Docs                  | [Chart.js – Documentation](https://www.chartjs.org/docs/latest/)                                                                  | `app.js` |
| JSON.stringify for Debug Output | [MDN – JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)                 | `app.js`                 |

| **UI – Bootstrap** |||
| Bootstrap CDN          | [Bootstrap – CDN Links](https://getbootstrap.com/docs/5.3/getting-started/introduction/#cdn-links) | `templates/index.html` |
| Bootstrap Containers   | [Bootstrap – Layout Containers](https://getbootstrap.com/docs/5.3/layout/containers/)              | `templates/index.html` |
| Bootstrap Cards        | [Bootstrap – Components: Card](https://getbootstrap.com/docs/5.3/components/card/)                 | `templates/index.html` |
| Bootstrap Buttons      | [W3Schools – Bootstrap Buttons](https://www.w3schools.com/bootstrap/bootstrap_buttons.asp)         | `templates/index.html` |
| Bootstrap Flex         | [W3Schools – Bootstrap 4 Flex](https://www.w3schools.com/bootstrap4/bootstrap_flex.asp)            | `templates/index.html` |
| Bootstrap Input Groups | [Bootstrap – Forms: Input Group](https://getbootstrap.com/docs/5.3/forms/input-group/)             | `templates/index.html` |
| Bootstrap Spinners     | [Bootstrap – Spinners](https://getbootstrap.com/docs/4.4/components/spinners/)                     | `app.js`               |
| Bootstrap – Modal Component           | [Bootstrap – Modal](https://getbootstrap.com/docs/5.3/components/modal/)                                                          | `index.html`, `app.js` |
| JavaScript – addEventListener         | [MDN – EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)            | `app.js` |


| **Other Tools & Practices** |||
| Virtual Environments | [Python Docs – venv](https://docs.python.org/3/library/venv.html) | `venv/`, `.gitignore` |
| Virtual Environments | [Real Python – Python Virtual Environments](https://realpython.com/python-virtual-environments-a-primer/) | `venv/`, `.gitignore` |
| Python Modules | [Python Docs – Modules](https://docs.python.org/3/tutorial/modules.html) | `app.py`, `stock_routes.py`, etc. |
| Python Modules & Imports | [Real Python – Python Modules and Packages](https://realpython.com/python-modules-packages/) | Imports across project |
| API Testing | [Postman Docs – Sending Requests](https://learning.postman.com/docs/sending-requests/requests/) | Manual API testing |
Here they are added to your reference list format:


| SQLAlchemy Filter in List     | [GeeksforGeeks – SQLAlchemy filter in list](https://www.geeksforgeeks.org/sqlalchemy-filter-in-list/) | `stock_routes.py`, |
| SQLAlchemy Check Row Exists   | [Stack Overflow – Flask-SQLAlchemy check if row exists](https://stackoverflow.com/questions/32938475/flask-sqlalchemy-check-if-row-exists-in-table?) | `stock_routes.py`| 



---





