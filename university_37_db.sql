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

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (43920,'Jimmy', 'Smith', 'jsmith@school.edu',3.5,145,1120),
(43922,'Sarah', 'Johnson', 'sjohnson@school.edu',3.7,NULL,1120),
(43924,'Sam', 'Hunter', 'shunter@school.edu',3.2,146,1121),
(43926,'Ryan', 'Brown', 'rborwn@school.edu',4.0,144,1121),
(43928,'Eli', 'Gold', 'egold@school.edu',3.8,147,1123),
(43930,'Jane', 'Doe', 'jdoe@school.edu',2.8,146,1122),
(43932,'Steve', 'Winter', 'swinter@school.edu',2.2,147,1124);
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

LOCK TABLES `Majors` WRITE;
/*!40000 ALTER TABLE `Majors` DISABLE KEYS */;
INSERT INTO `Majors` VALUES (144,'Computer Science', 'Mike Matthews', 60),
(145,'Biology', 'James Jones', 55),
(146,'English', 'Hailey Potter', 50),
(147,'International Relations', 'Brian Best', 56);
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

LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;
INSERT INTO `Classes` VALUES (54101,'Underwater Basket Weaving','English', 40),
(55200,'Study of Hemingway','English', 30),
(33200,'Intro to Databases','Computer Science', 200),
(33225,'Algorithms','Computer Science', 200),
(50300,'Jousting','International Relations', 40),
(36200,'Exercise Physiology','Biology', 50);
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
  `address` varchar(255) NOT NULL,
  `dorm_capacity` int(11) NOT NULL,
  PRIMARY KEY (`dorm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dorms`
--

LOCK TABLES `Dorms` WRITE;
/*!40000 ALTER TABLE `Dorms` DISABLE KEYS */;
INSERT INTO `Dorms` VALUES (1120,'Ponderosa','245 Freshman Lane', 80),
(1121,'Juniper','265 Freshman Lane', 120),
(1122,'Evergreen','150 Softmore Road', 100),
(1123,'Oakwood','99 Junior Avenue', 100),
(1124,'Monterrey','140 Senior Place', 90);
/*!40000 ALTER TABLE `Dorms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Registration`
-- Students allowed up to 5 classes.  NULL value is no class
--

DROP TABLE IF EXISTS `Registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Registration` (
  `sid` int(11) NOT NULL DEFAULT '0',
  `cid1` int(11) NOT NULL DEFAULT '0',
  `cid2` int(11) DEFAULT '0',
  `cid3` int(11) DEFAULT '0',
  `cid4` int(11) DEFAULT '0',
  `cid5` int(11) DEFAULT '0',
  PRIMARY KEY (`cid1`,`sid`),
  KEY `sid` (`sid`),
  CONSTRAINT `Registration_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `Students` (`student_id`),
  CONSTRAINT `Registration_ibfk_2` FOREIGN KEY (`cid1`) REFERENCES `Classes` (`class_id`),
  CONSTRAINT `Registration_ibfk_3` FOREIGN KEY (`cid2`) REFERENCES `Classes` (`class_id`),
  CONSTRAINT `Registration_ibfk_4` FOREIGN KEY (`cid3`) REFERENCES `Classes` (`class_id`),
  CONSTRAINT `Registration_ibfk_5` FOREIGN KEY (`cid4`) REFERENCES `Classes` (`class_id`),
  CONSTRAINT `Registration_ibfk_6` FOREIGN KEY (`cid5`) REFERENCES `Classes` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Registration`
--

LOCK TABLES `Registration` WRITE;
/*!40000 ALTER TABLE `Registration` DISABLE KEYS */;
INSERT INTO `Registration` VALUES (43922,33200,36200,55200,54101,NULL),
(43924,55200,33225, 50300, NULL, NULL),
(43926,50300,33225,54101, NULL, NULL),
(43928,54101,55200,33200, NULL, NULL),
(43930,54101,33225,36200,33200,55200);
/*!40000 ALTER TABLE `Registration` ENABLE KEYS */;
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
