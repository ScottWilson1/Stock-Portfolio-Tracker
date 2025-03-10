// Supabase Database, https://supabase.com/docs/reference/javascript/introduction
// project database URL and public access key to create client
const { createClient } = supabase;
const supabaseUrl = "https://ssgnftblyikjygsmiooy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZ25mdGJseWlranlnc21pb295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNjY3ODMsImV4cCI6MjA1NTk0Mjc4M30.gQBTPyOD_oP8BdRBdkO6Ye3vZzhpp2RTX9yYxaLXL_8";
const supabaseClient = createClient(supabaseUrl, supabaseKey);


async function loadWatchlist() {

	const watchlist = document.getElementById('watchlist');			//accessing the watchlist html window 
	if (!watchlist) {
		console.log('Watchlist object not found');
		return;
	}

	watchlist.innerHTML = '';										//remove any holdover tickers (blank slate)

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const username = document.getElementById('username');			//accesses username object
	if (!username) {
		console.log('Username object not found');
		return;
	}
	const usernameText = username.textContent;						//extracts username as string
	if (!usernameText || usernameText.length === 0) {
		console.log('Username text is empty');
		return;
	}
	console.log('username text: ', usernameText);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const { data: watchlistData, error: watchlistError } = await supabaseClient			//get username watchlist from database
		.from('watchlists')
		.select('ticker')
		.eq('username', String(usernameText).trim());
	if (watchlistError) {
		console.log('User Watchlist Error Loading: ', watchlistError);
	}
	if (!watchlistData || watchlistData.length === 0) {
		console.log('User Watchlist Empty: ', watchlistData);
		return;
	}
	console.log('user watchlist loaded: ', watchlistData);

	/////////////////////////////////////////////////////inserting ticker into watchlist//////////////////////////////////////////////////
	for (let i = 0; i < watchlistData.length; i++) {
		watchlist.insertAdjacentHTML('beforeend', '<div id="' + watchlistData[i].ticker + 'watchlist">' + watchlistData[i].ticker + '<br></div>');
	}
}

async function addToWatchlist() {

	const companyName = document.getElementById('companyName');		//accesses the company name object
	if (!companyName){
		console.log('companyName object not found');
		return;
	}
	const companyNameText = companyName.textContent;				//extracts company name as string
	if (!companyNameText || companyNameText.length === 0) {
		console.log('Company Name text is empty'); 
		return;
	}
	console.log('company name text: ', companyNameText);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const username = document.getElementById('username');		//accesses username object
	if (!username){
		console.log('Username object not found');
		return;
	}
	const usernameText = username.textContent;					//extracts username as string
	if (!usernameText || usernameText.length === 0) {
		console.log('Username text is empty');
		return;
	}
	console.log('username text: ', usernameText);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const companyTicker = document.getElementById('companyTicker');		//accesses ticker object
	if (!companyTicker){
		console.log('companyTicker object not found');
		return;
	}

	const tickerText = companyTicker.textContent;				//extracts ticker symbol as string
	if (!tickerText || tickerText.length === 0) {
		console.log('Ticker text is empty');
		return;
	}
	console.log('ticker text: ', tickerText);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const { data: userData, error: userError } = await supabaseClient			//check if username is valid
		.from('user_information')
		.select()
		.eq('username', String(usernameText).trim());							//for some reason, _Text variables need explicit casting, String()
	if (userError || !userData || userData.length === 0){
		console.log('username database error: ', userError);
		return;
	}
	console.log('username verified: ', userData);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const { data: stockData, error: stockError } = await supabaseClient			//check if stock is valid
		.from('stock')
		.select()
		.eq('ticker', String(tickerText).trim());
	if (stockError || !stockData || stockData.length === 0){					//if stock is NOT valid, insert stock
		const { error : newStockInsertError } = await supabaseClient
			.from('stock')
			.insert({ ticker: String(tickerText).trim(), name: String(companyNameText).trim() });
		if (newStockInsertError){
			console.log('New Stock Insert Error: ', newStockInsertError);
			return;
		}
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const { data: watchlistData, error: watchlistError } = await supabaseClient			//check if username/stock pair already in watchlist
		.from('watchlists')
		.select()
		.eq('ticker', String(tickerText).trim())
		.eq('username', String(usernameText).trim());
	if (watchlistData && watchlistData.length > 0){
		console.log('Stock already in User Watchlist: ', watchlistData);
		return;
	}
	const { error : watchlistInsertError } = await supabaseClient				//Insert Username & Stock to Watchlist junction table
		.from('watchlists')
		.insert({ username: String(usernameText).trim(), ticker: String(tickerText).trim() });
		if (watchlistInsertError){
			console.log('Watchlist insert failed: ', watchlistInsertError);
		}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	loadWatchlist();							//refresh watchlist window

}

//connect addToWatchlist to addToWatchlist button on HTML side
document.getElementById('addToWatchlist').addEventListener('click', addToWatchlist);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
SCRAP CODE
///////////////////////////////////////////////		print out table data to console log		/////////////////////////////////////////////////
const { data: tableData, error: tableError } = await supabaseClient
	.from('user_information')
	.select();
console.log('UserInfo Table Data: ', tableData);

///////////////////////////////////////////////		original watchlist insert		/////////////////////////////////////////////////
watchlist.insertAdjacentHTML('beforeend', '<div id="' + tickerText + 'watchlist">' + tickerText + '<br></div>');	//inserting ticker into watchlist
*/