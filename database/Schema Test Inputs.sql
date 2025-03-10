/*
insert into "User Information" ("Username", "Password", "Email") values
('big_bets_101', 'forthechildren99', 'bigbets101@gmail.com'),
('hi_roller_31', 'savethewhales82', 'hiroller31@aol.com'),
('white_knuckles_42', 'whoneedsveges?', 'whiteknuckles42@outlook.com');
*/

/*
insert into "Stock" ("Ticker", "Name") values
('AAPL', 'Apple'),
('MSFT', 'Microsoft'),
('TSLA', 'Tesla');
*/

/*
alter table "Date/Price"
alter column "Date Time" type timestamptz(0);
*/

/*
insert into "Date/Price" ("Date Time", "Ticker", "Price") values
('2025-02-23 14:00:00', 'AAPL', '245.55'),
('2025-02-23 04:00:00', 'AAPL', '240.79'),
('2025-02-23 14:00:00', 'MSFT', '408.21'),
('2025-02-23 04:00:00', 'MSFT', '400.64'),
('2025-02-23 14:00:00', 'TSLA', '337.80'),
('2025-02-23 04:00:00', 'TSLA', '325.13');
*/

/*
insert into "Watchlists" ("Username", "Ticker") values
('big_bets_101', 'AAPL'),
('big_bets_101', 'MSFT'),
('hi_roller_31', 'TSLA'),
('hi_roller_31', 'AAPL'),
('white_knuckles_42', 'MSFT'),
('white_knuckles_42', 'TSLA');
*/

--select * from "User Information";

--select * from "Stock";

--select * from "Watchlists";

--select * from "Date/Price";

select "Price"
from "Date/Price"
where "Date Time" = '2025-02-23 14:00:00+00'
and "Ticker" = 'TSLA';