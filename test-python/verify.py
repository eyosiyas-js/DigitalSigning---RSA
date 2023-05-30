import requests
import hashlib
import base64
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256

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

url = "https://storage.googleapis.com/eth-telegram.appspot.com/1677133029839_proposal.docx?GoogleAccessId=firebase-adminsdk-m34l8%40eth-telegram.iam.gserviceaccount.com&Expires=1679000400&Signature=iB3z%2BLKu32M2TVBHTRdATwympWNdm5x2EFnGyf4Io0dNcoV1oOXfM%2BWhKPMKoM2QfCLDE0gdQRtfO0qmuc75TiRMz036GaOjysgrOX%2BEie0JU%2BaIxjo%2BalBTqM0QSuSVa6v3emsq0AQUPG3xr4%2BMesRuCmeL0E4ZBCO7mky02mK87S3MlIQGgbFiCoJA3G5jgIK4rbxkylSfq0oz93qmZRyjIosQzxzzuxuaKQdg%2FPea9ltnhajNRLzVeWQwZNEQOds1rdfXQTUURtz3E30cPRG752CC3pEQed1tJNH1gp%2FRVHSDfWwUAx8gU1JE2GwzMDzX92BDZt07t5LkcMsaHA%3D%3D"
signature = "iS8HWW5fUBDxLm4JXsJoIMaVtsWjnFw+JKIAtyd8dfAucB8Pjz3qY5YSerZaKORDw9f9tSgx7tqN1LAr0g2rvy4TC/s8efLv3jhf9nj4sE5NnffJ+ptGpCt3v0+8i4GNVrg3H2E4C/yZLwFQ+NtzjhJrn+ie2+J3CJaQouashBJE43cFNF77d02hSy3iQm9zBe7G+Vcd/uMyRZySpqkqof//NtyBRGYfskZZI2si4eYnVCPasHKXt3f9Fzyq341qfhfsiCzsP4wF8i41zQsVvqqCFiZzI7e2qf+xDoAdlaNzR1uOg=="
public_key_file = "./public_key.pem"

download_and_verify(url, signature, public_key_file)