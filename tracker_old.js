// Supabase Database, https://supabase.com/docs/reference/javascript/introduction
// project database URL and public access key to create client
const { createClient } = supabase;
const supabaseUrl = "https://ssgnftblyikjygsmiooy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZ25mdGJseWlranlnc21pb295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNjY3ODMsImV4cCI6MjA1NTk0Mjc4M30.gQBTPyOD_oP8BdRBdkO6Ye3vZzhpp2RTX9yYxaLXL_8";
const supabaseClient = createClient(supabaseUrl, supabaseKey);


async function loadWatchlist() {

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

////////////////////  get username from html page to string  ////////////////////

	usernameText = findUsername();

/*
	const username = document.getElementById('username');
	if (!username) {
		console.log('Username object not found');
		return;
	}
	const usernameText = username.textContent;
	if (!usernameText || usernameText.length === 0) {
		console.log('Username text is empty');
		return;
	}
	console.log('username text: ', usernameText);
*/
	////////////////////  get username's watchlist from database  ////////////////////

	const { data: watchlistData, error: watchlistError } = await supabaseClient
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

////////////////////  insert each ticker returned by database watchlist => into watchlist window  ////////////////////

	for (let i = 0; i < watchlistData.length; i++) {
		watchlist.insertAdjacentHTML('beforeend',
			'<div id="' + watchlistData[i].ticker + 'watchlist">' + watchlistData[i].ticker + '<br></div>');
	}

////////////////////  update add/remove buttons to watchlist  ////////////////////

	add_remove_stock_button();
}


async function add_remove_stock_button() {

//////////  get stock display window object  //////////
	const stockDisplay = document.getElementById('stockDisplay');
	if (!stockDisplay){
		console.log('Stock Diplay Window object not found');
		return;
	}

//////////  remove previous add/remove buttons  //////////
	const prevAddButton = document.getElementById("addToWatchlist");
	const prevRemoveButton = document.getElementById("removeFromWatchlist");
	if (prevAddButton) {
		stockDisplay.removeChild(prevAddButton);
	}
	if (prevRemoveButton) {
		stockDisplay.removeChild(prevRemoveButton);
	}

	//////////  ticker from display stock window  //////////

	tickerText = findTicker();

/*
	const companyTicker = document.getElementById('companyTicker');
	if (!companyTicker){
		console.log('companyTicker object not found');
		return;
	}
	const tickerText = companyTicker.textContent;
	if (!tickerText || tickerText.length === 0) {
		console.log('Ticker text is empty');
		return;
	}
*/

	//////////  username from display userbar window  //////////

	username = findUsername();

	/*
	const username = document.getElementById('username');
	if (!username){
		console.log('Username object not found');
		return;
	}
	const usernameText = username.textContent;
	if (!usernameText || usernameText.length === 0) {
		console.log('Username text is empty');
		return;
	}
	*/
	
//////////  check if displayed stock is in user's watchlist  //////////
	const { data: watchlistData, error: watchlistError } = await supabaseClient
		.from('watchlists')
		.select()
		.eq('ticker', String(tickerText).trim())
		.eq('username', String(usernameText).trim());

//////////  if stock IN watchlist, present "remove" button  //////////
	if (watchlistData && watchlistData.length > 0){
		console.log('Stock In User Watchlist: ', watchlistData);
		const removeButton = document.createElement("button");
		removeButton.id = "removeFromWatchlist";
		removeButton.innerHTML = "remove from Watchlist";
		stockDisplay.appendChild(removeButton);
		removeButton.addEventListener('click', removeFromWatchlist);
		removeButton.blur();
		return;
	}

//////////  if stock NOT IN watchlist, present "add" button  //////////
	if (watchlistError || !watchlistData || watchlistData.length === 0){
		console.log('Stock NOT in User Watchlist');
		const addButton = document.createElement("button");
		addButton.id = "addToWatchlist";
		addButton.innerHTML = "add to Watchlist";
		stockDisplay.appendChild(addButton);
		addButton.addEventListener('click', addToWatchlist);
		addButton.blur();
		return;
	}
}

