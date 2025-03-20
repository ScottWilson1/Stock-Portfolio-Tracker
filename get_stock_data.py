import yfinance as yf
from edgar import Company, set_identity, get_filings
import numpy as np
import re


# will be used to retrieve more details for when the user clicks on a stock or searches for a stock
def get_stock_details(ticker):
    stock_data = {}
    stock = yf.Ticker(ticker)
    hist = stock.history(period="2d")
    info = stock.info
    
    # helper function to get annual revenue
    def get_annual_revenue(stock):
        income_stmt = stock.income_stmt
        latest_date = income_stmt.columns[0]
        latest_revenue = income_stmt.loc["Total Revenue", latest_date]
        return latest_revenue # this will always be for the year prior to current year. It is now 2025 so it will be for 2024

    stock_data[ticker] = {
        "ticker_symbol": ticker,
        "company_name": info['displayName'],
        "industry": info['industry'],
        "cur_price": info['currentPrice'],
        "pct_change": ((hist['Close'].iloc[-1] - hist['Close'].iloc[-2]) / hist['Close'].iloc[-2]) * 100,
        "day_open": hist['Open'].iloc[-1],
        "day_low": hist['Low'].iloc[-1],
        "day_high": hist['High'].iloc[-1],
        "52wk_low": info['fiftyTwoWeekLow'],
        "52wk_high": info['fiftyTwoWeekHigh'],
        "market_cap": info['marketCap'],
        "curr_volume": info['volume'],
        "avg_volume": info['averageVolume'],
        "annual_revenue": get_annual_revenue(stock)
    }

    return stock_data

# used only for the watchlist where a subset of information, namely ticker, price, and percent of change are depicted.
def get_watchlist_data(tickers):
    stocks_data = {}

    for ticker in tickers:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="2d")
        info = stock.info
        
        stocks_data[ticker] = {
            "ticker_symbol": ticker,
            "cur_price": info['currentPrice'],
            # maybe use pct_change to indicate red or green so that we can but the actual ppercentage where stock details is
            "pct_change": ((hist['Close'].iloc[-1] - hist['Close'].iloc[-2]) / hist['Close'].iloc[-2]) * 100
        }

    return stocks_data

# returns a list of articles (from different sources) as a dictionary with the keys that we are interested in being: 'title', 'canonicalUrl.url', 'provider.displayName', 'pubDate'
def get_stock_news(ticker):
    stock = yf.Ticker(ticker)
    news = stock.news
    df = pd.Dataframe(news)

    return df.head(10) # get only 10

# use edgartools to extract SEC filing documents
def get_stock_filings(userEmail, ticker):
    set_identity(userEmail)
    ticker_symbol = Company(ticker)
    filings = ticker_symbol.get_filings()
    df = filings.to_pandas()
    
    return df.head(10) # get only 10
    
    
# main function used for testing get_watchlist_data() and get_stock_details()
# I am also printing out the returned data from get_stock_news() and get_stock_filings() 
def main(): 
    print("Single or multiple stocks? Type 's' for Single or 'm' for multiple.")
    answer = input().strip().lower()
    
    if answer == 's':
        print("Enter ticker symbol: ")
        ticker = input().strip().upper()
        stock_data = get_stock_details(ticker)
        stock_news = get_stock_news(ticker)
        stock_filings = get_stock_filings('PUT YOUR EMAIL HERE FOR THE TIME BEING', ticker)
        print(stock_data, stock_news, stock_filings)
    
    else:
        print("Enter ticker symbols: ")
        ticker_symbols = input().strip().upper()
        tickers = re.split(r'[,\s]+', ticker_symbols)  
        stock_data = get_watchlist_data(np.array(tickers))
        print(stock_data)
    
    
if __name__ == "__main__":
    main()
