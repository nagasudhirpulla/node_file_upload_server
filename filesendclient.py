import requests

file = open(
    r'C:\Users\Nagasudhir\Documents\NodeJS Projects\file_upload_server\test.txt', 'rb')
url = 'http://localhost:3000/upload'
payload = {'dest': r'C:\Users\Nagasudhir\Desktop'}
files = {'file': file}
try:
    r = requests.post(url, files=files, data=payload)
    json_data = r.json()
    print(json_data)
except:
    print("Error occured file uploading file")
