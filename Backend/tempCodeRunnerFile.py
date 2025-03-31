#from scraper import create_webdriver, scrape_amazon

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

'''@app.route('/api/data', methods=['POST'])
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
        return jsonify({'message': 'New product added!'}), 201'''


def scrape_and_save_data():
    from scraper import create_webdriver, scrape_amazon
    driver = create_webdriver()
    try:
        element_list = scrape_amazon(driver)

        for index, element in enumerate(element_list):
            try:
                #whole_part_element = element.find_element(By.CLASS_NAME, "a-price-whole")
                #fraction_part_element = element.find_element(By.CLASS_NAME, "a-price-fraction")
                #whole_part = whole_part_element.text
                #fraction_part = fraction_part_element.text

                try:
                    name = element.find_element(By.CSS_SELECTOR, "h2 a span").text
                    #name = element.text
                except:
                    name = "No product name available"

                # Product URL
                try:
                    url = element.find_element(By.CSS_SELECTOR, "h2 > a.a-link-normal").get_attribute("href")
                except:
                    url = "No URL available"

                # Product Image
                try:
                    image = element.find_element(By.CSS_SELECTOR, "img.s-image").get_attribute("src")
                except:
                    image = "No image available"

                # Product Price
                try:
                    price = element.find_element(By.CSS_SELECTOR, "span.a-offscreen").text
                except:
                    price = "Price not available"

                #print(f"Element {index + 1} text: {element.text}")
                print(f"Element {index + 1} text: {name}")
                print(f"Element {index + 1} url: {url}")
                print(f"Element {index + 1} image: {image}")
                print(f"Element {index + 1} price: {price}")
                #print(f"Element {index + 1} HTML: {element.get_attribute('outerHTML')}")


                new_product = Product(
                    #id = index + 1,
                    #name = element.text,
                    #image = element.get_attribute('img'),
                    #url = element.get_attribute('href'),
                    #price = f"{whole_part}.{fraction_part}"
                    name=name,
                    image=image,
                    url=url,
                    price=price
                )
                print(f"New product: {new_product}")
                db.session.add(new_product)
                print(f"New product: {new_product}")

            except Exception as e:
                print(f"Error processing element {index + 1}: {e}")

        db.session.commit()
        print(f"New product: {new_product}")
    finally:
        #driver.quit()
        pass

@app.route('/api/data', methods=['POST'])
async def add_data():
    # Start the scraper as an asynchronous task
    #loop = asyncio.get_event_loop()
    #await loop.run_in_executor(None, scrape_and_save_data)
    scrape_and_save_data()
    return jsonify({'message': 'Scraping started! Data will be added shortly.'}), 202

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
    with app.app_context(): 
        db.create_all()
    app.run(debug=True, use_reloader=False)