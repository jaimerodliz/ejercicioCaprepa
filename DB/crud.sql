-- Motor de BD: MYSQL

-- Base de datos: prestamos
CREATE DATABASE `prestamos` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- Estructura de tablas
-- prestamos.clientes definition

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- prestamos.montos definition

CREATE TABLE `montos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `monto` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- prestamos.plazos definition

CREATE TABLE `plazos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plazo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- prestamos.prestamos definition

CREATE TABLE `prestamos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` int(11) NOT NULL,
  `idmonto` int(11) NOT NULL,
  `idplazo` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


