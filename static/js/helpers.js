////////////////////  extract username as string from homepage  ////////////////////
function findUsername() {
	const username = document.getElementById('username');
	if (!username) {
		console.log('Username object not found');
		startTimer();
		return false;
	}
	const usernameText = username.textContent;
	if (!usernameText || usernameText.length === 0) {
		console.log('Username text is empty');
		startTimer();
		return false;
	}
	return usernameText;
}

////////////////////  extract ticker as string from display stock window  ////////////////////
function findTicker() {
	const companyTicker = document.getElementById('companyTicker');
	if (!companyTicker) {
		console.log('companyTicker object not found');
		startTimer();
		return false;
	}
	const tickerText = companyTicker.textContent;
	if (!tickerText || tickerText.length === 0) {
		console.log('Ticker text is empty');
		startTimer();
		return false;
	}
	return tickerText;
}

////////////////////  extract company name as string from display stock window  ////////////////////
function findCompanyName() {
	const companyName = document.getElementById('companyName');
	if (!companyName) {
		console.log('companyName object not found');
		startTimer();
		return false;
	}
	const companyNameText = companyName.textContent;
	if (!companyNameText || companyNameText.length === 0) {
		console.log('Company Name text is empty');
		startTimer();
		return false;
	}
	return companyNameText;
}

////////////////////  verify username text with user_info table ////////////////////
async function verifyUser(username) {
	const { data: userData, error: userError } = await supabaseClient
		.from('user_information')
		.select()
		.eq('username', String(username).trim());
	if (userData && userData.length > 0) {
		return true;
	}
	console.log('invalid username: ' + String(username).trim());
	startTimer();
	return false;
}

function searchBarValue() {
	////////////////////  grab ticker object from search bar  ////////////////////
	const searchText = document.getElementById('searchText');
	console.log("Grabbed the searchText: ", searchText.value);
	return searchText;
}

function watchListButtonValue(event) {
	////////////////////  grab ticker object from clicked watchlist button  ////////////////////
	const clickedButton = event.currentTarget;
	return clickedButton;
}

////////////////////  reset timed blocker for add/remove function  //////////////////
function startTimer() {
	setTimeout(() => {
		canRun = true;
	}, 1000);			//set for 1 second... i think...
}

////////////////////  test time performance of function  //////////////////
async function timeFunction(fn, label) {
	const start = performance.now();
	const result = await fn();
	const end = performance.now();
	const timeTaken = end - start;

	const functionName = label || fn.name || 'anonymous function';
	console.log(`${functionName} took ${timeTaken.toFixed(3)} ms`);
	return result;
}