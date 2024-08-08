from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
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

@app.route('/')
def message():
    return 'Hello world!'

if __name__ == '__main__':
    app.run(debug=True)