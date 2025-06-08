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

    Product.query.delete()

    products = []

    for i, element in enumerate(elements):
        try:
            name_el = element.select_one("a h2 span")
            name = name_el.text.strip() if name_el else "No product name available"

            url_el = element.select_one("a.a-link-normal")
            url = f"https://www.amazon.com{url_el['href']}" if url_el and url_el.has_attr("href") else "No URL available"

            image_el = element.select_one("img.s-image")
            image = image_el["src"] if image_el and image_el.has_attr("src") else "No image available"

            price_el = element.select_one("span.a-offscreen")
            price = price_el.text if price_el else "Price not available"

            try:
                price_value = float(price.replace("$", "").replace(",", ""))
            except:
                continue  # Skip products with non-numeric prices

            # Insert into sorted list (ascending order)
            inserted = False
            for j in range(len(products)):
                if price_value < products[j]['price_value']:
                    products.insert(j, {
                        'name': name,
                        'url': url,
                        'image': image,
                        'price': price,
                        'price_value': price_value
                    })
                    inserted = True
                    break
            if not inserted:
                products.append({
                    'name': name,
                    'url': url,
                    'image': image,
                    'price': price,
                    'price_value': price_value
                })

        except Exception as e:
            print(f"Error on element {i + 1}: {e}")

    for p in products:
        db.session.add(Product(name=p['name'], image=p['image'], url=p['url'], price=p['price']))
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
