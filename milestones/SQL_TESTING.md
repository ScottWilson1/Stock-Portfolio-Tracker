> **Project:** Stock Portfolio Tracker<br>
> **Group:** CTRL, ALT, Elite<br>
___

![Schema of stock tracker, showing table relationships](stock-tracker-schema.png "Stock Tracker Schema")
___
> #### **Table Name:** user_information
> **Table Description:** This table will store individual users' information as rows. This information will be used to log in to their account and record which stocks each user is watching.<br>
> **Column Information**
> * **username** - primary key (unique & not null) &nbsp;&nbsp; | &nbsp;&nbsp; _text_ datatype
> * **password** - not null &nbsp;&nbsp; | &nbsp;&nbsp; _text_ datatype
>
> **Table Test**<br>
>> **UseCase Name:** Select Query.
>> * **Description:** Select Query from _user_information_ table to return all rows.
>> * **Pre-Conditions:** The _user_information_ table is populated with rows of _username_ and _password_ data..
>>* **Test Steps:**
>>    1. Access Supabase SQL Editor for project.
>>    2. Run SELECT * FROM "user_information";
>> * **Expected Result:** The results field should be populated with a table containing all rows from _user_information_ in _username_ and _password_ columns.
>> * **Actual Result:** The test successfully produces the expected results. The results field is populated with a table containing all formatted rows from _user_information_
>> * **Status:** Passed
>> * **Post-Conditions:** This does not alter the database in any way.
>
> **Access Method:** _"Login"_ function<br>
> **Description:** This method queries the _user_information_ table using text from the _username_ and _password_ fields of the login page.<br>
> **Access Page:** Login page<br>
> **Parameters:** _username_ &nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _password_ &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
> **Return Values:** Array(2) datatype, containing row from _user_information_ table with the _username_ and _password_ column.<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**or**<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array(0) datatype, containing empty row from _user_information_ table
>
> **Access Method Tests**<br>
>> **UseCase Name:** Attempt login with **valid** _username_ and _password_.
>> * **Description:** Confirm valid _username_ and _password_ exist in _user_information_ table via the login function.
>> * **Pre-Conditions:** The _user_information_ table contains a row with the applicable _username_ and _password_.
>> * **Test Steps:**
>>    1. Access the login page.
>>    2. Open console log via F12.
>>    3. Type in a valid _username_ and _password_ into the text boxes.
>>    4. Click the _"Login"_ button.
>> * **Expected Result:** The browser should be redirected to the user's homepage with the submitted _username_ visible on the login page.<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The message "Login successful" should be printed to the console.
>> * **Actual Result:** The test successfully produces the expected results. When valid username and password are provided and compared against the records in _user_information_, the user will be advanced to their homepage.
>> * **Status:** Unit testing passing, integration testing in progress
>> * **Post-Conditions:** If the user has successfully logged in, they should now be able to access their homepage.  With their _username_ verified to exist within the _user_information_ table, they should now be able to add stocks to and remove stocks from their watchlist.<br>
>
>> **UseCase Name:** Attempt login with **invalid** _username_ or _password_.
>> * **Description:** Confirm invalid _username_ and _password_ results in empty return value from _user_information_ table via the login function.
>> * **Pre-Conditions:** The _user_information_ table does not contain a row with the applicable _username_ and _password_.
>> * **Test Steps:**
>>    1. Access the login page.
>>    2. Open console log via F12.
>>    3. Type in a invalid _username_ and _password_ into the text boxes.
>>    4. Click the _"Login"_ button.
>> * **Expected Result:** The browser should be return to the login page with empty _username_ and _password_ fields.<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The message "Invalid username and/or password" should be printed to the console.
>> * **Actual Result:** The test successfully produces the expected result. When incorrect username OR password are provided, the user is returned to the login page and asked to login again.
>> * **Status:** Test passing. 
>> * **Post-Conditions:** When the login method rejects the invalid _username_ and _password_, the browser should return to the login page with empty _username_ and _password_ text fields.
___
> #### **Table Name:** stock
> **Table Description:** This table will store individual stock information in rows.  As various users may follow the same stock, the information about each stock can be recorded once and then accessed by each individual user.<br>
> **Column Information**
> * **ticker** - primary key (unique & not _null_) &nbsp;&nbsp; | &nbsp;&nbsp; _text_ datatype.
> * **name** - non _null_ &nbsp;&nbsp; | &nbsp;&nbsp; _text_ datatype. &nbsp;&nbsp; | &nbsp;&nbsp; *It is not required to be unique as a single company might have issued more than one stock (e.g. Berkshire Hathaway)
>
> **Table Test**<br>
>> **UseCase Name:** Select Query.
>> * **Description:** Select Query from _stock_ table to return all rows.
>> * **Pre-Conditions:** The _stock_ table is populated with rows of _ticker_ and _name_ data..
>>* **Test Steps:**
>>    1. Access Supabase SQL Editor for project.
>>    2. Run SELECT * FROM "stock";
>> * **Expected Result:** The results field should be populated with a table containing all rows from _stock_ in _ticker_ and _name_ columns.
>> * **Actual Result:** The test successfully produces the expected results. The results field is populated with a table containing all formatted rows from _stock_.
>> * **Status:** Passed
>> * **Post-Conditions:** This does not alter the database in any way.
>
> **Access Method:** _"addToWatchlist"_ function<br>
> **Description:** During the _"addToWatchlist"_ function, the method queries the _stock_ table to determine whether it contains the applicable _"ticker"_ and _"companyName"_ from the homepage's stock display.<br>
> **Access Page:** Homepage<br>
> **Parameters:** _ticker_ &nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _name_ &nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
> **Return Values:** Array(2) datatype, containing row from _stock_ table with the _ticker_ and _name_ column.<br>
>
> **Access Method Tests**<br>
>> **UseCase Name:** _"addToWatchlist"_ function with **existing** _ticker_ and _name_.
>> * **Description:** This test uses the _companyTicker_ and _companyName_ objects from the stock display window, to attempt to add stocks via the _"addToWatchlist"_ function that **already** exist in the _stock_ table.
>> * **Pre-Conditions:** Text for a stock _ticker_ and _name_ must exist in the homepage objects _"companyTicker"_ and _"companyName"_.  The same value of _ticker_ and _name_ must be present in the _stock_ table.<br>Although not explicitly necessary for querying the stock table, an valid _username_ must exist in the _"username"_ object for the _"addtoWatchlist"_ function to work.
>> * **Test Steps:**
>>    1. Access the homepage, while logged in as a user, ensuring the _username_ appears on the homepage or in the HTML source code under the _"username"_ object.
>>    2. Open the console log via F12.
>>    3. If testing through the GUI, select a stock from the search bar, ensuring a company _ticker_ and _name_ appear on the homepage. <br> If testing through HTML source code, manually type in a _ticker_ and _name_ so the the _"companyTicker"_ and _"companyName"_ objects contain text.
>>    4. Select the _"add to Watchlist"_ button located on the homepage.
>> * **Expected Results:** If the stock's _ticker_ and _name_ are already in the table, it should print to the console "Stock already in table", and print the existing row in the table.
>> * **Actual Results:** The test succesfully produces the expected results. When the stock's _ticker_ and _name_ are already in the _stock_ table, the message to console is "Stock already in table", along with the existing row.
>> * **Status:** Passed
>> * **Post-Conditions:** With the stock _ticker_ and _name_ confirmed to already be in the stock table, the stock _ticker_ should then be added to the user's watchlist, appearing both in the _"watchlist"_ object on the homepage and in the _watchlist_ table in the database alongside the appropriate _username_.<br>
>
>> **UseCase Name:** _"addToWatchlist"_ function with **new** _ticker_ and _name_.
>> * **Description:** This test uses the _companyTicker_ and _companyName_ objects from the stock display window, to attempt to add stocks via the _"addToWatchlist"_ function that **do not** exist in the _stock_ table.
>> * **Pre-Conditions:** Text for a stock _ticker_ and _name_ must exist in the homepage objects _"companyTicker"_ and _"companyName"_.  The value of _ticker_ and _name_ must **not** exist in the _stock_ table.<br>Although not explicitly necessary for querying the stock table, an valid _username_ must exist in the _"username"_ object for the _"addtoWatchlist"_ function to work.
>> * **Test Steps:**
>>    1. Access the homepage, while logged in as a user, ensuring the _username_ appears on the homepage or in the HTML source code under the _"username"_ object.
>>    2. Open the console log via F12.
>>    3. If testing through the GUI, select a stock from the search bar, ensuring a company _ticker_ and _name_ appear on the homepage. <br> If testing through HTML source code, manually type in a _ticker_ and _name_ so the the _"companyTicker"_ and _"companyName"_ objects contain text.
>>    4. Select the _"add to Watchlist"_ button located on the homepage.
>> * **Expected Results:** If the stock's _ticker_ and _name_ are not already in the _stock_ table, it should add the stock _ticker_ and _name_ to the table and return a message to console "Stock added to database", followed by the newly added row.<br>
>> * **Actual Results:** The test succesfully produces the expected results. When the stock _ticker_ and _name_ are not in the database, the data is added as a new row to the _stock_ table and the message "Stock added to the database" is printed to console along with the new row.
>> * **Status:** Passed
>> * **Post-Conditions:** With the stock _ticker_ and _name_ added to the stock table, the stock _ticker_ should then be added to the user's watchlist, appearing both in the _"watchlist"_ object on the homepage and in the _watchlist_ table in the database alongside the appropriate _username_.
>
>> **UseCase Name:** _"addToWatchlist"_ function with **missing** _ticker_ input.
>> * **Description:** This test attempts to use the _"addToWatchlist"_ function to access the _stock_ table, without text from the _companyTicker_ object.
>> * **Pre-Conditions:** The homepage object _"companyTicker"_ must be empty while the object _"companyName"_ contains text.<br> A valid _username_ must exist in the homepage's _"username"_ object for the _"addtoWatchlist"_ function to work. Testing this function while missing a _username_ is discussed in the _watchlists_ section.
>> * **Test Steps:**
>>    1. Access the homepage, while logged in as a user, ensuring the _username_ appears on the homepage or in the HTML source code under the _"username"_ object.
>>    2. Open the console log via F12.
>>    3. Accessing HTML source code directly, delete the text for the _companyTicker_ object, while keeping the _companyName_ object text.
>>    4. Select the _"add to Watchlist"_ button located on the homepage.
>> * **Expected Results:** A message should be returned to the console "Ticker text is empty".
>> * **Actual Results:** The test succesfully produces the expected results. When the _companyTicker_ object is blank, the message "Ticker text is empty" is printed to the console.
>> * **Status:** Passed
>> * **Post-Conditions:** Besides the message printed to the console, no change should occur on the user's homepage or in the database.<br>
>
>> **UseCase Name:** Attempting _"addToWatchlist"_ function with **missing** _name_ input.
>> * **Description:** This test attempts to use the _"addToWatchlist"_ function to access the _stock_ table, without text from the _companyName_ object.
>> * **Pre-Conditions:** The homepage object _"companyName"_ must be empty. This particular test requires neither the _username_ nor the _ticker_.
>> * **Test Steps:**
>>    1. Access the homepage.
>>    2. Open the console log via F12.
>>    3. Accessing HTML source code directly, delete the text for the _companyName_ object.
>>    4. Select the _"add to Watchlist"_ button located on the homepage.
>> * **Expected Results:** A message should be returned to the console "Company Name text is empty".
>> * **Actual Results:** The test succesfully produces the expected results. When the _companyTicker_ object is blank, the message "Company Name text is empty" is printed to the console.
>> * **Status:** Passed
>> * **Post-Conditions:** Besides the message printed to the console, no change should occur on the user's homepage or in the database.
___
> #### **Table Name:** watchlists
> **Table Description:** This is a conjunction table, pairing two foreign keys (username and ticker) as a compound primary key.  Each row of this table identifies a user and a stock that the user is following.  As the conjunction of the each pair form a unique key, each user will only have a stock they have added appear once in their watchlist.<br>
> **Column Information**
> * **username** - foreign key (primary key from _user_information_)
> * **ticker** - foreign key (primary key from _stock_ 
>     * **composite key** - username & ticker
>
> **Table Test**<br>
>> **UseCase Name:** Select Query.
>> * **Description:** Select Query from _watchlists_ table to return all rows.
>> * **Pre-Conditions:** The _watchlists_ table is populated with rows of _username_ and _ticker_ data..
>>* **Test Steps:**
>>    1. Access Supabase SQL Editor for project.
>>    2. Run SELECT * FROM "watchlists";
>> * **Expected Result:** The results field should be populated with a table containing all rows from _watchlists_ in _username_ and _ticker_ columns.
>> * **Actual Result:** The test successfully produces the expected results. The results field is populated with a table containing all formatted rows from _watchlists_
>> * **Status:** Passed
>> * **Post-Conditions:** This does not alter the database in any way.
>
> **Access Method:** _addToWatchlist_ function<br>
> **Description:** This method queries the _watchlists_ table using text from the _username_ object and _ticker_ object of the homepage, adding these objects as a new row to the table.<br>
> **Access Page:** Homepage<br>
> **Parameters:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _ticker_ &nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _username_ &nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
> **Return Values:** Array(2) datatype, containing a row from the _watchlists_ table's _username_ and _ticker_ columns.<br>
>
> **Access Method Tests**<br>
>> **UseCase Name:** _"addToWatchlist"_ function with valid _username_ and _ticker_.
>> * **Description:** The _"addToWatchlist"_ function attempts to insert a new row into the _watchlists_ table's correpsonding to a valid _"username"_ object and a _"companyTicker"_ object on the homepage.
>> * **Pre-Conditions:** Text for a ticker and a valid username must exist in the "_companyTicker_" and _"username"_ objects of the homepage.<br> Although not necessary for querying the _watchlist_ table, a _name_ must exist in the homepage object _"companyName"_ for the _"addToWatchlist"_ function to work.
>> * **Test Steps:**
>>    1. Access the homepage, while logged in as a user, ensuring the _username_ appears on the homepage or in the HTML source code under the _"username"_ object.
>>    2. Open the console log via F12.
>>    3. If testing through the GUI, select a stock from the search bar, ensuring a company _ticker_ and _name_ appear on the homepage. <br> If testing through HTML source code, manually type in a _ticker_ and _name_ so the the _"companyTicker"_ and _"companyName"_ objects contain text.
>>    4. Select the _"add to Watchlist"_ button located on the homepage.
>> * **Expected Results:** The _"addToWatchlist"_ function should print to console "Stock added to Watchlist", followed by the newly added row of data.
>> * **Actual Results:** The test successfully produces the expected results. When the _"addToWatchlist"_ function is used, "Stock added to Watchlist" is printed to the console along with the row of data.
>> * **Status:** Passed
>> * **Post-Conditions:** With the stock added to the watchlist, the stock _ticker_ is visible on the user's _watchlist_ object on the homepage, as well as the _username_ and _ticker_ compound key added to the _watchlist_ junction table in the database.
>
>> **UseCase Name:** _"addToWatchlist"_ function with **missing** _username_.
>> * **Description:**  This test attempts to use the _"addToWatchlist"_ function to access the _watchlists_ table without text from the _username_ object.
>> * **Pre-Conditions:** The text field for the _username_ object must be empty on the homepage, while the _"companyName"_ object contains text. The _"companyTicker"_ is irrelevant to this test.
>> * **Test Steps:**
>>    1. Access the homepage.
>>    2. Open the console log via F12.
>>    3. Via the HTML source code, ensure the text portion of the _"username"_ object is empty.
>>    4. Select the _"add to Watchlist"_ button located on the homepage.
>> * **Expected Results:** The _"addToWatchlist"_ function should print to console "Username text is empty".
>> * **Actual Results:** The test successfully produces the expected results. When the _"addToWatchlist"_ function is used, "Username text is empty" is printed to the console.
>> * **Status:** Passed
>> * **Post-Conditions:** Besides the message printed to the console, no change should occur on the user's homepage or in the database.
>
>> **UseCase Name:** _"addToWatchlist"_ function with **invalid** _username_.
>> * **Description:**  This test attempts to use the _"addToWatchlist"_ function to access the _watchlists_ table with an invalid _username_.
>> * **Pre-Conditions:** The text field for the _username_ object must contain text not in the _user_information_, _username_ column.
>> * **Test Steps:**
>>    1. Access the homepage.
>>    2. Open the console log via F12.
>>    3. Via the HTML source code, ensure the text portion of the _"username"_ object contains an invalid username.
>>    4. Select the _"add to Watchlist"_ button located on the homepage.
>> * **Expected Results:** The _"addToWatchlist"_ function should print to console "invalid username:" followed by the invalid username.
>> * **Actual Results:** The test successfully produces the expected results. When the _"addToWatchlist"_ function is used, "invalid username:" followed by the invalid username is printed to the console.
>> * **Status:** Passed
>> * **Post-Conditions:** Besides the message printed to the console, no change should occur on the user's homepage or in the database.
>___
> **Access Method:** _removeFromWatchlist_ function<br>
> **Description:** This method queries the _watchlists_ table using text from the _username_ and _ticker_ objects of the homepage, removing data from the corresponding row in the table.<br>
> **Access Page:** Homepage<br>
> **Parameters:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _ticker_ &nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _username_ &nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
> **Return Values:** Array(0) datatype, containing an empty row from _user_information_ table<br>
>
> **Access Method Tests**<br>
>> **UseCase Name:** _"removeFromWatchlist"_ function with valid _username_ and _ticker_.
>> * **Description:** The _"removeFromWatchlist"_ function attempts to remove an existing row from the _watchlists_ table, corresponding to a valid _username_ object and a _companyTicker_ object on the homepage.
>> * **Pre-Conditions:** Text for a ticker and a valid username must exist in the "_companyTicker_" and _"username"_ objects of the homepage.<br> Although not necessary for querying the _watchlist_ table, a _name_ must exist in the homepage object _"companyName"_ for the _"removeFromWatchlist"_ function to work.
>> * **Test Steps:**
>>    1. Access the homepage, while logged in as a user, ensuring the _username_ appears on the homepage or in the HTML source code under the _"username"_ object.
>>    2. Open the console log via F12.
>>    3. If testing through the GUI, select a stock from the search bar, ensuring a company _ticker_ and _name_ appear on the homepage. <br> If testing through HTML source code, manually type in a _ticker_ and _name_ so the the _"companyTicker"_ and _"companyName"_ objects contain text.
>>    4. Select the _"remove from Watchlist"_ button located on the homepage.
>> * **Expected Results:** The _"removeFromWatchlist"_ function should print to console "Stock has been removed from Watchlist", followed by _Array(0)_.
.> * **Actual Results:** The test successfully produces the expected results. When the _"remove from Watchlist"_ button is used, "Stock has been removed from Watchlist" is printed to the console, along with _Array(0)_.
>> * **Status:** Passed
>> * **Post-Conditions:** When the stock is removed from the watchlist, the stock _ticker_ is no longer visible on the user's _watchlist_ object on the homepage, and the _username_ and _ticker_ compound key is removed from the _watchlist_ junction table in the database.
>
>> **UseCase Name:** _"removeFromWatchlist"_ function with **missing** _ticker_ input.
>> * **Description:** This test attempts to use the _"removeFromWatchlist"_ function to access the _watchlist_ table and delete a row, without text from the _companyTicker_ object.
>> * **Pre-Conditions:** The homepage object _"companyTicker"_ must be empty while the object _"companyName"_ contains text.<br> A valid _username_ must exist in the homepage's _"username"_ object for the _"removeFromWatchlist"_ function to work.
>> * **Test Steps:**
>>    1. Access the homepage, while logged in as a user, ensuring the _username_ appears on the homepage or in the HTML source code under the _"username"_ object.
>>    2. Open the console log via F12.
>>    3. Ensure _"remove from Watchlist"_ is the selectable button. If not, select _"add to Watchlist"_ to switch buttons.
>>    4. Accessing HTML source code directly, delete the text for the _companyTicker_ object, while keeping the _companyName_ object text.
>>    5. Select the _"remove from Watchlist"_ button located on the homepage.
>> * **Expected Results:** A message should be returned to the console "Ticker text is empty".
>> * **Actual Results:** The test succesfully produces the expected results. When the _companyTicker_ object is blank, the message "Ticker text is empty" is printed to the console.
>> * **Status:** Passed
>> * **Post-Conditions:** Besides the message printed to the console, no change should occur on the user's homepage or in the database.<br>
>
>> **UseCase Name:** _"removeFromWatchlist"_ function with **missing** _username_ input.
>> * **Description:** This test attempts to use the _"removeFromWatchlist"_ function to access the _stock_ table, without text from the _username_ object.
>> * **Pre-Conditions:** The homepage object _"username"_ must be empty.
>> * **Test Steps:**
>>    1. Access the homepage.
>>    2. Open the console log via F12.
>>    3. Ensure _"remove from Watchlist"_ is the selectable button. If not, select _"add to Watchlist"_ to switch buttons.
>>    4. Accessing HTML source code directly, delete the text for the _username_ object.
>>    5. Select the _"remove from Watchlist"_ button located on the homepage.
>> * **Expected Results:** A message should be returned to the console "Userame text is empty".
>> * **Actual Results:** The test succesfully produces the expected results. When the _companyTicker_ object is blank, the message "Username text is empty" is printed to the console.
>> * **Status:** Passed
>> * **Post-Conditions:** Besides the message printed to the console, no change should occur on the user's homepage or in the database.
>
>> **UseCase Name:** _"removeFromWatchlist"_ function with **invalid** _ticker_ input.
>> * **Description:** This test attempts to use the _"removeFromWatchlist"_ function to access the _watchlist_ table and delete a row, with text from the _companyTicker_ object that does not match a row in the _"watchlists"_ table.
>> * **Pre-Conditions:** The homepage object _"companyTicker"_ must be invalid.<br> A valid _username_ must exist in the homepage's _"username"_ object for the _"removeFromWatchlist"_ function to work.
>> * **Test Steps:**
>>    1. Access the homepage, while logged in as a user, ensuring the _username_ appears on the homepage or in the HTML source code under the _"username"_ object.
>>    2. Open the console log via F12.
>>    3. Ensure _"remove from Watchlist"_ is the selectable button. If not, select _"add to Watchlist"_ to switch buttons.
>>    4. Accessing HTML source code directly, replace the text for the _companyTicker_ object with random text that is not a ticker symbol already in _watchlist_.
>>    5. Select the _"remove from Watchlist"_ button located on the homepage.
>> * **Expected Results:** A message should be returned to the console "Stock not found in user watchlist".
>> * **Actual Results:** The test succesfully produces the expected results. When the _companyTicker_ object is invalid, the message "Stock not found in user watchlist" is printed to the console.
>> * **Status:** Passed
>> * **Post-Conditions:** Besides the message printed to the console, no change should occur on the user's homepage or in the database.<br>
>
>> **UseCase Name:** _"removeFromWatchlist"_ function with **invalid** _username_ input.
>> * **Description:** This test attempts to use the _"removeFromWatchlist"_ function to access the _stock_ table, with _username_ text that does not match a row in the _user_information_ table.
>> * **Pre-Conditions:** Text for the homepage object _"username"_ must be invalid.
>> * **Test Steps:**
>>    1. Access the homepage.
>>    2. Open the console log via F12.
>>    3. Ensure _"remove from Watchlist"_ is the selectable button. If not, select _"add to Watchlist"_ to switch buttons.
>>    4. Accessing HTML source code directly, replace the text for the _username_ object with random text that is not a username already in the _user_information_ table.
>>    5. Select the _"remove from Watchlist"_ button located on the homepage.
>> * **Expected Results:** A message should print to console "invalid username:" followed by the invalid username.
>> * **Actual Results:** The test succesfully produces the expected results. When the _companyTicker_ object is blank, the message "invalid username:" followed by the invalid username is printed to the console.
>> * **Status:** Passed
>> * **Post-Conditions:** Besides the message printed to the console, no change should occur on the user's homepage or in the database.
>___
> **Access Method:** _loadWatchlist_ function<br>
> **Description:** This method queries the _watchlists_ table using text from the _username_, upon refreshing the watchtable.<br>
> **Access Page:** Homepage<br>
> **Parameters:**  _username_ &nbsp;&nbsp; : &nbsp;&nbsp; text datatype<br>
> **Return Values:** Array(#) datatype, containing a number of rows from _user_information_ table<br>
>
> **Access Method Tests**<br>
>> **UseCase Name:** _"loadWatchlist"_ function with **valid** _username_.
>> * **Description:** The _"loadWatchlist"_ function attempts to refresh the _watchlists_ table, corresponding to its valid _username_ object.
>> * **Pre-Conditions:** Text for a valid username must exist in the _"username"_ object of the homepage.
>> * **Test Steps:**
>>    1. Access the homepage, while logged in as a user, ensuring the _username_ appears on the homepage or in the HTML source code under the _"username"_ object.
>> * **Expected Results:** The _"loadWatchlist"_ function should simply populate the _"watchlist"_ homepage object with _ticker_ text from the user's _watchlist_ table.
>> * **Actual Results:** The test successfully produces the expected results. When the homepage loads, the _"watchlist"_ homepage object is properly populated with _ticker_ text from the datatable. 
>> * **Status:** Passed
>> * **Post-Conditions:** The _"watchlist"_ homepage object is properly populated with _ticker_ text from the datatable.
>
>> **UseCase Name:** _"loadWatchlist"_ function with **invalid** _username_.
>> * **Description:** The _"loadWatchlist"_ function attempts to refresh the _watchlists_ table with a non existent _username_.
>> * **Pre-Conditions:** Text for a **invalid** username must exist in the _"username"_ object of the homepage.
>> * **Test Steps:**
>>    1. Access the homepage, ensuring the _username_ object in the HTML source code contains invalid _username_ text.
>> * **Expected Results:** A message should be printed to console "invalid username: ", followed by the invalid username. The watchlist object should be empty.
>> * **Actual Results:** The test successfully produces the expected results. When the homepage loads, the _"watchlist"_ homepage object is empty, and a message is printed to console "invalid username: ", followed by the invalid username.
>> * **Status:** Passed
>> * **Post-Conditions:** The _"watchlist"_ homepage object is empty and there is **no** _"add to Watchlist"_ or _"remove from Watchlist"_ button created.
>
>> **UseCase Name:** _"loadWatchlist"_ function with **missing** _username_.
>> * **Description:** The _"loadWatchlist"_ function attempts to refresh the _watchlists_ table with a **no** _username_.
>> * **Pre-Conditions:** The text for the _"username"_ object of the homepage must be **empty**.
>> * **Test Steps:**
>>    1. Access the homepage, ensuring the _username_ object in the HTML source code does **not** contain any text.
>> * **Expected Results:** A message should be printed to console "Username text is empty". The watchlist object should be empty.
>> * **Actual Results:** The test successfully produces the expected results. When the homepage loads, the _"watchlist"_ homepage object is empty, and a message is printed to console "Username text is empty".
>> * **Status:** Passed
>> * **Post-Conditions:** The _"watchlist"_ homepage object is empty and there is **no** _"add to Watchlist"_ or _"remove from Watchlist"_ button created.
