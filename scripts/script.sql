CREATE DATABASE peliculas;
USE peliculas;
CREATE TABLE pelicula (
id int not null auto_increment,
titulo varchar(100),
duracion smallint,
director varchar(400),
anio smallint,
fecha_lanzamiento date,
puntuacion tinyint,
poster varchar(300),
trama varchar(700),
primary key(id)
);
SELECT * FROM pelicula;
USE peliculas;
CREATE TABLE genero(
id int not null auto_increment,
nombre varchar(30),
primary key(id)
);
DESCRIBE genero;
Select * from genero;


