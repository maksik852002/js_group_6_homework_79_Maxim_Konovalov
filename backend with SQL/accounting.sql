CREATE DATABASE  IF NOT EXISTS `accounting` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `accounting`;
-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: accounting
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu0.19.10.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Мебель',''),(2,'Оргтехника',''),(3,'Бытовая техника','');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categories_id` int NOT NULL,
  `places_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_inventory_1_idx` (`categories_id`),
  KEY `fk_inventory_2_idx` (`places_id`),
  CONSTRAINT `fk_inventory_1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_2` FOREIGN KEY (`places_id`) REFERENCES `places` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,1,'Стол офисный','инв. 4563','w5YXHA4G1RPhoQP79JN2_.jpeg'),(2,1,2,'Стол офисный','инв. 4564','hawNdvqJgln5e6_JpzIDl.jpeg'),(3,1,3,'Стол офисный','инв. 4565','ZIXw3ndcBd20p2SDV6xhI.jpeg'),(4,1,4,'Стол офисный','инв. 4566','vDQ8BHbKnQdsdqBPCf5sY.jpeg'),(5,1,1,'Кресло офисное','инв. 3245','nSVMLEDFMKJZ8sqr_GbAV.jpeg'),(6,1,2,'Кресло офисное','инв. 3247','vAauxtu7J2VDzT0bDwQn8.jpeg'),(7,1,3,'Стул офисный','инв. 3278','J2x2CLa_A4X1r1SWPejz7.jpeg'),(8,1,4,'Стул офисный','инв. 3212','m5-4MNv9lC24L9qBu1EGu.jpeg'),(9,2,1,'МФУ Xerox 6110MFPS ','инв. 9632','YsInYOaYZQArF3M9R1e8v.jpeg'),(10,2,2,'МФУ Xerox 6110MFPS ','инв. 9633','P2ZfagFvICF9glJhYneLz.jpeg'),(11,2,3,'Телефон Polycom VVX 411','инв. 8633','3MLoPzlsSFY4ZKEJLf4cs.jpeg'),(12,3,4,'Кофеварка эспрессо POLAR','инв. 7638','VHRhl_h7-DH-RxT88OI7d.jpeg'),(13,3,1,'Кондиционер Dahatsu DA-09','инв. 7665','UhcfxutmLeB9EZu63n8Su.jpeg');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (1,'Финансовый отдел','каб. 102'),(2,'Бухгалтерия','каб. 104'),(3,'Абонентский отдел','каб. 201'),(4,'HR отдел','каб. 308');
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-21 10:46:02
