const userSchema = `
CREATE TABLE users (
	  id SERIAL,
	  session_token VARCHAR(64) NULL DEFAULT NULL,
	  password_reset_token VARCHAR(64) NULL DEFAULT NULL,
	  password_reset_expire_at VARCHAR(64) NULL DEFAULT NULL,
	  connected VARCHAR(64) NULL DEFAULT NULL,
	  birthdate TIMESTAMPTZ DEFAULT NULL,
	  score INTEGER DEFAULT 0,
	  reported INTEGER NULL DEFAULT NULL,
	  login VARCHAR(64) NOT NULL,
	  password VARCHAR(255) NOT NULL,
	  firstname VARCHAR(255) NOT NULL,
	  lastname VARCHAR(255) NOT NULL,
	  email VARCHAR(255) NOT NULL,
	  sex VARCHAR(6) DEFAULT NULL,
	  sexual_orientation VARCHAR(255) DEFAULT 'bisexual',
	  bio VARCHAR(560) NULL DEFAULT NULL,
	  longitude VARCHAR(255) NULL DEFAULT NULL,
	  latitude VARCHAR(255) NULL DEFAULT NULL,
	  last_connection TIMESTAMP NULL DEFAULT NULL,
	  photos varchar(1000) NOT NULL DEFAULT '[null,null,null,null,null]',
	  geolocation_allowed BOOLEAN DEFAULT FALSE,
	  occupation VARCHAR(560) NULL DEFAULT NULL,
	  PRIMARY KEY (id)
);

CREATE TABLE tags (
	  id SERIAL,
	  tag VARCHAR(64) NOT NULL,
	  user_id INTEGER NULL DEFAULT NULL,
	  PRIMARY KEY (id)
);
`;

module.exports = userSchema;
