from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from scraper import scrape_amazon  # Now uses Bright Data

app = Flask(__name__)
CORS(app)
#app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///products.db"

db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))
    image = db.Column(db.String(1000))
    url = db.Column(db.String(1000))
    price = db.Column(db.String(1000))

    def __init__(self, name, image, url, price):
        self.name = name
        self.image = image
        self.url = url
        self.price = price

def scrape_and_save_data(search_query=None):
    elements = scrape_amazon(search_query) if search_query else scrape_amazon()
    # Clear existing data before new scrape
    Product.query.delete()
    for i, element in enumerate(elements):
        try:
            name = element.select_one("h2 a span")
            name = name.text.strip() if name else "No product name available"

            url = element.select_one("h2 a")
            url = f"https://www.amazon.com{url['href']}" if url and url.has_attr("href") else "No URL available"

            image = element.select_one("img.s-image")
            image = image["src"] if image and image.has_attr("src") else "No image available"

            price = element.select_one("span.a-offscreen")
            price = price.text if price else "Price not available"

            new_product = Product(name=name, image=image, url=url, price=price)
            db.session.add(new_product)
        except Exception as e:
            print(f"Error on element {i + 1}: {e}")
    db.session.commit()

@app.route('/api/data', methods=['POST'])
def add_data():
    data = request.get_json()
    search_query = data.get('query') if data else None
    scrape_and_save_data(search_query)
    return jsonify({'message': 'Scraping completed and data added!'}), 202

@app.route('/api/data', methods=['GET'])
def get_data():
    data = Product.query.all()
    result = [{
        'id': item.id,
        'name': item.name,
        'image': item.image,
        'url': item.url,
        'price': item.price
    } for item in data]
    return jsonify(result)

@app.route('/')
def home():
    return 'Hello, just a webpage...'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, use_reloader=False)
