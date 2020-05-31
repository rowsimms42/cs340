-- MySQL dump 10.13  Distrib 5.1.66, for redhat-linux-gnu (x86_64)
--
-- Host: mysql.eecs.oregonstate.edu    Database: CS340
-- ------------------------------------------------------
-- Server version	5.1.65-community-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Students` (
  `student_id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `student_fname` varchar(255) NOT NULL,
  `student_lname` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gpa` float(49) DEFAULT NULL,
  `major_id` int(11),
  `dorm_id` int(11) NOT NULL,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `Students_ibfk_1` 
  FOREIGN KEY (`major_id`) REFERENCES `Majors` (`major_id`),
  CONSTRAINT `Students_ibfk_2` 
  FOREIGN KEY (`dorm_id`) REFERENCES `Dorms` (`dorm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

ALTER TABLE Students AUTO_INCREMENT=40100;

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (NULL,'Jimmy', 'Smith', 'jsmith@school.edu',3.5,145,1120),
(NULL,'Sarah', 'Johnson', 'sjohnson@school.edu',3.75,NULL,1120),
(NULL,'Sam', 'Hunter', 'shunter@school.edu',3.20,146,1121),
(NULL,'Ryan', 'Brown', 'rborwn@school.edu',4.00,148,1121),
(NULL,'Eli', 'Gold', 'egold@school.edu',3.86,147,1123),
(NULL,'Jane', 'Doe', 'jdoe@school.edu',2.83,146,1122),
(NULL,'Steve', 'Winter', 'swinter@school.edu',2.29,147,1124);
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Majors`
--

DROP TABLE IF EXISTS `Majors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Majors` (
  `major_id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `major_name` varchar(255) NOT NULL,
  `dept_chair` varchar(255) NOT NULL,
  `required_units` int(11) NOT NULL,
  PRIMARY KEY (`major_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Majors`
--

ALTER TABLE Majors AUTO_INCREMENT=145;

LOCK TABLES `Majors` WRITE;
/*!40000 ALTER TABLE `Majors` DISABLE KEYS */;
INSERT INTO `Majors` VALUES (NULL,'Computer Science', 'Mike Matthews', 60),
(NULL,'Biology', 'James Jones', 55),
(NULL,'English', 'Hailey Potter', 50),
(NULL,'International Relations', 'Brian Best', 56);
/*!40000 ALTER TABLE `Majors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Classes`
--

DROP TABLE IF EXISTS `Classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Classes` (
  `class_id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `class_capacity` int(11) NOT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Classes`
--

ALTER TABLE Classes AUTO_INCREMENT=222101;

LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;
INSERT INTO `Classes` VALUES (NULL,'Underwater Basket Weaving','English', 40),
(NULL,'Study of Hemingway','English', 30),
(NULL,'Intro to Databases','Computer Science', 200),
(NULL,'Algorithms','Computer Science', 200),
(NULL,'Jousting','International Relations', 40),
(NULL,'Exercise Physiology','Biology', 50);
/*!40000 ALTER TABLE `Classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dorms`
--

DROP TABLE IF EXISTS `Dorms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dorms` (
  `dorm_id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `dorm_name` varchar(255) NOT NULL,
  `dorm_address` varchar(255) NOT NULL,
  `dorm_capacity` int(11) NOT NULL,
  PRIMARY KEY (`dorm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dorms`
--

ALTER TABLE Dorms AUTO_INCREMENT=1120;

LOCK TABLES `Dorms` WRITE;
/*!40000 ALTER TABLE `Dorms` DISABLE KEYS */;
INSERT INTO `Dorms` VALUES (NULL,'Ponderosa','245 Freshman Lane', 80),
(NULL,'Juniper','265 Freshman Lane', 120),
(NULL,'Evergreen','150 Softmore Road', 100),
(NULL,'Oakwood','99 Junior Avenue', 100),
(NULL,'Monterrey','140 Senior Place', 90);
/*!40000 ALTER TABLE `Dorms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Registrations`
-- Students allowed up to 5 classes.  NULL value is no class
--

DROP TABLE IF EXISTS `Registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Registrations` (
  `registration_id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `reg_student_id` int(11) NOT NULL,
  `reg_class_id` int(11) NOT NULL,
  PRIMARY KEY (`registration_id`),
  CONSTRAINT `Registration_ibfk_1` FOREIGN KEY (`reg_student_id`) REFERENCES `Students` (`student_id`),
  CONSTRAINT `Registration_ibfk_2` FOREIGN KEY (`reg_class_id`) REFERENCES `Classes` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Registrations`
--

ALTER TABLE Registrations AUTO_INCREMENT=4411220;

LOCK TABLES `Registrations` WRITE;
/*!40000 ALTER TABLE `Registrations` DISABLE KEYS */;
INSERT INTO `Registrations` VALUES (NULL,40100,222102),
(NULL,40101,222101),
(NULL,40102,222101),
(NULL,40101,222103),
(NULL,40102,222104),
(NULL,40103,222102),
(NULL,40104,222101),
(NULL,40102,222103),
(NULL,40103,222104),
(NULL,40104,222103);
/*!40000 ALTER TABLE `Registrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-02-04 12:54:40
