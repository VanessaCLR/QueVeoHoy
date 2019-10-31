DROP DATABASE peliculas;
CREATE DATABASE peliculas;
USE peliculas;

CREATE TABLE IF NOT EXISTS genero(
id int not null auto_increment,
nombre varchar(30),
primary key(id)
);

CREATE TABLE IF NOT EXISTS actor (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  nombre varchar(70),
  PRIMARY KEY (id));


CREATE TABLE IF NOT EXISTS pelicula (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(100),
  anio DECIMAL(5,0),
  duracion DECIMAL(5,0),
  genero_id INT(11),
  director VARCHAR(400),
  fecha_lanzamiento DATE,
  puntuacion DECIMAL(2,0),
  poster VARCHAR(300),
  trama VARCHAR(700),
  PRIMARY KEY (id),
  KEY pelicula_genero (genero_id),
  CONSTRAINT pelicula_genero FOREIGN KEY (genero_id) REFERENCES genero (id));

CREATE TABLE IF NOT EXISTS actor_pelicula (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  actor_id int(11) unsigned NOT NULL,
  pelicula_id int(11) unsigned NOT NULL,
  PRIMARY KEY (id),
  KEY actor_id (actor_id),
  KEY pelicula_id (pelicula_id),
  CONSTRAINT actor_id FOREIGN KEY (actor_id) REFERENCES actor (id),
  CONSTRAINT pelicula_id FOREIGN KEY (pelicula_id) REFERENCES pelicula (id)
);

select * from pelicula where 1=1 and genero_id ="2";
select * from pelicula inner join genero on pelicula.genero_id=genero.id inner join actor_pelicula on pelicula.id=pelicula_id inner join actor on actor.id=actor_id and pelicula_id ="116";







