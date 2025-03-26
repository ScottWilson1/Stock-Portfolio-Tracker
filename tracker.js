////////// tracker.js uses functions from helper.js

////////// Supabase Database, https://supabase.com/docs/reference/javascript/introduction
////////// project database URL and public access key to create client
const { createClient } = supabase;
const supabaseUrl = "https://ssgnftblyikjygsmiooy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZ25mdGJseWlranlnc21pb295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNjY3ODMsImV4cCI6MjA1NTk0Mjc4M30.gQBTPyOD_oP8BdRBdkO6Ye3vZzhpp2RTX9yYxaLXL_8";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

////////////////////  bool permission for functions to run  ////////////////////
let canRun = true;

async function loadWatchlist() {

	////////////////////  from helpers.js  ////////////////////
	if (!(usernameText = findUsername())) return;
	if (!(await verifyUser(usernameText))) return;

	////////////////////  get watchlist window object  ////////////////////
	const watchlist = document.getElementById('watchlist');
	if (!watchlist) {
		console.log('Watchlist object not found');
		return;
	}

	////////////////////  remove any holdover tickers (blank slate watchlist window)  ////////////////////
	while (watchlist.firstChild) {
		watchlist.removeChild(watchlist.firstChild);
	}

	////////////////////  get username's watchlist from database  ////////////////////
	const { data: watchlistData, error: watchlistError } = await supabaseClient
		.from('watchlists')
		.select('ticker')
		.eq('username', String(usernameText).trim());
	if (watchlistError) {
		console.log('User Watchlist Error Loading: ', watchlistError);
		return;
	}
	if (!watchlistData || watchlistData.length === 0) {
		console.log('User Watchlist Empty: ', watchlistData);
	}

	////////////////////  insert each ticker returned by database watchlist => into watchlist window  ////////////////////
	for (let i = 0; i < watchlistData.length; i++) {
		watchlist.insertAdjacentHTML('beforeend',
			'<div id="' + watchlistData[i].ticker + 'watchlist">' + watchlistData[i].ticker + '<br></div>');
	}

	////////////////////  update add/remove buttons to watchlist  ////////////////////
	add_remove_stock_button();

	////////////////////  reset timed blocker from add/remove function  //////////////////
	setTimeout(() => {
		canRun = true;
	}, 1000);
}

async function add_remove_stock_button() {

	////////////////////  from helpers.js  ////////////////////
	if (!(usernameText = findUsername())) return;
	if (!(await verifyUser(usernameText))) return;
	if (!(tickerText = findTicker())) return;

	////////////////////  get stock display window object  ////////////////////
	const stockDisplay = document.getElementById('stockDisplay');
	if (!stockDisplay){
		console.log('Stock Diplay Window object not found');
		return;
	}

	////////////////////  remove previous add/remove buttons (screws up => sometimes multiple buttons)  ////////////////////
	const duplicateButtons = document.querySelectorAll("#watchlistButton");
	duplicateButtons.forEach(button => {
		stockDisplay.removeChild(button);
	});

	////////////////////  check if displayed stock is in user's watchlist  ////////////////////
	const { data: watchlistData, error: watchlistError } = await supabaseClient
		.from('watchlists')
		.select()
		.eq('ticker', String(tickerText).trim())
		.eq('username', String(usernameText).trim());

	////////////////////  build watchlist button  ////////////////////
	const watchlistButton = document.createElement("button");
	watchlistButton.id = "watchlistButton"
	stockDisplay.appendChild(watchlistButton);

	////////////////////  assign as "remove" button  ////////////////////
	if (watchlistData && watchlistData.length > 0) {
		watchlistButton.innerHTML = "remove from Watchlist";
		watchlistButton.addEventListener('click', removeFromWatchlist);
	}

	////////////////////  assign as "add" button  ////////////////////
	if (watchlistError || !watchlistData || watchlistData.length === 0) {
		watchlistButton.innerHTML = "add to Watchlist";
		watchlistButton.addEventListener('click', addToWatchlist);
	}

	////////////////////  unfocus cursor from button (no accidental clicks) ////////////////////
	watchlistButton.blur();
	return;
}