async function addToWatchlist() {

	companyNameText = findCompanyName();

	/*
	const companyName = document.getElementById('companyName');		//accesses the company name object
	if (!companyName){
		console.log('companyName object not found');
		return;
	}
	const companyNameText = companyName.textContent;			//extracts company name as string
	if (!companyNameText || companyNameText.length === 0) {
		console.log('Company Name text is empty'); 
		return;
	}
	console.log('company name text: ', companyNameText);
	*/

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	username = findUsername();

	/*
	const username = document.getElementById('username');			//accesses username object
	if (!username){
		console.log('Username object not found');
		return;
	}
	const usernameText = username.textContent;				//extracts username as string
	if (!usernameText || usernameText.length === 0) {
		console.log('Username text is empty');
		return;
	}
	console.log('username text: ', usernameText);
	*/

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	tickerText = findTicker();

	/*
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
	*/

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const { data: userData, error: userError } = await supabaseClient	//check if username is valid
		.from('user_information')
		.select()
		.eq('username', String(usernameText).trim());			//for some reason, _Text variables need explicit casting, String()
	if (userError || !userData || userData.length === 0){
		console.log('username database error: ', userError);
		return;
	}
	console.log('username verified: ', userData);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const { data: stockData, error: stockError } = await supabaseClient	//check if stock is valid
		.from('stock')
		.select()
		.eq('ticker', String(tickerText).trim());
	if (stockError || !stockData || stockData.length === 0) {		//if stock NOT valid, insert stock
		const { error: newStockInsertError } = await supabaseClient
			.from('stock')
			.insert({ ticker: String(tickerText).trim(), name: String(companyNameText).trim() });
		if (newStockInsertError) {
			console.log('New Stock Insert Error: ', newStockInsertError);
			return;
		}
		else {
			const { data: newStockData, error: newStockError } = await supabaseClient	//check if stock is now valid
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
	else if (stockData) {
		console.log('Stock already in table: ', stockData);
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const { data: watchlistData, error: watchlistError } = await supabaseClient	//check if username/stock pair already in watchlist
		.from('watchlists')
		.select()
		.eq('ticker', String(tickerText).trim())
		.eq('username', String(usernameText).trim());
	if (watchlistData && watchlistData.length > 0){
		console.log('Stock already in User Watchlist: ', watchlistData);
		return;
	}
	const { error: watchlistInsertError } = await supabaseClient			//Insert Username & Stock to Watchlist junction table
		.from('watchlists')
		.insert({ username: String(usernameText).trim(), ticker: String(tickerText).trim() });
	if (watchlistInsertError){
		console.log('Watchlist insert failed: ', watchlistInsertError);
	}
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
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	loadWatchlist();							//refresh watchlist window
}


async function removeFromWatchlist() {

////////////////////  get the company name object to string  ////////////////////

	companyNameText = findCompanyName();

/*
	const companyName = document.getElementById('companyName');
	if (!companyName){
		console.log('companyName object not found');
		return;
	}
	const companyNameText = companyName.textContent;
	if (!companyNameText || companyNameText.length === 0) {
		console.log('Company Name text is empty'); 
		return;
	}
	console.log('company name text: ', companyNameText);
*/

////////////////////  get user name object to string  ////////////////////

	usernameText = findUsername();

/*
	const username = document.getElementById('username');
	if (!username){
		console.log('Username object not found');
		return;
	}
	const usernameText = username.textContent;
	if (!usernameText || usernameText.length === 0) {
		console.log('Username text is empty');
		return;
	}
	console.log('username text: ', usernameText);
*/

////////////////////  get the ticker name object to string  ////////////////////

	tickerText = findTicker();
	
	/*
	const companyTicker = document.getElementById('companyTicker');
	if (!companyTicker){
		console.log('companyTicker object not found');
		return;
	}
	const tickerText = companyTicker.textContent;
	if (!tickerText || tickerText.length === 0) {
		console.log('Ticker text is empty');
		return;
	}
	console.log('ticker text: ', tickerText);
	*/

////////////////////  check if username is valid row in database ////////////////////

	const { data: userData, error: userError } = await supabaseClient
		.from('user_information')
		.select()
		.eq('username', String(usernameText).trim());			// for some reason, _Text variables need explicit casting, String()
	if (userError || !userData || userData.length === 0){
		console.log('username database error: ', userError);
		return;
	}
	console.log('username verified: ', userData);

////////////////////  check if stock is valid row in database  ////////////////////

	const { data: stockData, error: stockError } = await supabaseClient
		.from('stock')
		.select()
		.eq('ticker', String(tickerText).trim());
	if (stockError || !stockData || stockData.length === 0){		// if stock NOT valid, insert stock (will still remove from Watchlist)
		const { error : newStockInsertError } = await supabaseClient
			.from('stock')
			.insert({ ticker: String(tickerText).trim(), name: String(companyNameText).trim() });
		if (newStockInsertError){
			console.log('New Stock Insert Error: ', newStockInsertError);
			return;
		}
	}

////////////////////  check if username/stock pair actually in watchlist  ////////////////////

	const { data: watchlistData, error: watchlistError } = await supabaseClient
		.from('watchlists')
		.select()
		.eq('ticker', String(tickerText).trim())
		.eq('username', String(usernameText).trim());
	if (watchlistError || !watchlistData || watchlistData.length === 0){
		console.log('Stock not found in User Watchlist: ', watchlistError);
		return;
	}

////////////////////  delete username/stock pair from watchlist  ////////////////////

	if (watchlistData && watchlistData.length > 0) {
		console.log('Stock confirmed in User Watchlist: ', watchlistData);
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

///////////////////////////////////////////////		listeners for add/remove		/////////////////////////////////////////////////
const addButton = document.getElementById('addToWatchlist');
if (addButton){
	addButton.addEventListener('click', addToWatchlist);
}
const removeButton = document.getElementById('removeFromWatchlist');
if (removeButton){
	removeButton.addEventListener('click', removeFromWatchlist);
}

*/