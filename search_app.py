from flask import Flask, request, jsonify, render_template
from get_stock_data import get_stock_details, get_watchlist_data, get_stock_news, get_stock_filings

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/get_stock_details', methods = ['POST'])
def get_stock_details_route():
    ####################  retrieve ticker dictionary through js function  ####################
    data = request.get_json()
    
    ####################  use key to get value from dictionary  ####################
    searchText = data.get('searchText', '').upper()
    
    ####################  plug ticker into yFinance  ####################
    stockData = get_stock_details(searchText)
    
    ####################  and return to js function as JSON object  ####################
    return jsonify(stockData)

@app.route('/get_watchlist_data', methods = ['POST'])
def get_watchlist_data_route():
    ####################  retrieve watchlist dictionary through js function  ####################
    data = request.get_json()
    
    ####################  use key to get value from dictionary  ####################
    tickerList = data.get('tickerList', [])
    
    ####################  plug watchlist into yFinance  ####################
    infoList = get_watchlist_data(tickerList)
    
    ####################  and return to js function as JSON object  ####################
    return jsonify(infoList)

if __name__ == '__main__':
    app.run(debug=True)