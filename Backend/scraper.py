import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("BRIGHT_DATA_API_KEY")
zone = os.getenv("BRIGHT_DATA_ZONE")
url = os.getenv("BRIGHT_DATA_URL")

if not api_key or not zone:
    raise EnvironmentError("Missing BRIGHT_DATA_API_KEY or BRIGHT_DATA_ZONE in .env")

def scrape_with_web_unlocker(target_url: str) -> str:

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "zone": zone,
        "url": target_url,
        "format": "raw"
    }

    try:
        response = requests.post(
            "https://api.brightdata.com/request",
            json=data,
            headers=headers
        )

        print("Response status:", response.status_code)
        response.raise_for_status()
        #print("Response Text: ", response.text)

        html = response.text
        print("HTML length:", len(html))
        print(html[:1000])  # Preview first 1000 characters for debug
        return html

    except requests.exceptions.HTTPError:
        print("HTTP error response:", response.text)
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request exception: {e}")
        raise

def scrape_amazon(search_term: str = "mechanical keyboard"):
    search_url = f"https://www.amazon.com/s?k={search_term.replace(' ', '+')}"
    html = scrape_with_web_unlocker(search_url)
    soup = BeautifulSoup(html, "html.parser")

    product_elements = soup.select("div.s-result-item[data-component-type='s-search-result']")
    print("Found products:", len(product_elements))
    if not product_elements:
        print("⚠️ No products found — page structure may have changed or search returned no results.")

    return product_elements