async function addToWatchlist() {

	////////////////////  timed blocker to prevent double clicking mess (reset in loadWatchlist)  //////////////////
	if (!canRun) return;
	canRun = false;

	////////////////////  from helpers.js  ////////////////////
	if (!(usernameText = findUsername())) return;
	if (!(await verifyUser(usernameText))) return;
	if (!(companyNameText = findCompanyName())) return;
	if (!(tickerText = findTicker())) return;

	////////////////////  check if stock is in stock table  ////////////////////
	const { data: stockData, error: stockError } = await supabaseClient
		.from('stock')
		.select()
		.eq('ticker', String(tickerText).trim());
	if (stockData && stockData.length > 0) {
		console.log('Stock already in table: ', stockData);
	}

	////////////////////  if stock NOT in stock table, insert stock  ////////////////////
	if (stockError || !stockData || stockData.length === 0) {
		const { error: newStockInsertError } = await supabaseClient
			.from('stock')
			.insert({ ticker: String(tickerText).trim(), name: String(companyNameText).trim() });
		if (newStockInsertError) {
			console.log('New Stock Insert Error: ', newStockInsertError);
			return;
		}
		////////////////////  confirm stock insert  ////////////////////
		else {
			const { data: newStockData, error: newStockError } = await supabaseClient
				.from('stock')
				.select()
				.eq('ticker', String(tickerText).trim());
			if (newStockData && newStockData.length > 0) {
				console.log('Stock added to database: ', newStockData);
			}
			else if (newStockError || !newStockData || newStockData.length === 0) {
				console.log('Stock failed to insert to stock table: ', newStockError);
				return;
			}
		}
	}

	////////////////////  check if username/stock pair already in watchlist  ////////////////////
	const { data: watchlistData, error: watchlistError } = await supabaseClient
		.from('watchlists')
		.select()
		.eq('ticker', String(tickerText).trim())
		.eq('username', String(usernameText).trim());
	if (watchlistData && watchlistData.length > 0){
		console.log('Stock already in User Watchlist: ', watchlistData);
		return;
	}

	////////////////////  Insert Username & Stock to Watchlist junction table  ////////////////////
	if (watchlistError || !watchlistData || watchlistData.length === 0) {
		const { error: watchlistInsertError } = await supabaseClient
			.from('watchlists')
			.insert({ username: String(usernameText).trim(), ticker: String(tickerText).trim() });
		if (watchlistInsertError) {
			console.log('Watchlist insert failed: ', watchlistInsertError);
		}

		////////////////////  Check for insert success  ////////////////////
		else {
			const { data: newWatchlistData, error: newWatchlistError } = await supabaseClient
				.from('watchlists')
				.select()
				.eq('ticker', String(tickerText).trim())
				.eq('username', String(usernameText).trim());
			if (newWatchlistData && newWatchlistData.length > 0) {
				console.log('Stock added to Watchlist', newWatchlistData);
			}
			else if (newWatchlistError || !newWatchlistData || newWatchlistData.length === 0) {
				console.log('Stock not appearing in Watchlist after insert', newWatchlistData);
			}
		}
	}

	////////////////////  refresh watchlist window  //////////////////
	loadWatchlist();
}

async function removeFromWatchlist() {

	////////////////////  timed blocker to prevent double clicking mess (resets in loadWatchlist)  //////////////////
	if (!canRun) return;
	canRun = false;

	////////////////////  from helper.js  ////////////////////
	if (!(usernameText = findUsername())) return;
	if (!(await verifyUser(usernameText))) return;
	if (!(tickerText = findTicker())) return;

	////////////////////  check if username/stock pair actually in watchlist  ////////////////////
	const { data: watchlistData, error: watchlistError } = await supabaseClient
		.from('watchlists')
		.select()
		.eq('ticker', String(tickerText).trim())
		.eq('username', String(usernameText).trim());
	if (watchlistError || !watchlistData || watchlistData.length === 0) {
		console.log('Stock not found in User Watchlist: ', watchlistError);
		return;
	}

	////////////////////  delete username/stock pair from watchlist  ////////////////////
	if (watchlistData && watchlistData.length > 0) {
		const { error: watchlistDeleteError } = await supabaseClient
			.from('watchlists')
			.delete()
			.eq('ticker', String(tickerText).trim())
			.eq('username', String(usernameText).trim());
		if (watchlistDeleteError) {
			console.log('Watchlist deletion failed: ', watchlistDeleteError);
		}
		else {
			const { data: newWatchlistData, error: newWatchlistError } = await supabaseClient
				.from('watchlists')
				.select()
				.eq('ticker', String(tickerText).trim())
				.eq('username', String(usernameText).trim());
			if (newWatchlistError || !newWatchlistData || newWatchlistData.length === 0) {
				console.log('Stock has been removed from Watchlist', newWatchlistData);
			}
		}
	}

	////////////////////  refresh watchlist window  ////////////////////
	loadWatchlist();
}