import requests
import hashlib
import base64
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256

def sign_file(file_path, private_key_file):
    with open(file_path, 'rb') as file:
        file_data = file.read()

    try:
        with open(private_key_file, 'rb') as key_file:
            private_key = RSA.import_key(key_file.read())
        h = SHA256.new(file_data)
        signature = pkcs1_15.new(private_key).sign(h)
        encoded_signature = base64.b64encode(signature).decode('utf-8')

        return encoded_signature
    except Exception as e:
        print(f"Error signing the file: {e}")
        return None

def download_and_verify(url, signature, public_key_file):
    # Download file
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to download file: {response.status_code}")
        return False

    # Verify signature
    file_data = response.content
    try:
        h = SHA256.new(file_data)
        signature_decoded = base64.b64decode(signature)
        with open(public_key_file, 'rb') as f:
            public_key = RSA.import_key(f.read())

        pkcs1_15.new(public_key).verify(h, signature_decoded)
        print("Signature is valid")
        return True
    except (ValueError, TypeError) as e:
        print(f"Signature is invalid: {e}")
        return False

# Example usage:
file_to_sign = "file.txt"
private_key_file = "./private_key.pem"
public_key_file = "./public_key.pem"
url = "https://example.com/yourfile.txt"

# Sign the file
signature = sign_file(file_to_sign, private_key_file)


if signature:
    download_and_verify(url, signature, public_key_file)
