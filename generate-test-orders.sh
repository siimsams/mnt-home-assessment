#!/bin/bash

# Base URL for the API
API_URL="http://localhost:3000/orders"
AUTH_URL="http://localhost:3000/auth-token"

# Get JWT token
echo "Getting JWT token..."
JWT_TOKEN=$(curl -s "$AUTH_URL")
echo "Token received"

# Arrays for random data generation
countries=("EST" "LVA" "LTU" "FIN" "SWE" "NOR" "DNK")
currencies=("EUR" "USD" "GBP")
streets=("Main Street" "Park Avenue" "Broadway" "Wall Street" "Market Street")
towns=("Tallinn" "Riga" "Vilnius" "Helsinki" "Stockholm" "Oslo" "Copenhagen")

# Function to generate a random date within the next 30 days
generate_due_date() {
    local days=$((RANDOM % 30))
    date -v+${days}d -u +"%Y-%m-%dT%H:%M:%S%z"
}

# Function to generate a random amount between 10 and 1000
generate_amount() {
    echo $((RANDOM % 990 + 10))
}

# Generate and send 100 orders
for i in {1..300}; do
    # Generate random data
    order_number="ORD-$(date +%Y%m%d)-$i"
    country=${countries[$RANDOM % ${#countries[@]}]}
    currency=${currencies[$RANDOM % ${#currencies[@]}]}
    street=${streets[$RANDOM % ${#streets[@]}]}
    town=${towns[$RANDOM % ${#towns[@]}]}
    amount=$(generate_amount)
    payment_due_date=$(generate_due_date)
    
    # Create JSON payload
    json_data=$(cat <<EOF
{
    "orderNumber": "$order_number",
    "paymentDescription": "Payment for order $order_number",
    "streetAddress": "$street",
    "town": "$town",
    "country": "$country",
    "amount": $amount,
    "currency": "$currency",
    "paymentDueDate": "$payment_due_date"
}
EOF
)

    echo "Creating order $i: $order_number"
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer $JWT_TOKEN" \
         -d "$json_data" \
         "$API_URL"
    
    echo -e "\n"
done

echo "Finished generating 300 test orders" 