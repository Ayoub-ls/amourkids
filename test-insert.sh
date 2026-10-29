#!/bin/bash
# Replace YOUR_ANON_KEY_HERE with your real anon public key first.
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodnJjY2Njb3B6eXFoZW10aWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MzY5NTksImV4cCI6MjEwNjExMjk1OX0.BrHg5jwEHIwLIjjFO2T4yt8mg2Yf3bSYYri6_EHxyzc"

curl -i -X POST 'https://qhvrccccopzyqhemtiep.supabase.co/rest/v1/orders' \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "product": "test",
    "variant": "test",
    "name": "Test Test",
    "phone": "0555000000",
    "wilaya": "test",
    "commune": "test",
    "delivery": "home",
    "quantity": 1,
    "unit_price": 100,
    "total": 100
  }'
