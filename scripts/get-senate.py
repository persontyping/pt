import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re

# Config
URL = "https://www.aph.gov.au/Senators_and_Members/Senators/Senators_photos"
FOLDER = "48th Parliament - Photos of Senators"
os.makedirs(FOLDER, exist_ok=True)

# Fetch HTML
resp = requests.get(URL)
soup = BeautifulSoup(resp.text, "html.parser")

# Loop through each senator entry
senators = soup.select('ul.gallery li')

for senator in senators:
    img_tag = senator.find("img")
    p_tag = senator.find("p")
    
    if not img_tag or not p_tag:
        print("⚠️ Skipping incomplete entry")
        continue

    # Extract image src and build full URL
    img_src = img_tag.get("src", "")
    img_url = urljoin(URL, img_src)

    # Extract name (from alt or fallback span)
    name = img_tag.get("alt")
    if not name:
        name_span = senator.find("span", class_="name")
        name = name_span.text.strip() if name_span else "Unknown"

    # Extract location and clean it
    location_raw = p_tag.text.strip()
    location = location_raw.replace("Senator for ", "")

    # Create filename
    safe_name = re.sub(r'[^A-Za-z0-9_-]', '_', name)
    safe_location = re.sub(r'[^A-Za-z0-9_-]', '_', location)
    filename = f"{safe_name}_-_{safe_location}.jpg"
    filepath = os.path.join(FOLDER, filename)

    # Download image
    try:
        img_data = requests.get(img_url).content
        with open(filepath, "wb") as f:
            f.write(img_data)
        print(f"✅ Downloaded: {filename}")
    except Exception as e:
        print(f"❌ Failed to download {img_url}: {e}")

print(f"\n🎉 All images saved in '{FOLDER}'")
