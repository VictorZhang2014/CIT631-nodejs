

const INIT_SQL_STATEMENTS = `
  CREATE TABLE IF NOT EXISTS Users (
    Id SERIAL PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(128),
    Gender VARCHAR(128),
    Country VARCHAR(128),
    City VARCHAR(128)
  );
`;




module.exports = {
  INIT_SQL_STATEMENTS
}
