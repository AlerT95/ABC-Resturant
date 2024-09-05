from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from selenium.common.exceptions import TimeoutException, NoSuchElementException, WebDriverException

def login(email, password):
    """
    Login to the application using the provided email and password.

    Args:
        email (str): Email address to use for login.
        password (str): Password to use for login.

    Returns:
        str: Login result ("Login success" or "Login error").
    """

    try:
        driver = webdriver.Chrome()  # Remove headless mode
        driver.set_page_load_timeout(10)  # Set page load timeout to 10 seconds

        try:
            driver.get("http://localhost:5173/login")
        except TimeoutException:
            print("Timed out waiting for page to load")
            return "Error: Timed out waiting for page to load"

        try:
            email_input = driver.find_element(By.XPATH, '/html/body/div/body/div/div/div[1]/div/div/div/div[2]/div/div[2]/form/div[1]/input')
            email_input.send_keys(email)

            password_input = driver.find_element(By.XPATH, '/html/body/div/body/div/div/div[1]/div/div/div/div[2]/div/div[2]/form/div[2]/input')
            password_input.send_keys(password)

            # Submit the form
            password_input.send_keys(Keys.RETURN)

            time.sleep(2)  # Wait for the login response

            try:
                error_element = driver.find_element(By.XPATH, '/html/body/div/body/div[1]')
                if error_element.get_attribute('class') == 'danger':
                    return "Login error"
                else:
                    return "Login success"
            except NoSuchElementException:
                print("Error element not found")
                return "Error: Error element not found"

        except NoSuchElementException as e:
            print(f"Error finding element: {e}")
            return "Error: Element not found"

    except WebDriverException as e:
        print(f"Error initializing WebDriver: {e}")
        return "Error: WebDriver error"

    finally:
        driver.quit()

print(login("add email","add password"))