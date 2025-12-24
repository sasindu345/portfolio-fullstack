#!/bin/bash

# Test Cloudinary Integration
# This script tests the upload endpoint with proper authentication

echo "========================================="
echo "Cloudinary Upload Endpoint Test"
echo "========================================="
echo ""

# Step 1: Login
echo "Step 1: Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}')

echo "Login Response:"
echo "$LOGIN_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$LOGIN_RESPONSE"
echo ""

# Extract token using grep
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get token. Login may have failed."
  exit 1
fi

echo "✅ Token received: ${TOKEN:0:20}..."
echo ""

# Step 2: Test upload
echo "Step 2: Testing upload endpoint..."

# Check if test image exists
TEST_IMAGE="/Users/oneionei/portfolio-fullstack/client/public/Images/home/myimg.jpeg"

if [ ! -f "$TEST_IMAGE" ]; then
  echo "❌ Test image not found at $TEST_IMAGE"
  exit 1
fi

echo "Uploading image from: $TEST_IMAGE"
echo ""

UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:5001/api/uploads/single \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@$TEST_IMAGE")

echo "Upload Response:"
echo "$UPLOAD_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$UPLOAD_RESPONSE"
echo ""

# Check if upload was successful
if echo "$UPLOAD_RESPONSE" | grep -q "cloudinary.com"; then
  echo "✅ SUCCESS! Cloudinary URL detected in response"
  echo "✅ Image uploaded successfully to Cloudinary"
else
  echo "❌ Upload may have failed or Cloudinary URL not found"
fi
