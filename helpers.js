////////////////////  string extract => username from html  ////////////////////
function findUsername() {

	const username = document.getElementById('username');
	if (!username) {
		console.log('Username object not found');
		startTimer();
		/*
		setTimeout(() => {
			canRun = true;
		}, 1000);
		*/
		return false;
	}
	const usernameText = username.textContent;
	if (!usernameText || usernameText.length === 0) {
		console.log('Username text is empty');
		startTimer();
		/*
		setTimeout(() => {
			canRun = true;
		}, 1000);
		*/
		return false;
	}
	return usernameText;
}

////////////////////  string extract => ticker from display stock window  ////////////////////
function findTicker() {

	const companyTicker = document.getElementById('companyTicker');
	if (!companyTicker) {
		console.log('companyTicker object not found');
		startTimer();
		/*
		setTimeout(() => {
			canRun = true;
		}, 1000);
		*/
		return false;
	}
	const tickerText = companyTicker.textContent;
	if (!tickerText || tickerText.length === 0) {
		console.log('Ticker text is empty');
		startTimer();
		/*
		setTimeout(() => {
			canRun = true;
		}, 1000);
		*/
		return false;
	}
	return tickerText;
}

////////////////////  string extract => company name from display stock window  ////////////////////
function findCompanyName() {
	const companyName = document.getElementById('companyName');
	if (!companyName) {
		console.log('companyName object not found');
		startTimer();
		/*
		setTimeout(() => {
			canRun = true;
		}, 1000);
		*/
		return false;
	}
	const companyNameText = companyName.textContent;
	if (!companyNameText || companyNameText.length === 0) {
		console.log('Company Name text is empty');
		startTimer();
		/*
		setTimeout(() => {
			canRun = true;
		}, 1000);
		*/
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

	////////////////////  reset timed blocker from add/remove function  //////////////////
	startTimer();
	/*
	setTimeout(() => {
		canRun = true;
	}, 1000);
	*/

	return false;
}

function startTimer() {
	setTimeout(() => {
		canRun = true;
	}, 1000);
}