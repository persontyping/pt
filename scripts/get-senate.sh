#!/bin/bash

URL="https://www.aph.gov.au/Senators_and_Members/Senators/Senators_photos"
FOLDER="48th Parliament - Photos of Senators"
DEBUG=true  # Change to false to hide debug output

mkdir -p "$FOLDER"

# Get the HTML
HTML=$(curl -s "$URL")

# Extract all <li>...</li> blocks properly using sed
echo "$HTML" |
sed -n '/<li>/,/<\/li>/p' |
awk 'BEGIN{RS="</li>"; ORS="</li>\n"} {print}' |
echo "🧑 \n$BLOCK\n" |
while read -r BLOCK; do
  [[ $DEBUG == true ]] && echo -e "\n🔍 Processing block:\n$BLOCK\n"

  # Extract image src
  SRC=$(echo "$BLOCK" | grep -o 'src="[^"]*"' | head -1 | sed 's/src="//;s/"//')
  [[ $DEBUG == true ]] && echo "📷 SRC: $SRC"

  # Extract alt (senator name)
  ALT=$(echo "$BLOCK" | grep -o 'alt="[^"]*"' | head -1 | sed 's/alt="//;s/"//')
  [[ $DEBUG == true ]] && echo "🧑 ALT: $ALT"

  # Extract and clean location
  LOCATION=$(echo "$BLOCK" | grep -o '<p[^>]*>[^<]*</p>' | sed -n 's/.*Senator for \(.*\)<.*/\1/p')
  [[ $DEBUG == true ]] && echo "🌏 LOCATION: $LOCATION"

  # Skip incomplete data
  if [[ -z "$SRC" || -z "$ALT" || -z "$LOCATION" ]]; then
    echo "⚠️ Missing data, skipping this entry."
    continue
  fi

  # Clean filename
  CLEAN_NAME=$(echo "$ALT" | tr ' /' '__' | sed 's/[^A-Za-z0-9_.-]//g')
  CLEAN_LOCATION=$(echo "$LOCATION" | tr ' /' '__' | sed 's/[^A-Za-z0-9_.-]//g')
  FILE_PATH="$FOLDER/${CLEAN_NAME}_-_${CLEAN_LOCATION}.jpg"

  # Download the image
  FULL_URL="https://www.aph.gov.au$SRC"
  [[ $DEBUG == true ]] && echo "🌐 Downloading from: $FULL_URL"
  wget -q -O "$FILE_PATH" "$FULL_URL"

  if [[ $? -eq 0 ]]; then
    echo "✅ Downloaded: ${CLEAN_NAME}_-_${CLEAN_LOCATION}.jpg"
  else
    echo "❌ Failed to download: $FULL_URL"
  fi
done

echo -e "\n🎉 All senator images processed and saved in '$FOLDER'"
