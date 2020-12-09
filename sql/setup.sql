DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT,
  url TEXT NOT NULL
);
