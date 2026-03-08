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

RATE_LIMIT_TEXT = "Your system is sending too many of this type of request"
is_rate_limited = False


def scrape_with_web_unlocker(target_url: str) -> str:
    global is_rate_limited
    if is_rate_limited:
        raise RuntimeError("Bright Data rate limit active.")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    data = {
        "zone": zone,
        "url": target_url,
        "format": "raw",
    }

    try:
        response = requests.post(
            "https://api.brightdata.com/request",
            json=data,
            headers=headers,
        )

        print("Response status:", response.status_code)
        response.raise_for_status()

        html = response.text
        print("HTML length:", len(html))

        if RATE_LIMIT_TEXT.lower() in html.lower():
            is_rate_limited = True
            print("Bright Data rate limit response received.")
            raise RuntimeError("Bright Data rate limit reached.")

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
        print("No products found - page structure may have changed or search returned no results.")

    return product_elements


def scrape_amazon_product_description(product_url: str) -> str:
    return "Description"
    # if not product_url or not product_url.startswith("http"):
    #     return "Description not available."
    # if is_rate_limited:
    #     return "Description not available."

    # try:
    #     html = scrape_with_web_unlocker(product_url)
    #     soup = BeautifulSoup(html, "html.parser")

    #     bullet_points = []
    #     for selector in [
    #         "#feature-bullets ul li span.a-list-item",
    #         "#feature-bullets li span",
    #         "#productOverview_feature_div tr td",
    #     ]:
    #         for el in soup.select(selector):
    #             text = " ".join(el.get_text(" ", strip=True).split())
    #             if text and len(text) > 8 and text not in bullet_points:
    #                 bullet_points.append(text)
    #             if len(bullet_points) >= 6:
    #                 break
    #         if len(bullet_points) >= 6:
    #             break

    #     if bullet_points:
    #         return " ".join(bullet_points)[:1400]

    #     description_el = soup.select_one("#productDescription p, #productDescription span")
    #     if description_el:
    #         text = " ".join(description_el.get_text(" ", strip=True).split())
    #         if text:
    #             return text[:1400]

    #     return "Description not available."
    # except Exception as e:
    #     print(f"Description scrape failed for {product_url}: {e}")
    #     return "Description not available."
