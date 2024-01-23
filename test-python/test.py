
import urllib.request
import base64
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
from urllib import request
import requests


file_url = 'example.com/file_1'
response = requests.get(file_urly)
data = response.content
print(data)
