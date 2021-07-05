create table ciudades (
   id SERIAL PRIMARY KEY,
   nombre TEXT NOT NULL
);

create table personas (
   id SERIAL PRIMARY KEY,
   nombre TEXT NOT NULL,
   apellido TEXT,
   ciudad INTEGER,
   FOREIGN KEY(ciudad) REFERENCES ciudades(id)
);


INSERT INTO ciudades (nombre) VALUES ('Tucuman');
INSERT INTO ciudades (nombre) VALUES ('Buenos Aires');
INSERT INTO ciudades (nombre) VALUES ('New York');
INSERT INTO ciudades (nombre) VALUES ('Caracas');
INSERT INTO ciudades (nombre) VALUES ('Santa Cruz');
INSERT INTO ciudades (nombre) VALUES ('Maracaibo');

# INSERT INTO ciudades (nombre) VALUES ('Tucuman'), ('Buenos Aires'), ('New York'), ('Caracas'), ('Santa Cruz'), ('Maracaibo');

INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Toni', 'Tralice', 1);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Nepo', 'Neme', 1);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Romi', 'Moyano', 3);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Santi', 'Scanlan', 2);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Ceci', 'Schrupp', 4);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Luis', 'Pinki', 5);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Solano', 'Palacio', 99);

# como no existe 99, no se ingresa ninguna ciudad, pero ... los ids, autoincrementales, 
# se crean igual
-- INSERT INTO personas (nombre, apellido, ciudad) VALUES 
-- ('Toni', 'Tralice', 1), 
-- ('Nepo', 'Neme', 1), 
-- ('Romi', 'Moyano', 3), 
-- ('Santi', 'Scanlan', 2), 
-- ('Ceci', 'Schrupp', 4), 
-- ('Luis', 'Pinki', 5), 
-- ('Solano', 'Palacio', 99); 

# insert multiple values
-- INSERT INTO personas (nombre, apellido, ciudad) VALUES 
-- ('Toni', 'Tralice', 1), 
-- ('Nepo', 'Neme', 1), 
-- ('Romi', 'Moyano', 3), 
-- ('Santi', 'Scanlan', 2), 
-- ('Ceci', 'Schrupp', 4), 
-- ('Luis', 'Pinki', 5); 


SELECT * from personas;
SELECT * from ciudades;

SELECT * FROM personas
  ORDER BY apellido;

SELECT * FROM personas
  ORDER BY nombre DESC;

#default ASC
-- SELECT * FROM personas
--   ORDER BY nombre ASC;

SELECT * FROM personas
  WHERE nombre = 'Toni';

SELECT * FROM personas
  WHERE nombre = 'Toni'
  AND apellido = 'Tralice';

SELECT * FROM personas 
  WHERE ciudad = 1
  ORDER BY nombre; 

SELECT * FROM personas 
  WHERE ciudad = 1
  ORDER BY nombre DESC; 

# Agregamos uno para ver que pasa con dos nombres iguales
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Romi', 'Perez', 1);

SELECT * FROM personas 
  ORDER BY nombre, apellido; 

# group by 
-- select column_1, column_2, aggregate_function(column_3)
-- from table
-- group by column_1, column_2, ... ; 
-- https://www.postgresqltutorial.com/postgresql-group-by/

SELECT COUNT(*) AS count_personas FROM personas; 
SELECT COUNT(*) FROM personas; 

SELECT ciudad, COUNT(ciudad) FROM personas GROUP BY ciudad; 

SELECT ciudad, COUNT(ciudad) FROM personas GROUP BY ciudad ORDER BY COUNT(ciudad) DESC; 


# join
SELECT * from personas
JOIN ciudades
  ON ciudades.id = personas.ciudad;

SELECT p.nombre, p.apellido, c.nombre from personas p
JOIN ciudades c
  ON c.id = p.ciudad;

SELECT p.nombre, p.apellido, c.nombre  from personas p
JOIN ciudades c
  ON c.id = p.ciudad
WHERE apellido = 'Neme';

SELECT p.nombre, p.apellido, c.nombre  from personas p
JOIN ciudades c
  ON c.id = p.ciudad
ORDER BY c.nombre;

SELECT p.nombre, p.apellido, c.nombre  from personas p
LEFT JOIN ciudades c
  ON c.id = p.ciudad
ORDER BY c.nombre;

SELECT p.nombre, p.apellido, c.nombre  from personas p
RIGHT JOIN ciudades c
  ON c.id = p.ciudad
ORDER BY c.nombre;

SELECT per.nombre, per.apellido, c.nombre  from ciudades c
LEFT JOIN personas per
  ON c.id = per.ciudad
WHERE per.ciudad IS NULL
ORDER BY c.nombre;

SELECT p.nombre, p.apellido, c.nombre  from personas p
JOIN ciudades c
  ON c.id != p.ciudad;

INSERT INTO personas (nombre, apellido, ciudad)
  VALUES ('Luis', 'Pinki', 5);

SELECT * from personas
LEFT JOIN ciudades
  ON ciudades.id = personas.ciudad;



