from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///product_data.db'
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

@app.route('/api/data', methods=['POST'])
def add_data():
    if request.method == 'POST':
        data = request.json
        new_product = Product(
            name=data['name'], 
            image=data['image'], 
            url=data['url'], 
            price=data['price']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'New product added!'}), 201

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
def message():
    return 'Hello, just a webpage...'

if __name__ == '__main__':
    #make sure to create the database and tables before running the app
    #with app.app_context(): 
        #db.create_all()
    app.run(debug=True)