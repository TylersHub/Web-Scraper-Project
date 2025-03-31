from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def create_webdriver():
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    return driver

def scrape_amazon(driver):

    try:
        while True:
            driver.get("https://google.com")

            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, "gLFyf"))
            )

            google_search = driver.find_element(By.CLASS_NAME, "gLFyf")
            google_search.clear()
            google_search.send_keys("Amazon" + Keys.ENTER)

            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, "Amazon.com. Spend less. Smile more."))
            )

            link = driver.find_element(By.PARTIAL_LINK_TEXT, "Amazon.com. Spend less. Smile more.")
            link.click()

            try:
                WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.ID, "twotabsearchtextbox"))
                )
                #If found then break the loop
                break
            except Exception as e:
                print("Amazon search box not found, retrying...")
                time.sleep(2)

        amazon_search = driver.find_element(By.ID, "twotabsearchtextbox")
        amazon_search.clear()
        amazon_search.send_keys("RTX 3080" + Keys.ENTER)

        element_list = WebDriverWait(driver, 20).until(
            #EC.presence_of_all_elements_located(
            #(By.XPATH, "//div[@class='s-main-slot s-result-list s-search-results sg-row']//*[contains(text(), 'RTX 3080')]"))
            EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, "div.s-main-slot div.s-result-item"))
        )

        time.sleep(5)

        #element_list = driver.find_elements(By.CSS_SELECTOR, "div.data-asin")

        time.sleep(10)

        #return element_list
    
        #for index, element in enumerate(element_list):
            #print(f"Element {index + 1} text: {element.text}")
            #print(f"Element {index + 1} HTML: {element.get_attribute('outerHTML')}")

        return element_list
    
    finally:
        time.sleep(10)
        #driver.quit()
        

#driver = create_webdriver()
#scrape_amazon(driver)

    #product_item = driver.find_element(By.XPATH, "//div[@class='s-main-slot s-result-list s-search-results sg-row']//*[contains(text(), 'RTX 3080')]")
    #product_item = driver.find_element(By.XPATH, "//*[contains(text(), 'RTX 3080')]")
    #product_item.click()

    #Testing Purposes
    #print("Element text:", product_item.text)
    #print("Element HTML:", product_item.get_attribute('outerHTML'))

    #for index, element in enumerate(element_list):
        #print(f"Element {index + 1} text: {element.text}")
        #print(f"Element {index + 1} HTML: {element.get_attribute('outerHTML')}")
