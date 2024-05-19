from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from serpapi import GoogleSearch
from flask_cors import CORS
import json
from geopy.distance import geodesic

app = Flask(__name__)
CORS(app)

load_dotenv()
api_key = os.getenv('SERPAPI_KEY')

@app.route('/api/location', methods=['POST'])
def handle_location():
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method'}), 405

    data = request.json

    if not data:
        return jsonify({'error': 'Missing location data'}), 400

    location = data.get('location')
    country = data.get('country')
    inputValue = data.get('inputValue')

    if not location:
        return jsonify({'error': 'Invalid location data'}), 400

    delivery_zip = location.get('delivery_zip') 
    user_coordinates = (location.get('latitude'), location.get('longitude'))
    
    with open('store_data_with_coordinates.json', 'r') as json_file:  
        store_data = json.load(json_file)
    
    nearby_stores = []
    for store in store_data:
        store_name = store['address']
        store_coordinates = (store['latitude'], store['longitude'])
        distance = round(geodesic(user_coordinates, store_coordinates).miles, 2)
        if distance <= 9:
            nearby_store_info = {
                "address": store_name,
                "store_id": store.get("store_id"),  
                "distance": distance  
            }
            nearby_stores.append(nearby_store_info)
    # print("here is nearby store",nearby_stores)

    if not nearby_stores:
        return jsonify({'error': 'No stores found nearby'}), 404

    store_ids = None
    shortest_distance = float('inf')

    for store in nearby_stores:
        if store['distance'] < shortest_distance:
            shortest_distance = store['distance']
            store_ids = store['store_id']
    
    params = {
        "engine": "home_depot",
        "q":inputValue or "table",
        "delivery_zip": delivery_zip,
        "api_key": api_key,
        "store_id": store_ids,  
        "page": "1",
        "country": country,
        "ps": "50",
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    if "search_information" not in results:
        return jsonify({'message': 'No search_information found or API request failed'}), 404

    search_information = results["search_information"]
    # print("here is the search information",results)
    search_information_data = {
        "total_results": search_information.get("total_results", "N/A"),
        "store_id": search_information.get("store_id", "N/A"),
        "store_name": search_information.get("store_name", "N/A"),
        "delivery_zip":delivery_zip
    }

    if "products" not in results:
        return jsonify({'message': 'No products found or API request failed'}), 404

    products = results["products"]
    product_data = []

    for product in products:
        pickup_info = product.get("pickup", {})

        product_info = {
            "Title": product.get("title", "N/A"),
            "Price": product.get("price", "N/A"),
            "id": product.get("product_id", "N/A"),
            "Thumbnail": product["thumbnails"][0][5],
            "Description": product.get("description", "N/A"),
            "Quantity_Left": pickup_info.get("quantity", "N/A")

        }
        product_data.append(product_info)

    return jsonify({
        "products": product_data,
        "search_information": search_information_data,
        "nearby_stores": nearby_stores
    })
    
@app.route('/api/search', methods=['POST'])
def handelSearch():
    data = request.json
    
    print(data)
    

    params = {
            "engine": "home_depot",
            "q":data.get('inputValue'),
            "delivery_zip": data.get('delivery_zip'),
            "api_key": api_key,
            "store_id":data.get('store_ids'),  
            "page": "1",
            "country": 'us',
            "ps": "50",
        }
    search = GoogleSearch(params)
    results = search.get_dict()

    if "search_information" not in results:
        return jsonify({'message': 'No search_information found or API request failed'}), 404

    search_information = results["search_information"]
    # print("here is the search information",results)
    search_information_data = {
        "total_results": search_information.get("total_results", "N/A"),
        "store_id": search_information.get("store_id", "N/A"),
        "store_name": search_information.get("store_name", "N/A"),
        "delivery_zip":data.get('delivery_zip')
    }

    if "products" not in results:
        return jsonify({'message': 'No products found or API request failed'}), 404

 

    
if __name__ == '__main__':
    app.run(debug=True)