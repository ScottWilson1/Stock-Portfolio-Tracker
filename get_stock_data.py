import yfinance as yf # pip install yfinance
from edgar import Company, set_identity, get_filings # "pip install edgartools"
import pandas as pd
import numpy as np
import re

'''
To test out the functions to see what they are returning, go to the bottom and 
put your email in the placeholder inside the Main function.
'''

# will be used to retrieve more details on a given stock
def get_stock_details(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="2d")
    info = stock.info
    
    # helper function to get annual revenue
    def get_annual_revenue(stock):
        income_stmt = stock.income_stmt
        latest_date = income_stmt.columns[0]
        latest_revenue = income_stmt.loc["Total Revenue", latest_date]
        return latest_revenue # this will always be for the year prior to current year. It is now 2025 so it will be for 2024

    stock_data = {
        "ticker_symbol": ticker,
        "company_name": info["displayName"] if "displayName" in info else None,
        "industry": info["industry"] if "industry" in info else None,
        "cur_price": info["currentPrice"] if "currentPrice" in info else None,
        "pct_change": ((hist['Close'].iloc[-1] - hist['Close'].iloc[-2]) / hist['Close'].iloc[-2]) * 100,
        "day_open": hist['Open'].iloc[-1] if 'Open' in hist.columns else None,
        "day_low": hist['Low'].iloc[-1] if 'Low' in hist.columns else None,
        "day_high": hist['High'].iloc[-1] if 'High' in hist.columns else None,
        "52wk_low": info["fiftyTwoWeekLow"] if "fiftyTwoWeekLow" in info else None,
        "52wk_high": info["fiftyTwoWeekHigh"] if "fiftyTwoWeekHigh" in info else None,
        "market_cap": info["marketCap"] if "marketCap" in info else None,
        "curr_volume": info["volume"] if "volume" in info else None,
        "avg_volume": info["averageVolume"] if "averageVolume" in info else None,
        "annual_revenue": get_annual_revenue(stock)
    }

    return stock_data # dictionary


# used only for the watchlist where a subset of information, namely ticker, price, and percent of change are depicted.
def get_watchlist_data(tickers):
    stocks_data = {}

    for ticker in tickers:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="2d")
        info = stock.info
        
        stocks_data[ticker] = {
            "ticker_symbol": ticker,
            "cur_price": info["currentPrice"] if "currentPrice" in info else None,
            # maybe use pct_change to indicate red or green so that we can but the actual ppercentage where stock details is
            "pct_change": ((hist['Close'].iloc[-1] - hist['Close'].iloc[-2]) / hist['Close'].iloc[-2]) * 100
        }

    return stocks_data # dictionary of dictionaries (stonks(stonk: stuff about stonk))


# uses yfinance news method which fetches articles from different publications
def get_stock_news(ticker):
    stock = yf.Ticker(ticker)
    news = stock.news[:10]  # get only 10

    filtered_news = []
    for article in news:
        content = article.get('content', {})
        filtered_article = {
            'title': content.get('title'),
            'url': content.get('canonicalUrl', {}).get('url'),
            'publisher': content.get('provider', {}).get('displayName'),
            'pubDate': content.get('pubDate')
        }
        filtered_news.append(filtered_article)

    return filtered_news # list of dictionaries


# uses edgartools to extract SEC filing documents
def get_stock_filings(userEmail, ticker):
    set_identity(userEmail)
    ticker_symbol = Company(ticker)
    filings = ticker_symbol.get_filings()
    df = filings.to_pandas()
    df = df[['filing_date', 'primaryDocDescription', 'primaryDocument', 'accession_number']].head(10)
    
    # create full urls 
    df['document_url'] = df.apply(
        lambda row: f"https://www.sec.gov/Archives/edgar/data/{str(ticker_symbol.cik).replace('-', '')}/{str(row['accession_number']).replace('-', '')}/{row['primaryDocument']}",
        axis=1
    )

    # remove accession_number
    return df[['filing_date', 'primaryDocDescription', 'document_url']] # dataframe with columns 'filing_date', 'primaryDocDescription', 'document_url'

    
# main function used for testing / debugging only
def main(): 
    print("Single or multiple stocks? Type 's' for Single or 'm' for multiple.")
    answer = input().strip().lower()
    
    if answer == 's':
        print("Enter ticker symbol: ")
        ticker = input().strip().upper()
        stock_data = get_stock_details(ticker)
        stock_news = get_stock_news(ticker)
        stock_filings = get_stock_filings('PUT YOUR EMAIL HERE', ticker)
        print(stock_data) 
        print()
        print(stock_filings)
        print()
        
        # helps depict what get_stock_news() is doing
        for article in stock_news:
            print('TITLE: ', {article['title']}) 
            print('PUBLISHER: ', {article['publisher']})      
            print('URL: ', {article['url']})
            print('PUB DATE: ', {article['pubDate']})
    
    else:
        print("Enter ticker symbols: ")
        ticker_symbols = input().strip().upper()
        tickers = re.split(r'[,\s]+', ticker_symbols)  
        stock_data = get_watchlist_data(np.array(tickers))
        print(stock_data)
    
    
if __name__ == "__main__":
    main()
