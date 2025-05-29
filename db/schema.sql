-- TODO
DROP TABLE IF EXISTS files;
DROP IF TABLE EXISTS folders CASCADE;

CREATE TABLE files (
id serial PRIMARY KEY,
name text UNIQUE NOT NULL,
size integer NOT NULL,
folder_id integer NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
UNIQUE (name, folder_id)
);

CREATE TABLE folders (
id serial PRIMARY KEY,
name UNIQUE NOT NULL
);