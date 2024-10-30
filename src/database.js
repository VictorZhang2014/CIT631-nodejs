

const SQL_STATEMENTS = `
CREATE TABLE IF NOT EXISTS Users (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Name VARCHAR(128),
  Gender VARCHAR(128),
  Country VARCHAR(128),
  City VARCHAR(128)
);
`;




module.exports = {
  SQL_STATEMENTS
}
