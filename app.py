from flask import Flask, render_template, request, redirect, url_for, jsonify
from get_stock_data import get_stock_news, get_stock_filings, get_stock_details, get_watchlist_data

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template('homepage.html')

@app.route("/login")
def login():
    return render_template('loginpage.html')

@app.route("/documentation")
def documentation():
    return render_template('documentation.html')

@app.route("/settings")
def settings():
    return render_template('settings.html')

@app.route("/news")
def news_page(ticker):
    articles = get_stock_news(ticker)
    return render_template('news.html', ticker=ticker, articles=articles)

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