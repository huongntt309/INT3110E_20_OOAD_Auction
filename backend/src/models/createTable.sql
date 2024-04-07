// TRONG SQL nói chung thì k cần định nghĩa schema cho db
CREATE TABLE`account`(
    `phone_number` TEXT PRIMARY KEY,
    `password` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `role` TEXT NOT NULL,
    `first_name` TEXT NOT NULL,
    `last_name` TEXT NOT NULL,
    `dob` DATETIME NOT NULL,
    `address` TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS vehicle_registration_plates (
  plate_id TEXT PRIMARY KEY,
  city TEXT NOT NULL,
  plate_type TEXT NOT NULL,
  vehicle_type TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS auctions (
  auction_id INTEGER PRIMARY KEY AUTOINCREMENT,
  plate_id TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  auction_status TEXT NOT NULL DEFAULT 'in_progress',
  bid_winner_id TEXT NOT NULL DEFAULT 'null',
  FOREIGN KEY (plate_id) REFERENCES vehicle_registration_plates (plate_id)
);


CREATE TABLE IF NOT EXISTS bids (
  bid_id INTEGER PRIMARY KEY AUTOINCREMENT,
  auction_id INTEGER NOT NULL,
  user_phone_number TEXT NOT NULL,
  bid_price INTEGER NOT NULL,
  bid_status TEXT,
  FOREIGN KEY (user_phone_number) REFERENCES accounts (phone_number),
  FOREIGN KEY (auction_id) REFERENCES auctions (auction_id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS payments (
  payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  bid_id INTEGER NOT NULL,
  payment_type TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  FOREIGN KEY (bid_id) REFERENCES bids (bid_id)
);


