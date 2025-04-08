#!/bin/bash

URL="http://localhost:4000/api/seeding"

echo "Sending GET request to $URL..."

# Save the response body and HTTP status code separately
response=$(curl -s -w "\n%{http_code}" "$URL")

# Extract the HTTP status code (last line)
http_status=$(echo "$response" | tail -n1)

# Extract the response body (everything except the last line)
body=$(echo "$response" | sed '$d')

if [ "$http_status" -ge 200 ] && [ "$http_status" -lt 300 ]; then
  echo "✅ Success ($http_status)"
  echo "$body"
else
  echo "❌ Request failed with status code: $http_status"
  echo "Response:"
  echo "$body"
fi
