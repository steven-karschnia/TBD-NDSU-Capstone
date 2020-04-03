CREATE USER apiUser WITH PASSWORD 'temp';
CREATE DATABASE api WITH OWNER apiUser;

CREATE TABLE IF NOT EXISTS projects (
    ProjectID integer PRIMARY KEY,
    ProjectName VARCHAR(100)
);
