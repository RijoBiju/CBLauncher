from PySide6.QtWidgets import QApplication
import sys, os, pickle, base64, requests
from pathlib import Path

CONFIG_FOLDER_LOCATION = Path("config")
SETTINGS_FILE_LOCATION = Path("config/settings.dat")
SPLASHSCREEN_LOCATION = 'splashscreen.gif'

def create_config_folder() -> None:
    if CONFIG_FOLDER_LOCATION.exists() == False:
        os.mkdir(CONFIG_FOLDER_LOCATION)

def settings_file() -> bool:
    if SETTINGS_FILE_LOCATION.exists():
        return True

def decode_password(password: bytes) -> str:
    return bytes(base64.b64decode(password.decode('utf-8'))).decode('utf-8')

def parse_login_details() -> str:
    with open(SETTINGS_FILE_LOCATION, 'rb') as settings_file:
        data = pickle.load(settings_file)

    username = data[0]
    password = decode_password(data[1])

    return username, password

def auto_login(username: str, password: str) -> bool:
    response = requests.post('https://cbauth.herokuapp.com/', data={'discord':'{}'.format(username), 'password':'{}'.format(password)})
    if response.text != 'passed':
        return False 

if __name__ == '__main__':
    app = QApplication(sys.argv)
    create_config_folder()
    if settings_file:
        username, password = parse_login_details()
        if auto_login(username, password):
            pass #Open main window
        else:
            pass #Open login window
    else:
        pass #Open login window
    sys.exit(app.exec_())