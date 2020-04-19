CREATE TABLE api_project(
    id int(11) auto_increment not null,
    name varchar(100) not null,
    company varchar(100) not null,
    data mediumtext,
    primary key (id)
);
