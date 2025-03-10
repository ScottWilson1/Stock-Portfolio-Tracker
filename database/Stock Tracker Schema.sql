CREATE SCHEMA IF NOT EXISTS "Stock Tracker";

-- Create "User Information" table
CREATE TABLE IF NOT EXISTS "Stock Tracker"."User Information" (
    "Username" text PRIMARY KEY,
    "Password" text NOT NULL,
    "Email" text NOT NULL
);

-- Create "Stock" table
CREATE TABLE IF NOT EXISTS "Stock Tracker"."Stock" (
    "Ticker" text PRIMARY KEY,
    "Name" text NOT NULL
);

-- Create "Watchlist" junction table with composite PK and FKs
CREATE TABLE IF NOT EXISTS "Stock Tracker"."Watchlist" (
    "Username" text,
    "Ticker" text,
    PRIMARY KEY ("Username", "Ticker"),
    FOREIGN KEY ("Username") REFERENCES "Stock Tracker"."User Information" ("Username"),
    FOREIGN KEY ("Ticker") REFERENCES "Stock Tracker"."Stock" ("Ticker")
);