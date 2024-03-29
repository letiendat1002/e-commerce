-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category`
(
    `CategoryID` bigint unsigned NOT NULL AUTO_INCREMENT,
    `Name`       varchar(255)    NOT NULL,
    `Slug`       varchar(255)    NOT NULL,
    `Image`      longtext        NOT NULL,
    PRIMARY KEY (`CategoryID`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category`
    DISABLE KEYS */;
INSERT INTO `Category`
VALUES (1, 'laptop', 'laptop', '../../assets/images/1/637655727924518755_asus-rog-gaming-g513-rgb4-xam-1.webp'),
       (2, 'Điện Thoại', 'dienthoai', '../../assets/images/42/638005897366049263_oppo-a77s-den-5.webp'),
       (3, 'Máy tính bảng', 'may-tinh-bang', '../../assets/images/52/638059477189671553_iPad-Gen-9-bac--6.webp'),
       (4, 'PC Linh Kiện', 'pc-linh-kien', '../../assets/images/78/638096359388473379_mac-mini-2023-m2-3.jpg');
/*!40000 ALTER TABLE `Category`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order`
(
    `OrderID`         bigint unsigned NOT NULL AUTO_INCREMENT,
    `UserID`          bigint unsigned NOT NULL,
    `PaymentType`     varchar(255)    NOT NULL,
    `Status`          varchar(255)    NOT NULL,
    `DateOrder`       date            NOT NULL,
    `Address`         varchar(255)   DEFAULT NULL,
    `AdditionalPrice` decimal(38, 0) DEFAULT NULL,
    `DateCompleted`   date           DEFAULT NULL,
    `DatePreparing`   date           DEFAULT NULL,
    `DateShipping`    date           DEFAULT NULL,
    `IsCompleted`     bit(1)         DEFAULT NULL,
    `IsPreparing`     bit(1)         DEFAULT NULL,
    `IsShipping`      bit(1)         DEFAULT NULL,
    `WorkerID`        decimal(38, 0) DEFAULT NULL,
    PRIMARY KEY (`OrderID`, `UserID`),
    KEY `fk_Order_User1_idx` (`UserID`),
    CONSTRAINT `fk_Order_User1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB
  AUTO_INCREMENT = 480
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order`
    DISABLE KEYS */;
INSERT INTO `Order`
VALUES (279, 2, 'COD', 'CANCELLED', '2023-01-06', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (280, 2, 'COD', 'CANCELLED', '2023-01-06', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (335, 3, 'COD', 'CANCELLED', '2023-02-06', 'shgdahsgdasd', 0, '2023-05-21', '2023-05-20', '2023-05-20',
        _binary '', _binary '', _binary '', 20),
       (337, 3, 'COD', 'CANCELLED', '2023-02-09', 'dsadsda', 0, '2023-05-21', NULL, '2023-05-20', _binary '',
        _binary '', _binary '', 20),
       (338, 2, 'COD', 'USER_RECEIVED', '2023-02-09', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', 23),
       (339, 2, 'COD', 'USER_RECEIVED', '2023-02-09', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', 23),
       (341, 2, 'COD', 'USER_RECEIVED', '2023-04-10', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', 23),
       (346, 3, 'COD', 'CANCELLED', '2023-04-11', 'sdasdasdasd', 0, '2023-04-11', NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (347, 3, 'COD', 'CANCELLED', '2023-04-12', 'sdasdasdasd', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (349, 3, 'COD', 'CANCELLED', '2023-04-13', 'sdasdasdasd', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (351, 2, 'COD', 'USER_RECEIVED', '2023-04-14', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', 24),
       (352, 12, 'COD', 'CANCELLED', '2023-04-12', 'adasdasdadssdasdsd', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (353, 13, 'COD', 'CANCELLED', '2023-04-11', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (354, 13, 'COD', 'CANCELLED', '2023-05-10', 'Hiêp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (355, 2, 'COD', 'USER_RECEIVED', '2023-05-11', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', 24),
       (356, 2, 'COD', 'USER_RECEIVED', '2023-05-10', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', 24),
       (357, 2, 'COD', 'CANCELLED', '2023-05-05', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (358, 2, 'COD', 'CANCELLED', '2023-05-05', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', NULL),
       (359, 2, 'COD', 'USER_RECEIVED', '2023-05-04', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '\0',
        _binary '', _binary '', 25),
       (361, 12, 'COD', 'CANCELLED', '2023-05-02', 'adasdasdadssdasdsd', 0, NULL, NULL, NULL, _binary '\0', _binary '',
        _binary '', 25),
       (362, 12, 'COD', 'CANCELLED', '2023-05-11', 'adasdasdadssdasdsd', 0, NULL, '2023-05-23', '2023-05-23',
        _binary '\0', _binary '', _binary '', NULL),
       (363, 12, 'COD', 'CANCELLED', '2023-05-01', 'adasdasdadssdasdsd', 0, '2023-05-23', NULL, '2023-05-23',
        _binary '', _binary '', _binary '', 20),
       (364, 12, 'COD', 'CANCELLED', '2023-05-01', 'adasdasdadssdasdsd', 0, NULL, '2023-05-23', '2023-05-23',
        _binary '\0', _binary '', _binary '', NULL),
       (365, 12, 'COD', 'CANCELLED', '2023-05-06', 'adasdasdadssdasdsd', 0, NULL, '2023-05-23', '2023-05-23',
        _binary '', _binary '', _binary '', NULL),
       (366, 12, 'COD', 'SHIP_COMPLETED', '2023-05-07', 'adasdasdadssdasdsd', 0, '2023-05-23', '2023-05-23',
        '2023-05-23', _binary '', _binary '', _binary '', 20),
       (367, 12, 'COD', 'SHIP_COMPLETED', '2023-05-07', 'adasdasdadssdasdsd', 0, '2023-05-23', '2023-05-23',
        '2023-05-23', _binary '', _binary '', _binary '', 20),
       (368, 12, 'COD', 'SHIP_COMPLETED', '2023-05-08', 'adasdasdadssdasdsd', 0, '2023-05-23', '2023-05-23',
        '2023-05-23', _binary '', _binary '', _binary '', 20),
       (369, 12, 'COD', 'CANCELLED', '2023-05-11', 'adasdasdadssdasdsd', 0, '2023-05-23', '2023-05-23', '2023-05-23',
        _binary '', _binary '', _binary '', 20),
       (370, 12, 'COD', 'CANCELLED', '2023-05-11', 'adasdasdadssdasdsd', 0, NULL, '2023-05-20', '2023-05-20',
        _binary '', _binary '', _binary '', NULL),
       (371, 12, 'COD', 'SHIP_COMPLETED', '2023-05-11', 'adasdasdadssdasdsd', 0, '2023-05-23', '2023-05-20',
        '2023-05-23', _binary '', _binary '', _binary '', 20),
       (372, 12, 'COD', 'CANCELLED', '2023-05-11', 'adasdasdadssdasdsd', 0, '2023-05-11', '2023-05-21', '2023-05-23',
        _binary '', _binary '', _binary '', NULL),
       (373, 12, 'COD', 'CANCELLED', '2023-04-11', 'adasdasdadssdasdsd', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (374, 12, 'COD', 'SHIP_COMPLETED', '2023-04-11', 'adasdasdadssdasdsd', 0, '2023-05-23', '2023-05-23',
        '2023-05-23', _binary '', _binary '', _binary '', 20),
       (375, 2, 'COD', 'USER_RECEIVED', '2023-04-12', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (376, 2, 'COD', 'CANCELLED', '2023-03-11', 'adsadsadasd', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (377, 2, 'COD', 'USER_RECEIVED', '2023-02-11', 'Thủ Đức', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (378, 2, 'COD', 'USER_RECEIVED', '2023-05-11', 'asdasdasdasdasda', 0, '2023-05-11', NULL, NULL, _binary '',
        _binary '', _binary '', NULL),
       (379, 2, 'COD', 'USER_RECEIVED', '2023-05-06', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (380, 2, 'COD', 'CANCELLED', '2023-05-05', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (381, 2, 'COD', 'USER_RECEIVED', '2023-04-08', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', 25),
       (382, 2, 'COD', 'USER_RECEIVED', '2023-05-09', 'adsadsadasd', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', 26),
       (383, 2, 'COD', 'USER_RECEIVED', '2023-05-09', 'adsadsadasd', 0, '2023-05-09', NULL, NULL, _binary '',
        _binary '', _binary '', 26),
       (384, 2, 'COD', 'USER_RECEIVED', '2023-05-11', 'asdasdasdasdasda', 0, '2023-05-12', NULL, NULL, _binary '',
        _binary '', _binary '', 26),
       (385, 2, 'COD', 'USER_RECEIVED', '2023-05-12', 'Hiệp Bình Chánh', 0, '2023-05-12', NULL, NULL, _binary '',
        _binary '', _binary '', 25),
       (386, 2, 'COD', 'USER_RECEIVED', '2023-05-12', 'asdasdasdasdasda', 0, '2023-05-12', NULL, NULL, _binary '',
        _binary '', _binary '', 24),
       (387, 15, 'COD', 'SHIP_COMPLETED', '2023-05-12', 'dbaskdasdasda', 0, '2023-05-12', NULL, NULL, _binary '',
        _binary '', _binary '', 20),
       (388, 16, 'COD', 'SHIP_COMPLETED', '2023-05-12', 'Hiệp Bình Chánh', 0, '2023-05-12', NULL, NULL, _binary '',
        _binary '', _binary '', 20),
       (389, 2, 'COD', 'CANCELLED', '2023-05-12', 'sdfsfdsdfsdf', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (390, 2, 'COD', 'CANCELLED', '2023-05-12', 'sdfsfdsdfsdf', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (391, 2, 'COD', 'CANCELLED', '2023-05-12', 'sdfsfdsdfsdf', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (392, 2, 'COD', 'CANCELLED', '2023-05-12', 'sdfsfdsdfsdf', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (393, 17, 'COD', 'USER_RECEIVED', '2023-05-13', 'Hiệp Bình Chánh', 0, '2023-05-13', NULL, NULL, _binary '',
        _binary '', _binary '', 24),
       (394, 17, 'COD', 'USER_RECEIVED', '2023-05-13', 'Thủ Đức', 0, '2023-05-13', NULL, NULL, _binary '', _binary '',
        _binary '', 25),
       (395, 17, 'COD', 'CANCELLED', '2023-05-13', 'TPHCM', 0, NULL, NULL, NULL, _binary '', _binary '', _binary '',
        NULL),
       (396, 17, 'COD', 'USER_RECEIVED', '2023-05-13', 'skdhasdasdas', 0, '2023-05-23', '2023-05-23', '2023-05-23',
        _binary '', _binary '', _binary '', 20),
       (401, 17, 'COD', 'USER_RECEIVED', '2023-05-13', 'sdasdasd', 0, '2023-05-23', '2023-05-23', '2023-05-23',
        _binary '', _binary '', _binary '', 20),
       (402, 18, 'COD', 'CANCELLED', '2023-05-13', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '', _binary '',
        _binary '', NULL),
       (403, 18, 'COD', 'SHIP_COMPLETED', '2023-05-13', 'Hiệp Bình Chánh', 0, '2023-05-13', NULL, NULL, _binary '',
        _binary '', _binary '', NULL),
       (404, 17, 'COD', 'USER_RECEIVED', '2023-05-13', 'Hiệp Bình Chánh', 0, '2023-05-23', '2023-05-20', '2023-05-23',
        _binary '', _binary '', _binary '', 20),
       (405, 2, 'COD', 'USER_RECEIVED', '2023-05-19', 'asdasdasdasdasda', 0, '2023-05-20', NULL, '2023-05-20',
        _binary '', _binary '', _binary '', 1),
       (406, 2, 'COD', 'USER_RECEIVED', '2023-05-19', 'asdasdasdasdasda', 0, '2023-05-19', NULL, NULL, _binary '',
        _binary '', _binary '', NULL),
       (407, 2, 'COD', 'USER_RECEIVED', '2023-05-19', 'asdasdasdasdasda', 0, '2023-05-19', NULL, NULL, _binary '',
        _binary '', _binary '', NULL),
       (410, 19, 'COD', 'USER_RECEIVED', '2023-05-20', 'fasdfsdfsdf', 0, '2023-05-20', NULL, NULL, _binary '',
        _binary '\0', _binary '\0', 1),
       (413, 2, 'COD', 'CANCELLED', '2023-05-20', 'Thủ Đức', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (414, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (415, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (416, 2, 'COD', 'CANCELLED', '2023-05-20', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (417, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (418, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (419, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (420, 2, 'COD', 'CANCELLED', '2023-05-20', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (422, 2, 'COD', 'USER_RECEIVED', '2023-05-20', 'Hiệp Bình Chánh', 0, '2023-05-20', '2023-05-20', '2023-05-20',
        _binary '', _binary '', _binary '', 7),
       (423, 2, 'COD', 'USER_RECEIVED', '2023-05-20', 'asdasdasdasdasda', 0, '2023-05-21', '2023-05-20', '2023-05-20',
        _binary '', _binary '', _binary '', 20),
       (424, 2, 'COD', 'CANCELLED', '2023-05-20', 'adsadsadasd', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (425, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (426, 2, 'COD', 'CANCELLED', '2023-05-20', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (427, 2, 'COD', 'CANCELLED', '2023-05-20', 'adsadsadasd', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (428, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (429, 2, 'COD', 'CANCELLED', '2023-05-20', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (430, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (431, 2, 'COD', 'CANCELLED', '2023-05-20', 's.dasdasd', 0, '2023-05-20', '2023-05-20', '2023-05-20', _binary '',
        _binary '', _binary '', 7),
       (432, 2, 'COD', 'USER_RECEIVED', '2023-05-20', 's.dasdasd', 0, '2023-05-21', '2023-05-20', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (433, 2, 'COD', 'CANCELLED', '2023-05-20', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (434, 2, 'COD', 'CANCELLED', '2023-05-21', 'asdasdasdasdasda', 0, NULL, '2023-05-21', NULL, _binary '\0',
        _binary '', _binary '\0', NULL),
       (435, 2, 'COD', 'CANCELLED', '2023-05-21', 'Hiệp Bình Chánh', 0, NULL, '2023-05-21', NULL, _binary '\0',
        _binary '', _binary '\0', NULL),
       (436, 2, 'COD', 'CANCELLED', '2023-05-21', 'Thủ Đức', 0, NULL, '2023-05-21', '2023-05-21', _binary '\0',
        _binary '', _binary '', NULL),
       (437, 2, 'COD', 'USER_RECEIVED', '2023-05-21', 'Hiệp Bình Chánh', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 7),
       (438, 2, 'COD', 'USER_RECEIVED', '2023-05-21', 'Hiệp Bình Chánh', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (439, 19, 'COD', 'USER_RECEIVED', '2023-05-21', 'ngkjgkj', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (440, 19, 'COD', 'CANCELLED', '2023-05-21', 'fvbfghfghf', 0, NULL, '2023-05-21', '2023-05-21', _binary '\0',
        _binary '', _binary '', NULL),
       (441, 19, 'COD', 'USER_RECEIVED', '2023-05-21', 'fgdgffgdfg', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 7),
       (442, 19, 'COD', 'USER_RECEIVED', '2023-05-21', 'fdfgdfgdfgd', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 7),
       (443, 19, 'COD', 'CANCELLED', '2023-05-21', 'vcxnfgvbn', 0, NULL, '2023-05-21', '2023-05-21', _binary '\0',
        _binary '', _binary '', NULL),
       (444, 19, 'COD', 'USER_RECEIVED', '2023-05-21', ';yoiuih', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (445, 19, 'COD', 'USER_RECEIVED', '2023-05-21', 'kjgkgkhgkj', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (446, 19, 'COD', 'USER_RECEIVED', '2023-05-21', 'jghiutiuguk', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (447, 2, 'COD', 'USER_RECEIVED', '2023-05-21', 'asdasdasdasdasda', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (448, 2, 'COD', 'CANCELLED', '2023-05-21', 'Hiệp Bình Chánh', 0, NULL, '2023-05-21', '2023-05-21', _binary '\0',
        _binary '', _binary '', NULL),
       (449, 19, 'COD', 'SHIP_COMPLETED', '2023-05-21', 'lhjhkjhjk', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (450, 19, 'COD', 'SHIP_COMPLETED', '2023-05-21', 'lhjhkjhjk', 0, '2023-05-21', '2023-05-21', '2023-05-21',
        _binary '', _binary '', _binary '', 20),
       (451, 2, 'COD', 'CANCELLED', '2023-05-23', 'asdasdasdasdasda', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (452, 2, 'COD', 'USER_RECEIVED', '2023-05-23', 'Hiệp Bình Chánh', 0, '2023-05-23', '2023-05-23', '2023-05-23',
        _binary '', _binary '', _binary '', 20),
       (453, 2, 'COD', 'USER_RECEIVED', '2023-05-23', 'adsadsadasd', 0, '2023-05-23', '2023-05-23', '2023-05-23',
        _binary '', _binary '', _binary '', 20),
       (454, 17, 'COD', 'USER_RECEIVED', '2023-05-24', 'sbkjdkjfsdfsdfs', 0, '2023-05-24', '2023-05-24', '2023-05-24',
        _binary '', _binary '', _binary '', 20),
       (455, 2, 'COD', 'CANCELLED', '2023-05-24', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (456, 19, 'COD', 'SHIP_COMPLETED', '2023-05-24', 'Hiepej Binhf Chanh', 0, '2023-05-26', '2023-05-26',
        '2023-05-26', _binary '', _binary '', _binary '', 20),
       (457, 2, 'COD', 'CANCELLED', '2023-05-24', 'Hiệp Bình Chánh', 0, NULL, NULL, NULL, _binary '\0', _binary '\0',
        _binary '\0', NULL),
       (458, 2, 'COD', 'USER_RECEIVED', '2023-05-24', 'Hiệp Bình Chánh', 0, '2023-05-24', '2023-05-24', '2023-05-24',
        _binary '', _binary '', _binary '', 7),
       (459, 2, 'COD', 'USER_RECEIVED', '2023-05-26', 'Hiệp Bình Chánh', 0, '2023-05-26', '2023-05-26', '2023-05-26',
        _binary '', _binary '', _binary '', 20),
       (460, 2, 'COD', 'USER_RECEIVED', '2023-05-26', 'Hiệp Bình Chánh', 0, '2023-05-26', '2023-05-26', '2023-05-26',
        _binary '', _binary '', _binary '', 7),
       (461, 17, 'COD', 'USER_RECEIVED', '2023-05-26', 'dasdasdasd', 0, '2023-05-26', '2023-05-26', '2023-05-26',
        _binary '', _binary '', _binary '', 20),
       (462, 17, 'COD', 'USER_RECEIVED', '2023-05-26', 'dasdasdasd', 0, '2023-05-26', '2023-05-26', '2023-05-26',
        _binary '', _binary '', _binary '', 17),
       (463, 17, 'COD', 'USER_RECEIVED', '2023-05-27', 'skdhalksdasda', 0, '2023-05-28', '2023-05-27', '2023-05-28',
        _binary '', _binary '', _binary '', 26),
       (464, 17, 'COD', 'USER_RECEIVED', '2023-05-27', 'skdhalksdasda', 0, '2023-05-28', '2023-05-27', '2023-05-28',
        _binary '', _binary '', _binary '', 26),
       (465, 17, 'COD', 'USER_RECEIVED', '2023-05-27', 'skdhalksdasda', 0, '2023-05-28', '2023-05-27', '2023-05-28',
        _binary '', _binary '', _binary '', 26),
       (466, 17, 'COD', 'USER_RECEIVED', '2023-05-27', 'skdhalksdasda', 0, '2023-05-28', '2023-05-27', '2023-05-28',
        _binary '', _binary '', _binary '', 26),
       (467, 17, 'COD', 'USER_RECEIVED', '2023-05-27', 'skdhalksdasda', 0, '2023-05-28', '2023-05-27', '2023-05-28',
        _binary '', _binary '', _binary '', 23),
       (468, 17, 'COD', 'CANCELLED', '2023-05-27', 'skdhalksdasda', 0, '2023-05-28', '2023-05-27', '2023-05-28',
        _binary '', _binary '', _binary '', 26),
       (469, 17, 'COD', 'USER_RECEIVED', '2023-05-27', 'skdhalksdasda', 0, '2023-05-29', '2023-05-27', '2023-05-28',
        _binary '', _binary '', _binary '', 25),
       (470, 17, 'COD', 'CANCELLED', '2023-05-27', 'skdhalksdasda', 0, '2023-05-28', '2023-05-27', '2023-05-28',
        _binary '', _binary '', _binary '', 23),
       (471, 17, 'COD', 'USER_RECEIVED', '2023-05-28', 'skdhasdasd', 0, '2023-05-30', '2023-05-28', '2023-05-28',
        _binary '', _binary '', _binary '', 24),
       (472, 17, 'COD', 'USER_RECEIVED', '2023-05-28', 'jkhdjasdasdas', 0, '2023-05-28', '2023-05-28', '2023-05-28',
        _binary '', _binary '', _binary '', 20),
       (473, 17, 'COD', 'USER_RECEIVED', '2023-05-29', 'kjsgfkjadfasdas', 0, '2023-05-29', '2023-05-29', '2023-05-29',
        _binary '', _binary '', _binary '', 26),
       (474, 2, 'COD', 'USER_RECEIVED', '2023-05-30', '12/4, Phường Tân Chánh Hiệp, Quận 12, Thành phố Hồ Chí Minh', 0,
        '2023-05-30', '2023-05-30', '2023-05-30', _binary '', _binary '', _binary '', 23),
       (475, 2, 'COD', 'USER_RECEIVED', '2023-05-30', '12/4, Phường Tân Chánh Hiệp, Quận 12, Thành phố Hồ Chí Minh', 0,
        '2023-05-30', '2023-05-30', '2023-05-30', _binary '', _binary '', _binary '', 24),
       (476, 17, 'COD', 'SHIP_COMPLETED', '2023-05-30', 'sjdhakjsdasdasd', 0, '2023-05-30', '2023-05-30', '2023-05-30',
        _binary '', _binary '', _binary '', 20),
       (477, 17, 'COD', 'SHIP_COMPLETED', '2023-05-30', 'sjdhakjsdasdasd', 0, '2023-05-30', '2023-05-30', '2023-05-30',
        _binary '', _binary '', _binary '', 20),
       (478, 17, 'COD', 'SHIP_COMPLETED', '2023-05-30', 'sjdhakjsdasdasd', 0, '2023-05-30', '2023-05-30', '2023-05-30',
        _binary '', _binary '', _binary '', 20),
       (479, 17, 'COD', 'SHIP_COMPLETED', '2023-05-31', 'jhkfskjđfsdf', 0, '2023-05-31', '2023-05-31', '2023-05-31',
        _binary '', _binary '', _binary '', 20);
/*!40000 ALTER TABLE `Order`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderDetail`
--

DROP TABLE IF EXISTS `OrderDetail`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderDetail`
(
    `OrderID`       bigint unsigned NOT NULL,
    `ProductID`     bigint unsigned NOT NULL,
    `PurchasePrice` bigint unsigned NOT NULL,
    `Quantity`      int unsigned    NOT NULL,
    `Status`        varchar(255) DEFAULT NULL,
    PRIMARY KEY (`OrderID`, `ProductID`),
    KEY `fk_OrderDetail_Order1_idx` (`OrderID`),
    KEY `fk_OrderDetail_Product1_idx` (`ProductID`),
    CONSTRAINT `fk_OrderDetail_Order1` FOREIGN KEY (`OrderID`) REFERENCES `Order` (`OrderID`) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT `fk_OrderDetail_Product1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderDetail`
--

LOCK TABLES `OrderDetail` WRITE;
/*!40000 ALTER TABLE `OrderDetail`
    DISABLE KEYS */;
INSERT INTO `OrderDetail`
VALUES (279, 15, 33999000, 1, NULL),
       (280, 32, 28490000, 1, NULL),
       (335, 1, 26990000, 1, 'REFUND_COMPLETED'),
       (335, 2, 21490000, 2, NULL),
       (337, 1, 26990000, 1, NULL),
       (338, 32, 28490000, 1, NULL),
       (339, 31, 27990000, 1, NULL),
       (341, 1, 26990000, 1, NULL),
       (341, 2, 21490000, 1, NULL),
       (346, 1, 26990000, 1, NULL),
       (347, 1, 26990000, 1, NULL),
       (349, 1, 26990000, 1, NULL),
       (351, 1, 26990000, 1, NULL),
       (352, 1, 26990000, 1, NULL),
       (352, 9, 18490000, 1, NULL),
       (352, 31, 27990000, 1, NULL),
       (352, 32, 28490000, 1, NULL),
       (353, 1, 26990000, 1, NULL),
       (354, 31, 27990000, 1, NULL),
       (355, 1, 26990000, 4, NULL),
       (356, 1, 26990000, 2, NULL),
       (357, 21, 16490000, 1, NULL),
       (358, 16, 27990000, 1, NULL),
       (358, 31, 27990000, 1, NULL),
       (359, 6, 14990000, 1, NULL),
       (359, 31, 27990000, 1, NULL),
       (361, 24, 40990000, 1, NULL),
       (362, 1, 26990000, 1, NULL),
       (363, 51, 8990000, 1, 'REFUND_COMPLETED'),
       (364, 1, 26990000, 1, NULL),
       (365, 52, 7990000, 1, NULL),
       (366, 52, 7990000, 1, 'REFUND_COMPLETED'),
       (367, 31, 27990000, 1, NULL),
       (368, 67, 6990000, 1, NULL),
       (369, 72, 14790000, 8, NULL),
       (370, 69, 8790000, 6, NULL),
       (371, 69, 8790000, 6, NULL),
       (372, 32, 28490000, 1, NULL),
       (373, 53, 12490000, 1, NULL),
       (374, 38, 26990000, 4, NULL),
       (375, 2, 21490000, 4, NULL),
       (376, 2, 21490000, 5, NULL),
       (377, 68, 8990000, 8, NULL),
       (378, 53, 12490000, 2, 'REFUND_COMPLETED'),
       (379, 31, 27990000, 3, NULL),
       (380, 36, 37990000, 1, NULL),
       (381, 56, 6990000, 6, NULL),
       (382, 4, 20490000, 6, NULL),
       (383, 17, 22990000, 3, 'REFUND_COMPLETED'),
       (384, 11, 33240500, 1, 'REFUND_COMPLETED'),
       (384, 12, 15190500, 1, 'REFUND_COMPLETED'),
       (384, 31, 27990000, 2, 'REFUND_COMPLETED'),
       (384, 32, 27350400, 1, 'REFUND_COMPLETED'),
       (385, 2, 21060200, 1, 'REFUND_COMPLETED'),
       (385, 16, 24351300, 1, 'REFUND_COMPLETED'),
       (385, 51, 8540500, 1, 'REFUND_COMPLETED'),
       (386, 73, 23990400, 1, 'REFUND_COMPLETED'),
       (386, 79, 55990000, 1, 'REFUND_COMPLETED'),
       (386, 85, 11990000, 1, 'REFUND_COMPLETED'),
       (387, 31, 27990000, 4, 'REFUND_COMPLETED'),
       (388, 22, 21590000, 4, 'REFUND_COMPLETED'),
       (389, 1, 26990000, 2, NULL),
       (389, 2, 21490000, 2, NULL),
       (389, 11, 34990000, 1, NULL),
       (390, 1, 26990000, 1, NULL),
       (390, 2, 21490000, 1, NULL),
       (391, 1, 26990000, 2, NULL),
       (392, 3, 90000000, 1, NULL),
       (393, 59, 30990000, 1, 'REFUND_COMPLETED'),
       (394, 1, 25640500, 1, NULL),
       (395, 1, 25640500, 1, NULL),
       (396, 1, 26990000, 1, 'REFUND_COMPLETED'),
       (396, 2, 21490000, 1, NULL),
       (401, 1, 26990000, 1, NULL),
       (402, 17, 22530200, 2, NULL),
       (403, 31, 27990000, 1, 'REFUND_COMPLETED'),
       (404, 1, 26990000, 2, NULL),
       (405, 7, 13166500, 1, NULL),
       (406, 31, 27990000, 1, 'REFUND_COMPLETED'),
       (406, 54, 4265500, 2, 'REFUND_COMPLETED'),
       (407, 12, 15190500, 1, 'REFUND_COMPLETED'),
       (410, 1, 25640500, 1, 'REFUND_COMPLETED'),
       (413, 4, 20080200, 1, NULL),
       (414, 2, 21060200, 1, NULL),
       (415, 1, 25640500, 1, NULL),
       (416, 31, 27990000, 1, NULL),
       (417, 32, 27350400, 1, NULL),
       (418, 31, 27990000, 1, NULL),
       (419, 31, 27990000, 1, NULL),
       (420, 31, 27990000, 1, NULL),
       (422, 2, 21060200, 1, 'REFUND_COMPLETED'),
       (422, 5, 20864200, 1, 'REFUND_COMPLETED'),
       (422, 31, 27990000, 1, 'REFUND_COMPLETED'),
       (422, 34, 25490000, 1, 'REFUND_COMPLETED'),
       (422, 36, 37230200, 1, 'REFUND_COMPLETED'),
       (422, 53, 11865500, 1, 'REFUND_COMPLETED'),
       (423, 31, 27990000, 1, 'REFUND_COMPLETED'),
       (424, 31, 27990000, 1, NULL),
       (425, 31, 27990000, 1, NULL),
       (426, 51, 8540500, 1, NULL),
       (427, 32, 27350400, 1, NULL),
       (428, 31, 27990000, 1, NULL),
       (429, 1, 25640500, 1, NULL),
       (430, 31, 27990000, 1, NULL),
       (431, 1, 26990000, 2, NULL),
       (432, 1, 26990000, 2, 'REFUND_COMPLETED'),
       (433, 44, 3790000, 1, NULL),
       (434, 31, 27990000, 1, NULL),
       (435, 31, 27990000, 1, NULL),
       (436, 32, 27350400, 1, NULL),
       (437, 51, 8540500, 1, 'REFUND_COMPLETED'),
       (438, 2, 21060200, 1, 'REFUND_COMPLETED'),
       (438, 5, 20864200, 1, 'REFUND_COMPLETED'),
       (438, 31, 27990000, 1, 'REFUND_COMPLETED'),
       (438, 34, 25490000, 1, 'REFUND_COMPLETED'),
       (438, 53, 11865500, 1, 'REFUND_COMPLETED'),
       (439, 61, 5490000, 1, 'REFUND_COMPLETED'),
       (440, 31, 27990000, 1, NULL),
       (441, 51, 8540500, 1, 'REFUND_COMPLETED'),
       (442, 33, 15599000, 1, 'ON_REFUND'),
       (443, 9, 16641000, 1, NULL),
       (444, 58, 42990000, 1, NULL),
       (445, 21, 16490000, 1, NULL),
       (446, 51, 8540500, 1, 'ON_REFUND'),
       (447, 5, 20864200, 1, 'ON_REFUND'),
       (448, 31, 27990000, 1, NULL),
       (449, 5, 20864200, 1, NULL),
       (449, 10, 19465500, 1, NULL),
       (450, 5, 20864200, 1, NULL),
       (450, 10, 19465500, 1, NULL),
       (451, 31, 27990000, 1, NULL),
       (452, 1, 25640500, 1, 'REFUND_COMPLETED'),
       (453, 16, 24351300, 1, 'REFUND_COMPLETED'),
       (453, 31, 27990000, 1, 'REFUND_COMPLETED'),
       (454, 1, 26990000, 1, NULL),
       (454, 2, 21490000, 1, NULL),
       (455, 19, 20890000, 2, NULL),
       (456, 6, 14540300, 1, NULL),
       (457, 31, 27990000, 1, NULL),
       (458, 1, 25640500, 1, 'ON_REFUND'),
       (458, 31, 27990000, 2, 'ON_REFUND'),
       (459, 1, 25640500, 1, 'ON_REFUND'),
       (460, 1, 25640500, 3, 'ON_REFUND'),
       (461, 1, 26990000, 2, 'ON_REFUND'),
       (462, 1, 26990000, 1, NULL),
       (465, 1, 26990000, 1, NULL),
       (466, 1, 26990000, 1, NULL),
       (467, 1, 26990000, 1, NULL),
       (471, 1, 26990000, 1, NULL),
       (472, 1, 26990000, 1, NULL),
       (472, 2, 21490000, 1, NULL),
       (473, 1, 26990000, 1, 'REFUND_COMPLETED'),
       (473, 2, 21490000, 1, 'REFUND_COMPLETED'),
       (474, 1, 25640500, 1, 'ON_REFUND'),
       (475, 1, 25640500, 1, 'ON_REFUND'),
       (476, 1, 26990000, 1, NULL),
       (477, 2, 21490000, 2, NULL),
       (478, 2, 21490000, 1, NULL),
       (479, 1, 26990000, 1, NULL);
/*!40000 ALTER TABLE `OrderDetail`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product`
(
    `ProductID`    bigint unsigned NOT NULL AUTO_INCREMENT,
    `CategoryID`   bigint unsigned DEFAULT NULL,
    `Name`         varchar(255)    NOT NULL,
    `Slug`         varchar(255)    NOT NULL,
    `Image`        longtext,
    `ImageReview1` longtext,
    `ImageReview2` longtext,
    `ImageReview3` longtext,
    `UnitPrice`    bigint unsigned NOT NULL,
    `Quantity`     int unsigned    NOT NULL,
    `Description`  longtext,
    `YearRelease`  smallint        DEFAULT NULL,
    `Manufacturer` varchar(255)    DEFAULT NULL,
    `Monitor`      varchar(255)    DEFAULT NULL,
    `CPU`          varchar(255)    DEFAULT NULL,
    `RAM`          varchar(255)    DEFAULT NULL,
    `VGA`          varchar(255)    DEFAULT NULL,
    `HardDisk`     varchar(255)    DEFAULT NULL,
    `Camera`       varchar(255)    DEFAULT NULL,
    `Battery`      varchar(255)    DEFAULT NULL,
    `Status`       bit(1)          NOT NULL,
    `Demand`       varchar(255)    DEFAULT NULL,
    `Memory`       varchar(255)    DEFAULT NULL,
    `Discount`     int             DEFAULT NULL,
    PRIMARY KEY (`ProductID`),
    KEY `fk_Product_Category1_idx` (`CategoryID`),
    CONSTRAINT `fk_Product_Category1` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB
  AUTO_INCREMENT = 89
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product`
    DISABLE KEYS */;
INSERT INTO `Product`
VALUES (1, 1, 'Laptop Asus ROG Strix Gaming G513IE-HN246W R7 4800H/8GB/512GB/15.6FHD/GeForce RTX 3050 Ti 4GB/Win 11',
        'Asus-ROG-Strix-Gaming-G513IE-HN246W', '637655727924518755_asus-rog-gaming-g513-rgb4-xam-1.webp',
        '637655727922487554_asus-rog-gaming-g513-rgb4-xam-3.webp',
        '637655727926706226_asus-rog-gaming-g513-rgb4-xam-2.webp', 'asus-rog-gaming-g513-rgb4-xam-4-transformed.jpeg',
        26990000, 82,
        'ASUS ROG Strix Gaming G513IE-HN246W tập trung vào sức mạnh và trải nghiệm chơi game nhưng cũng không kém phần thu hút bởi thiết kế cao cấp, đèn LED ấn tượng. Mạnh mẽ ở cả \'cpu\' Ryzen 7 4800H và GPU RTX 3550 Ti, ROG Strix G513IE-HN246W hoàn hảo cho cả chơi game và làm việc đa nhiệm.',
        2022, 'Asus', '15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, 250 nits, FHD', 'Amd ryzen 7', '8 GB', 'NVIDIA',
        'SSD 512 GB', '', '', _binary '', '', '', 5),
       (2, 1, 'Laptop Asus Gaming ROG G513IC-HN729W R7 4800H/8GB/512GB/15.6 FHD/GeForce RTX 3050 4GB/Win11',
        'Asus-Gaming-ROG-G513IC-HN729W', '637655727924518755_asus-rog-gaming-g513-rgb4-xam-1.webp',
        '637655727922487554_asus-rog-gaming-g513-rgb4-xam-3.webp',
        '637655727926706226_asus-rog-gaming-g513-rgb4-xam-2.webp', 'asus-rog-gaming-g513-rgb4-xam-4-transformed.jpeg',
        21490000, 95,
        'ASUS ROG Strix Gaming G513IC-HN729W là chiếc laptop gaming cực chất đến từ dòng ROG danh tiếng. Thiết kế thu hút mọi ánh nhìn, gọn nhẹ di động và mang trên mình cấu hình mạnh mẽ, nhưng thật bất ngờ khi giá bán của ROG Strix G513 lại rất dễ chịu.',
        2022, 'Asus', '15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, 250 nits, IPS LCD', 'Amd ryzen 7', '8 GB', 'NVIDIA',
        'SSD 512 GB', '', '', _binary '', '', '', 2),
       (3, 1, 'Laptop ASUS Gaming ROG Strix G634JZ-N4029W i9 13980HX/16GB/1TB/16QHD/GeForce RTX 4080 12GB/Win11',
        'ASUS-Gaming-ROG-Strix-G634JZ-N4029W', '638120655160846619_asus-gaming-rog-strix-g634jz-n4029w-den-1.webp',
        '638120655160772891_asus-gaming-rog-strix-g634jz-n4029w-den-2.webp',
        '638120655160822385_asus-gaming-rog-strix-g634jz-n4029w-den-3.webp',
        '638120655160883550_asus-gaming-rog-strix-g634jz-n4029w-den-4.webp', 90000000, 120,
        'ASUS Gaming ROG Strix G634JZ-N4029W là chiếc laptop gaming cực chất đến từ dòng ROG danh tiếng. Thiết kế thu hút mọi ánh nhìn, gọn nhẹ di động và mang trên mình cấu hình mạnh mẽ. ',
        2023, 'Asus', '16.0 inch, 2560 x 1600 Pixels, IPS, 240 Hz, 500 nits, Anti - Glare', 'Intel core i7', '32 GB',
        'NVIDIA', 'SSD 1 TB', '', '', _binary '', '', '', 3),
       (4, 1, 'Laptop Asus Zenbook UX425EA-KI839W i5 1135G7/8GB/512GB SSD/14 FHD/Win 11', 'Asus-Zenbook-UX425EA-KI839W',
        '637387847968338274_637335980720863180_asus-zenbook-ux425ja-xam-1.webp',
        '637387847968494606_637335980720467274_asus-zenbook-ux425ja-xam-2.webp',
        '637387847968494606_637335980720078468_asus-zenbook-ux425ja-xam-4.webp',
        '637387847968494606_637335980720682971_asus-zenbook-ux425ja-xam-3.webp', 20490000, 114,
        'Lựa chọn tối ưu của dành cho những người đam mê laptop ultrabook mỏng nhẹ, Zenbook UX425EA-KI839W với thiết kế tuyệt đẹp, mỏng gọn và linh hoạt sẽ đồng hành cùng bạn đi muôn nơi, đem tới sự hỗ trợ tốt nhất khi làm việc, học tập hoặc giải trí. Sản phẩm sở hữu hiệu năng ấn tượng, ẩn chứa sức mạnh đáng nể bên trong một kết cấu gọn gàng đầy tính thời trang.',
        2021, 'Asus', '14.0 inch, 1920 x 1080 Pixels, IPS, 60 Hz, 400 nits, IPS LCD', 'Intel core i5', '8 GB',
        'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', '', '', 2),
       (5, 1, 'Laptop Asus Zenbook Flip UX363EA-HP726W i5 1135G7/8GB/512GB SSD/13.3 OLED Touch/Win11',
        'Asus-Zenbook-Flip-UX363EA-HP726W', '637727610206010780_asus-zenbook-flip-ux363-xam-1.webp',
        '637727610206010780_asus-zenbook-flip-ux363-xam-2.webp',
        '637727610205698348_asus-zenbook-flip-ux363-xam-3.webp',
        '637727610205542057_asus-zenbook-flip-ux363-xam-4.webp', 21290000, 117,
        'ASUS ZenBook Flip UX363EA HP726W là chiếc laptop di động đáng kinh ngạc khi sở hữu loạt công nghệ cao cấp hàng đầu trong một thiết kế siêu mỏng nhẹ. Từ màn hình cảm ứng OLED đẹp tuyệt mỹ, sức mạnh của bộ vi xử lý Intel thế hệ thứ 11, Windows 11 bản quyền cho đến khả năng xoay gập đa năng.',
        2021, 'Asus', '13.3 inch, 1920 x 1080 Pixels, OLED, 60 Hz, 500 nits, OLED', 'Intel core i5', '8 GB',
        'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', '', '', 2),
       (6, 1, 'Laptop Asus Vivobook M1403QA-LY022W R5 5600H/8GB/512GB/14WUXGA/Win 11', 'Asus-Vivobook-M1403QA-LY022W',
        '637987719191658652_asus-vivobook-m1403-non-oled-bac-1.webp',
        '637987719191346214_asus-vivobook-m1403-non-oled-bac-2.webp',
        '637987719189627753_asus-vivobook-m1403-non-oled-bac-3.webp',
        '637987719191814975_asus-vivobook-m1403-non-oled-bac-4.webp', 14990000, 118,
        'ASUS Vivobook M1403QA-LY022W vượt qua những giới hạn về cấu hình của một chiếc laptop tầm trung. Sức mạnh tuyệt vời từ bộ vi xử lý AMD Ryzen 5 5600H giúp bạn hoàn thành mọi công việc một cách dễ dàng. Ngoài ra đây còn là chiếc laptop có vẻ ngoài thời trang với thiết kế mới đầy hiện đại.',
        2022, 'Asus', '14.0 inch, 1920 x 1200 Pixels, IPS, 60 Hz, 300 nits, LED Backlit', 'Amd ryzen 5', '8 GB', 'AMD',
        'SSD 512 GB', '', '', _binary '', '', '', 3),
       (7, 1, 'Laptop Asus Vivobook M513UA-EJ704W R7 5700U/8GB/512GB SSD/15.6 FHD/Win11', 'Asus-Vivobook-M513UA-EJ704W',
        '638109316757538562_asus-vivobook-m513ua-ej704w-r7-5700u-bac-4.webp',
        '638109316751980743_asus-vivobook-m513ua-ej704w-r7-5700u-bac-5.webp',
        '638109316756162583_asus-vivobook-m513ua-ej704w-r7-5700u-bac-1.webp',
        '638109316752447576_asus-vivobook-m513ua-ej704w-r7-5700u-bac-2.webp', 15490000, 120,
        'Asus Vivobook M513UA-EJ704W vượt qua những giới hạn về cấu hình của một chiếc laptop tầm trung. Sức mạnh tuyệt vời từ bộ vi xử lý AMD Ryzen 7 5700U giúp bạn hoàn thành mọi công việc một cách dễ dàng. Ngoài ra đây còn là chiếc laptop có vẻ ngoài thời trang với thiết kế mới đầy hiện đại.',
        2022, 'Asus', '15.6 inch, FHD (1920 x 1080), TN, 60 Hz, Anti-Glare LED-Backlit Display', 'Amd ryzen 7', '8 GB',
        'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', '', '', 15),
       (8, 1, 'Laptop Asus Vivobook Pro M3401QA-KM025W R7 5800H/8GB/512GB SSD/14 2.8K OLED/Win11',
        'Asus-Vivobook-Pro-M3401QA-KM025W', '637764585584576434_asus-vivobook-pro-m3401qa-bac-1.webp',
        '637764585587232674_asus-vivobook-pro-m3401qa-bac-3.webp',
        '637764585586295124_asus-vivobook-pro-m3401qa-bac-4.webp',
        '637764585583795188_asus-vivobook-pro-m3401qa-bac-5.webp', 17990000, 120,
        'Đã đến lúc bạn tận hưởng những tinh hoa của công nghệ, nơi hình ảnh tuyệt đẹp từ màn hình 2.8K OLED và âm thanh Harman Kardon tạo nên một trải nghiệm chưa từng có trên chiếc laptop ASUS Vivobook Pro M3401QA-KM025W đầy tính di động.',
        2021, 'Asus', '14.0 inch, 2880 x 1800 Pixels, OLED, 90 Hz, 600 nits, OLED', 'Amd ryzen 7', '8 GB', 'AMD',
        'SSD 512 GB', '', '', _binary '', '', '', 5),
       (9, 1, 'Laptop Asus Vivobook Flip TP3402ZA-LZ159W i5 12500H/8GB/512GB/14.0WUXGA/Bút/Win11',
        'Asus-Vivobook-Flip-TP3402ZA-LZ159W', '638000430282627835_asus-vivobook-flip-tp3402-bac-1.webp',
        '638000430282315086_asus-vivobook-flip-tp3402-bac-2.webp',
        '638000430282783913_asus-vivobook-flip-tp3402-bac-6.webp',
        '638000430280752613_asus-vivobook-flip-tp3402-bac-3.webp', 18490000, 117,
        'ASUS Vivobook Flip TP3402ZA-LZ159W (Vivobook S14 Flip) mở ra một hành trình mới dành cho bạn nhờ bản lề xoay gập 360 độ và màn hình cảm ứng, giúp bạn làm việc hay giải trí theo cách của mình. Sức mạnh tuyệt vời từ bộ vi xử lý Intel Core i5 12500H cho bạn giải quyết mọi việc trong chớp mắt.',
        2022, 'Asus', '14.0 inch, 1920 x 1080 Pixels, IPS, Hãng không công bố, 300 nits, LED-backlit', 'Intel core i5',
        '8 GB', 'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', '', '', 10),
       (10, 1, 'Laptop Asus TUF Gaming FX506HC-HN144W i5 11400H/8GB/512GB/15.6FHD/NVIDIA GeForce RTX 3050 4GB/Win 11',
        'Asus-TUF-Gaming-FX506HC-HN144W', '637850092511020843_asus-tuf-gaming-fx506h-den-1.webp',
        '637850092510552100_asus-tuf-gaming-fx506h-den-2.webp', '637850092510395816_asus-tuf-gaming-fx506h-den-3.webp',
        '637850092511020843_asus-tuf-gaming-fx506h-den-4.webp', 20490000, 119,
        'Asus TUF Gaming F15 FX506HC HN144W sở hữu cấu hình tuyệt vời với những linh kiện mới nhất cùng một thiết kế di động, bền bỉ nhưng lại được bán ở mức giá rẻ đến khó tin. Đây chắc chắn là mẫu laptop gaming giá tốt mà các game thủ sẽ rất yêu thích.',
        2022, 'Asus', '15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare LED-backlit', 'Intel core i5', '8 GB',
        'NVIDIA', 'SSD 512 GB', '', '', _binary '', '', '', 5),
       (11, 1, 'Laptop HP Gaming OMEN 16-b0178TX i5 11400H/16GB/1TB/16.1FHD/GeForce RTX 3050Ti 4GB/Win 11',
        'HP-Gaming-OMEN-16-b0178TX', '637889803064747112_hp-gaming-omen-16-den-1.webp',
        '637889803064591061_hp-gaming-omen-16-den-2.webp', '637889803064747112_hp-gaming-omen-16-den-3.webp',
        '637889803064591061_hp-gaming-omen-16-den-4.webp', 34990000, 122,
        'HP Gaming OMEN 16 b0178TX đưa trải nghiệm chơi game của bạn lên một tầm cao mới với bộ vi xử lý Intel thế hệ thứ 11 mạnh mẽ, card đồ họa RTX 3050 Ti chuyên dành cho game thủ và những công nghệ độc quyền chỉ có ở dòng OMEN.',
        2022, 'HP', '16.1 inch, 1920 x 1080 Pixels, IPS, 144 Hz, 300 nits, IPS LCD', 'Intel core i5', '16 GB', 'NVIDIA',
        'SSD 1 TB', '', '', _binary '', '', '', 5),
       (12, 1, 'Laptop HP Pavilion 14 dv2035TU i5 1235U/8GB/256GB/14FHD/Win 11', 'HP-Pavilion-14-dv2035TU',
        '637947168657435002_hp-pavilion-14-dv-win11-vang-1.webp',
        '637947168657435002_hp-pavilion-14-dv-win11-vang-2.webp',
        '637947168657435002_hp-pavilion-14-dv-win11-vang-3.webp',
        '637947168657122564_hp-pavilion-14-dv-win11-vang-4.webp', 15990000, 121,
        'Làm việc chăm chỉ và giải trí vui vẻ hơn, HP Pavilion 14 dv2035TU sẵn sàng đồng hành cùng bạn trên mọi nẻo đường với thiết kế nhỏ gọn, thời lượng pin dài và sức mạnh nổi bật từ bộ vi xử lý Intel thế hệ thứ 12 mới nhất.',
        2022, 'HP', '14.0 inch, 1920 x 1080 Pixels, IPS, 60 Hz, 250 nits, BrightView LED Backlit Chính:',
        'Intel core i5', '8 GB', 'NVIDIA', 'SSD 256 GB', '', '', _binary '', '', '', 5),
       (13, 1, 'Laptop HP ZBook Firefly 14 G8 i5 1135G7/8GB/512GB/14FHD/Win 10 Pro', 'HP-ZBook-Firefly-14-G8',
        '637663502050170145_hp-zbook-firefly-14-g8-xam-1.webp', '637663502047201460_hp-zbook-firefly-14-g8-xam-2.webp',
        '637663502047357766_hp-zbook-firefly-14-g8-xam-3.webp', '637663502046420264_hp-zbook-firefly-14-g8-xam-4.webp',
        28890000, 120,
        'HP ZBook Firefly 14 G8 là dòng máy trạm Workstations nhỏ gọn và mỏng nhẹ nhất hiện nay, mang đến năng suất làm việc vượt trội từ bộ vi xử lý Intel thế hệ thứ 11 mạnh mẽ trong một thiết bị siêu di động.',
        2021, 'HP', '14.0 inch, 1920 x 1080 Pixels, IPS, 60 Hz, 250 nits', 'Intel core i5', '8 GB', 'CARD ONBOARD',
        'SSD 512 GB', '', '', _binary '', '', '', 10),
       (14, 1, 'Laptop HP Pavilion Gaming 15 dk1074TX i7 10750H/8GB/512GB/15.6FHD/Win 10',
        'HP-Pavilion-Gaming-15-dk1074TX', '637322132736709615_hp-pavilion-gaming-15-dk-den-1.webp',
        '637322132736769740_hp-pavilion-gaming-15-dk-den-2.webp',
        '637322132736819654_hp-pavilion-gaming-15-dk-den-3.webp',
        '637322132736819654_hp-pavilion-gaming-15-dk-den-4.webp', 23990000, 120,
        'Hiệu năng dẫn đầu xu hướng với bộ vi xử lý Intel Core i7 thế hệ thứ 10 cực mạnh, HP Pavilion Gaming 15 dk1074TX là chiếc laptop chơi game nhỏ gọn mà các game thủ đang tìm kiếm.',
        2021, 'HP', '15.6 inch, 1920 x 1080 Pixels, IPS, 60 Hz, 250 nits, IPS LCD', 'Intel core i7', '8 GB', 'NVIDIA',
        'SSD 512 GB', '', '', _binary '', '', '', 12),
       (15, 1, 'Laptop Lenovo Gaming Legion 5 15IAH7H i7 12700H/16GB/512GB/15.6WQHD/RTX 3060 6GB/Win11',
        'Lenovo-Gaming-Legion-5-15IAH7H', '638109273683768082_lenovo-gaming-legion-5-15iah7h-i7-12700h-4.webp',
        '638109273684237034_lenovo-gaming-legion-5-15iah7h-i7-12700h-2.webp',
        '638109273684081374_lenovo-gaming-legion-5-15iah7h-i7-12700h-3.webp',
        '638109273683143201_lenovo-gaming-legion-5-15iah7h-i7-12700h-5.webp', 33999000, 120,
        'Laptop Lenovo Legion 5 15IAH7 là chiếc laptop chơi game mạnh mẽ một cách toàn diện khi không chỉ sở hữu cấu hình đỉnh cao từ bộ vi xử lý Intel Core i7 12700H, card rời RTX 3060 mà sản phẩm còn mang trên mình màn hình 15,6 inch WQHD 165Hz đáng mơ ước cho mọi game thủ.',
        2022, 'Lenovo', '15.6 inch, 2560 x 1440 Pixels, IPS, 165 Hz, 300 nits, IPS LCD LED Backlit, True Tone',
        'Intel core i7', '16 GB', 'NVIDIA', 'SSD 512 GB', '', '', _binary '', '', '', 14),
       (16, 1, 'Laptop Lenovo Gaming Legion 5 15ARH7 R5 6600H/8GB/512GB/15.6FHD/GeForce RTX 3050 4GB/Win 11',
        'Lenovo-Gaming-Legion-5-15ARH7', '638018713259494423_lenovo-gaming-legion-5-15arh7-xam-dam-1.webp',
        '638018713259338198_lenovo-gaming-legion-5-15arh7-xam-dam-2.webp',
        '638018713258556936_lenovo-gaming-legion-5-15arh7-xam-dam-3.webp',
        '638018713258244488_lenovo-gaming-legion-5-15arh7-xam-dam-4.webp', 27990000, 120,
        'Laptop Gaming Lenovo Legion 5 15ARH7 R5 là chìa khóa sẽ mở ra cánh cửa đến với thế giới game AAA đỉnh cao, với bộ vi xử lý AMD Ryzen 6000 series mới nhất và GPU RTX 30 series. Một thiết kế cực “chiến” nhưng lại mỏng nhẹ đến không ngờ giúp chiếc laptop gaming luôn ở bên bạn để thoải mái chơi game mọi lúc mọi nơi.',
        2022, 'Lenovo', '15.6 inch, 1920 x 1080 Pixels, IPS, 165 Hz, 300 nits, IPS', 'Amd ryzen 5', '8 GB', 'NVIDIA',
        'SSD 512 GB', '', '', _binary '', '', '', 13),
       (17, 1, 'Laptop Lenovo Yoga Slim 7 Pro 14IHU5O i5 11300H/16GB/512GB/142.8K OLED/Win 11',
        'Lenovo-Yoga-Slim-7-Pro-14IHU5O', '637890985840900515_lenovo-yoga-slim-7-pro-14ihu5-bac-1.webp',
        '637890991628427881_lenovo-yoga-slim-7-pro-14ihu5-bac-3.webp',
        '637890991628584335_lenovo-yoga-slim-7-pro-14ihu5-bac-2.webp',
        '637951440971766327_lenovo-yoga-slim-7-pro-14ihu5-bac-4.webp', 22990000, 122,
        'Hoàn thành công việc nhanh chóng với Lenovo Yoga Slim 7 Pro 14IHU5 O, chiếc laptop doanh nhân đẳng cấp được công nhận chuẩn Intel Evo, hội tụ cả tốc độ nhanh chóng, thời lượng pin dài và hình ảnh tuyệt đẹp. Với màn hình OLED 2.8K đẹp hoàn mỹ và âm thanh nổi Dolby Atmos, Yoga Slim 7 Pro còn là một trung tâm giải trí di động đích thực.',
        2022, 'Lenovo', '14.0 inch, 2880 x 1800 Pixels, OLED, 90 Hz, 400 nits, OLED', 'Intel core i5', '16 GB',
        'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', '', '', 2),
       (18, 1, 'Laptop Lenovo Yoga 7 14ACN6 R5 5600U/8GB/512GB/14.0 FHD/Win 11', 'Lenovo-Yoga-7-14ACN6',
        '637775083720823374_lenovo-yoga-7-14acn6-xam-1.webp', '637775083721135869_lenovo-yoga-7-14acn6-xam-2.webp',
        '637775083720823374_lenovo-yoga-7-14acn6-xam-3.webp', '637775083720823374_lenovo-yoga-7-14acn6-xam-4.webp',
        21990000, 120,
        'Lenovo Yoga 7 14ACN6 là chiếc máy tính 2-in-1 có kiểu dáng khỏe khoắn và thời trang, màn hình cảm ứng IPS Full HD tràn viền tuyệt đẹp cùng cấu hình mạnh mẽ từ AMD Ryzen 5000 series.',
        2021, 'Lenovo', '14.0 inch, 1920 x 1080 Pixels, IPS, 60 Hz, 300 nits, IPS LCD', 'Amd ryzen 5', '8 GB', 'AMD',
        'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (19, 1, 'Laptop Lenovo ThinkPad E14 G4 R7 5825U/8GB/512GB/14 FHD/Win 11', 'Lenovo-ThinkPad-E14-G4',
        '638011026555853473_lenovo-thinkpad-e14-gen-4-den-1.webp',
        '638011026555853473_lenovo-thinkpad-e14-gen-4-den-2.webp',
        '638011026555751243_lenovo-thinkpad-e14-gen-4-den-3.webp',
        '638011026555751243_lenovo-thinkpad-e14-gen-4-den-4.webp', 20890000, 120,
        'Lenovo ThinkPad E14 Gen 4 mang trên mình sức mạnh của bộ vi xử lý AMD Ryzen 7 5825U hiệu suất cao cùng các tính năng bảo mật hàng đầu trong một thiết kế mỏng nhẹ và bền bỉ, là chiếc laptop đáng tin cậy của bạn trong công việc.',
        2022, 'Lenovo', '14.0 inch, 1920 x 1080 Pixels, IPS, Hãng không công bố, 400 nits, IPS', 'Amd ryzen 7', '8 GB',
        'AMD', 'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (20, 1, 'Laptop Lenovo ThinkPad E14 Gen 4 i5 1235U/8GB/512GB/14 FHD/Win 11', 'Lenovo-ThinkPad-E14-Gen 4',
        '637999616467035700_lenovo-thinkpad-e14-gen-4-i5-1235u-den-1.webp',
        '637999616466879436_lenovo-thinkpad-e14-gen-4-i5-1235u-den-2.webp',
        '637999616466254442_lenovo-thinkpad-e14-gen-4-i5-1235u-den-3.webp',
        '637999616466723278_lenovo-thinkpad-e14-gen-4-i5-1235u-den-4.webp', 20390000, 120,
        'Lenovo ThinkPad E14 Gen 4 là chiếc laptop doanh nhân 14 inch nhỏ gọn, thời trang nhưng sở hữu hiệu năng xuất sắc, khả năng bảo mật cao và độ bền đáng nể, sẵn sàng đồng hành cùng bạn trong suốt nhiều năm mà vẫn đảm bảo hiệu suất.',
        2022, 'Lenovo', '14.0 inch, 1920 x 1080 Pixels, IPS, 60 Hz, 300 nits, Anti-Glare', 'Intel core i5', '8 GB',
        'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (21, 1, 'Laptop MSI Gaming GF63 Thin 11SC-1090VN i5 11400H/8GB/512GB/15.6FHD/GeForce GTX 1650 4GB/Win11',
        'MSI-Gaming-GF63-Thin-11SC-1090VN', '638007368710444071_msi-gaming-gf63-thin-11sc-1090vn-den-1.webp',
        'text_ng_n_12__12.webp', 'text_ng_n_11__1_6.webp', 'text_ng_n_13__13.webp', 16490000, 116,
        'Trong tầm giá rẻ đến bất ngờ, MSI Gaming GF63 Thin 11SC-1090VN là sự lựa chọn tuyệt vời cho game thủ, đặc biệt những bạn học sinh, sinh viên với cấu hình xuất sắc từ bộ vi xử lý Intel Core i5 11400H và GPU RTX 1650. Hơn nữa, nhờ thiết kế mỏng nhẹ, bạn có thể mang laptop đi bất cứ đâu một cách dễ dàng.',
        2022, 'MSI', '15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, IPS FHD', 'Intel core i5', '8 GB', 'NVIDIA',
        'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (22, 1, 'Laptop MSI Gaming Katana GF66 12UCK-815VN i5 12450H/8GB/512GB/15.6/GeForce RTX 3050 4GB/Win11_Balo',
        'MSI-Gaming-Katana-GF66-12UCK-815VN', '638017841585071699_msi-gaming-katana-gf66-12u-den-1.webp',
        '638017841585583091_msi-gaming-katana-gf66-12u-den-2.webp',
        '638017841584664118_msi-gaming-katana-gf66-12u-den-3.webp',
        '638017841584664118_msi-gaming-katana-gf66-12u-den-4.webp', 21590000, 120,
        'Một siêu phẩm laptop gaming hàng đầu với thiết kế đầy cảm hứng và hiệu suất tiên tiến lại được bán với giá rẻ không ngờ, MSI Gaming Katana GF66 12UCK-815VN đưa bạn đến với đam mê chơi game theo cách đơn giản nhất.',
        2022, 'MSI', '15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, 250 nits, FHD', 'Intel core i5', '8 GB', 'NVIDIA',
        'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (23, 1, 'Laptop MSI Modern 15 A11MU-1022VN i5 1155G7/8GB/512GB/15.6FHD/Win 11_Xám', 'MSI-Modern-15-A11MU-1022VN',
        '637663479331129814_msi-modern-15-xam-1.webp', '637663479326129766_msi-modern-15-xam-2.webp',
        '637663479325504797_msi-modern-15-xam-3.webp', '637663479326285995_msi-modern-15-xam-4.webp', 13990000, 120,
        'MSI Modern 15 A11MU 1022VN tiếp tục mang trên mình thiết kế mỏng nhẹ cao cấp đặc trưng của dòng Modern, nay còn hấp dẫn hơn nhờ việc được nâng cấp cấu hình mạnh mẽ vượt trội với bộ vi xử lý mới.',
        2022, 'MSI', '15.6 inch Chính:, 1920 x 1080 Pixels, IPS, 60 Hz, 300 nits, LED Backlit Chính:', 'Intel core i5',
        '8 GB', 'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (24, 1, 'Laptop Acer Predator Gaming Helios PH315-54-99S6 i9 11900H/16G/512G/15.6/GeForce RTX3060 6G/Win 11',
        'Acer-Predator-Gaming-Helios-PH315-54-99S6',
        '637683516026005964_acer-predator-helios-gaming-ph315-54-den-1.webp',
        '637683516029287187_acer-predator-helios-gaming-ph315-54-den-3.webp',
        '637683516031318532_acer-predator-helios-gaming-ph315-54-den-2.webp',
        '637683516027568465_acer-predator-helios-gaming-ph315-54-den-4.webp', 40990000, 119,
        'Acer Predator Helios 300 PH315-54-99S6 có sức mạnh khiến tất cả phải kinh ngạc với bộ vi xử lý Intel Core i9 11900H, giúp đáp ứng hiệu suất chơi game và khối lượng công việc khổng lồ. Bên cạnh đó là GPU RTX 3060 và màn hình QHD 165Hz, cho bạn trải nghiệm chơi game thực sự đỉnh cao.',
        2021, 'Acer', '15.6 inch, 2560 x 1440 Pixels, IPS, 165 Hz, Acer ComfyView LED-backlit', 'Intel core i7',
        '16 GB', 'NVIDIA', 'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (25, 1, 'Laptop Acer Nitro Gaming AN515-58-52SP i5 12500H/8GB/512GB/15.6FHD/NVIDIA GeForce RTX 3050 4GB/Win11',
        'Acer-Nitro-Gaming-AN515-58-52SP', '637817435466475076_acer-nitro-gaming-an515-58-den-1.webp',
        '637817435459912672_acer-nitro-gaming-an515-58-den-2.webp',
        '637817435465226004_acer-nitro-gaming-an515-58-den-3.webp',
        '637817435462881696_acer-nitro-gaming-an515-58-den-4.webp', 23990000, 120,
        'Dòng Nitro 5 được yêu thích của Acer nay đã xuất hiện phiên bản mới Tiger 2022. Acer Nitro 5 Tiger AN515-58-52SP được nâng cấp toàn diện về cả thiết kế và hiệu năng, đặc biệt là sức mạnh từ bộ vi xử lý Intel thế hệ thứ 12 hoàn toàn mới, sẽ cùng các game thủ vượt qua mọi giới hạn.',
        2022, 'Acer', '15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Acer ComfyView LED-backlit', 'Intel core i5', '8 GB',
        'NVIDIA', 'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (26, 1, 'Laptop Acer Nitro Gaming AN515-57-5669 i5 11400H/8GB/512GB SSD/Nvidia GTX1650 4GB/Win11',
        'Acer-Nitro-Gaming-AN515-57-5669', '637743875019403625_acer-nitro-gaming-an515-57-56xx-den-1.webp',
        '637743875019403625_acer-nitro-gaming-an515-57-56xx-den-2.webp',
        '637743875018934829_acer-nitro-gaming-an515-57-56xx-den-3.webp',
        '637743875018622318_acer-nitro-gaming-an515-57-56xx-den-4.webp', 19990000, 120,
        'Bền bỉ, tiết kiệm và sở hữu cấu hình miễn chê, Acer Nitro Gaming AN515-57-5669 là sự lựa chọn phù hợp cho các game thủ muốn tận hưởng những công nghệ mới nhất trong một mức giá bán dễ chịu.',
        2021, 'Acer', '15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Acer ComfyView LED-backlit', 'Intel core i5', '8 GB',
        'NVIDIA', 'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (27, 1, 'Laptop Acer Swift 3 SF314-511-55QE i5 1135G7/16GB/512GB SSD/Win11', 'Acer-Swift-3-SF314-511-55QE',
        '637784648681916953_acer-swift-3-sf314-511-bac-1.webp', '637784648681448154_acer-swift-3-sf314-511-bac-2.webp',
        '637784648681448154_acer-swift-3-sf314-511-bac-3.webp', '637784648681291910_acer-swift-3-sf314-511-bac-4.webp',
        19990000, 120,
        'Không chỉ mỏng nhẹ mà là siêu mỏng nhẹ, Acer Swift 3 SF314-511-55QE là một trong những chiếc laptop 14 inch di động nhất mà bạn từng thấy. Còn ấn tượng hơn nữa khi laptop vẫn tích hợp cấu hình cực khủng, cho bạn hoàn thành công việc ở năng suất cao.',
        2021, 'Acer', '14.0 inch, 1920 x 1080 Pixels, IPS, 60 Hz, Acer ComfyView Anti-glare LED-backlit',
        'Intel core i5', '16 GB', 'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (28, 1, 'MacBook Pro 13 2020 Touch Bar M1 512GB', 'MacBook-Pro-13-2020-Touch-Bar-M1-512GB',
        '637408000895334462_mbp-2020-m1-gray-1.webp', '637408000895490753_mbp-2020-m1-gray-2.webp',
        '637408000894865616_mbp-2020-m1-gray-4.webp', '637408000894865616_mbp-2020-m1-gray-3.webp', 30990000, 120,
        'Tốc độ và sức mạnh hoàn hảo trong một thân máy nhỏ gọn. MacBook Pro M1 13 inch 2020 Touch Bar mới với bộ vi xử lý Apple M1 cho bạn hiệu suất và thời lượng pin tuyệt vời nhất từ trước đến nay, mang đến hiệu năng chuyên nghiệp để hoàn thành những công việc chuyên nghiệp.',
        2020, 'Apple', '13.3 inch, 2560 x 1600 Pixels, IPS, IPS LCD LED Backlit, True Tone', 'Apple M1', '8 GB', 'M1',
        'SSD 512 GB', '', '', _binary '', '', '', NULL),
       (29, 1, 'MacBook Pro M2 2022 13 inch 8\'cpu\' 10GPU 8GB 512GB', 'MacBook-Pro-M2-2022',
        '637901935594127150_macbook-pro-m2-2022-xam-1.webp', '637901982830230338_macbook-pro-m2-2022-xam-3.webp',
        '1658484826131-mb-pro-m2-256-wh.jpg', '637901982829449243_macbook-pro-m2-2022-xam-2.webp', 35690000, 120,
        'Với sự giúp sức của chip M2, MacBook Pro 2022 trở nên chuyên nghiệp hơn bao giờ hết. Kết cấu nhỏ nhắn, thời lượng pin 20 giờ và hệ thống làm mát hiệu quả giúp sản phẩm duy trì hiệu suất cao trong thời gian dài. Màn hình Retina, \'camera\' FaceTime HD và micro studio cũng là điểm cộng đem đến trải nghiệm xuất sắc.',
        2022, 'Apple', '13.3 inch, 2560 x 1600 Pixels, 500 nits, Retina', 'Apple M2', '8 GB', 'M2', 'SSD 512 GB', '',
        '', _binary '', '', '', NULL),
       (30, 1, 'MacBook Pro 16\' 2021 M1 Pro Ram 32GB', 'MacBook-Pro-16\'-2021-M1-Pro-Ram-32GB',
        '637702682507677814_macbook-pro-16-2021-xam-2.webp', '637702682508615222_macbook-pro-16-2021-xam-1.webp',
        '637702682511584031_macbook-pro-16-2021-xam-4.webp', '637702682505958965_macbook-pro-16-2021-xam-3.webp',
        64990000, 120,
        'MacBook Pro 16 inch 2021 chính là dòng máy tính xách tay mạnh nhất thế giới hiện nay với sức mạnh tối thượng từ bộ vi xử lý M1 Pro. Phiên bản RAM 32GB thậm chí còn cho bạn làm được nhiều việc hơn thế, tất cả sẽ được hiển thị trên màn hình lớn 16 inch Liquid Retina XDR đẹp chưa từng thấy.',
        2021, 'Apple', '16.2 inch, 3456 x 2234 Pixels', 'Apple M1', '32 GB', 'M1', 'SSD 512 GB', '', '', _binary '',
        '', '', NULL),
       (31, 2, 'iPhone 14 Pro Max 128GB', 'iPhone-14-Pro-Max-128GB', '638129176877496345_iphone-14promax-1.webp',
        '638139579497269864_iphone-14pro-den-5.webp', '638129177601274543_iphone-14prm-den-1.webp',
        '638129176877496345_iphone-14promax-1.webp', 27990000, 15,
        'iPhone 14 Pro Max đem đến những trải nghiệm không thể tìm thấy trên mọi thế hệ iPhone trước đó với màu Tím Deep Purple sang trọng, \'camera\' 48MP lần đầu xuất hiện, chip A16 Bionic và màn hình “viên thuốc” Dynamic Island linh hoạt, nịnh mắt.',
        2022, 'Apple', '06.7 inch, Super Retina XDR, 2796 x 1290 Pixels', '', '', '', '', '48.0 MP + 12.0 MP',
        '6000 mah', _binary '', '', '', NULL),
       (32, 2, 'iPhone 13 Pro Max 256GB', 'iPhone-13-Pro-Max-256GB', '637859751770980691_iphone-13-pro-max-xam-1.webp',
        '637859751770824458_iphone-13-pro-max-xam-2.webp', '637859751770824458_iphone-13-pro-max-xam-3.webp',
        '637859752824294356_iphone-13-pro-max-xam-4.webp', 28490000, 115,
        'iPhone 13 Pro Max xứng đáng là một chiếc iPhone lớn nhất, mạnh mẽ nhất và có thời lượng pin dài nhất từ trước đến nay sẽ cho bạn trải nghiệm tuyệt vời, từ những tác vụ bình thường cho đến các ứng dụng chuyên nghiệp.',
        2022, 'Apple', '06.7 inch, OLED, Super Retina XDR, 2778 x 1284 Pixels', '', '', '', '', '48.0 MP + 12.0 MP',
        '4352 mah', _binary '', '', '', 4),
       (33, 2, 'iPhone 12 64GB', 'iPhone-12-64GB', '638059237853240136_iphone-12-xanhla-1.webp',
        '638059237853240136_iphone-12-xanhla-4.webp', '638059237853083337_iphone-12-xanhla-2.webp',
        '638059237852920204_iphone-12-xanhla-5.webp', 15599000, 121,
        'iPhone 12 ra mắt với vai trò mở ra một kỷ nguyên hoàn toàn mới. Tốc độ mạng 5G siêu tốc, bộ vi xử lý A14 Bionic nhanh nhất thế giới smartphone, màn hình OLED tràn cạnh tuyệt đẹp và camera siêu chụp đêm, tất cả đều có mặt trên iPhone 12.',
        2022, 'Apple', '06.1 inch, OLED, Super Retina XDR, 2532 x 1170 Pixels', '', '8 GB', '', '', '', '2815 mah',
        _binary '', '', '', NULL),
       (34, 2, 'iPhone 14 Pro 128GB', 'iPhone-14-Pro-128GB', '638054218956629637_ip-14-pro-max-den-1.webp',
        '638139579497269864_iphone-14pro-den-5.webp', '638129177601274543_iphone-14prm-den-1.webp',
        '638139579498434541_iphone-14pro-den-4.webp', 25490000, 120,
        'iPhone 14 Pro hội tụ những tính năng đẳng cấp nhất với thiết kế mới, bộ vi xử lý Apple A16 Bionic với sức mạnh chưa từng thấy, camera 48MP nâng cấp vượt trội, màn hình Always-On đầy thú vị và hơn thế nữa. ',
        2022, 'Apple', '06.1 inch, Super Retina XDR, 2556 x 1179 Pixels', '', '', '', '', '', '4000 mah', _binary '',
        '', '', NULL),
       (35, 2, 'iPhone 14 Plus 128GB', 'iPhone-14-Plus-128GB', '638127667776112348_iphone-14-plus-1.webp',
        '638138921570765389_iphone-14-do-4.webp', '638138921565687118_iphone-14-do-7.webp',
        '638127667775949738_iphone-14-plus-2.webp', 22990000, 120,
        'Sự hấp dẫn của chiếc iPhone thế hệ mới 2022 với màn hình lớn, pin xuất sắc nhất từ trước đến nay, chụp đêm ấn tượng và loạt công nghệ đỉnh cao, điện thoại iPhone 14 Plus mang người dùng vào những trải nghiệm di động tiên tiến, sẵn sàng cho cuộc sống năng động, thông minh và tiện lợi.',
        2022, 'Apple', '06.7 inch, Super Retina XDR, 2778 x 1284 Pixels', '', '', '', '', '', '4250 mah', _binary '',
        '', '', NULL),
       (36, 2, 'Samsung Galaxy Z Fold4 5G 256GB', 'Samsung-Galaxy-Z-Fold4-5G-256GB',
        '637957721237564298_samsung-galaxy-z-fold4-kem-1.webp', '637957721237720533_samsung-galaxy-z-fold4-kem-2.webp',
        '637957721238501939_samsung-galaxy-z-fold4-kem-3.webp', '637957721235689301_samsung-galaxy-z-fold4-kem-4.webp',
        37990000, 120,
        'Với Samsung Galaxy Z Fold4, smartphone màn hình gập đã trở nên thân thiện, tiện dụng và bền bỉ hơn rất nhiều. Những cải tiến thiết thực trong từng khía cạnh giúp sản phẩm biến hóa linh hoạt hơn và đem lại những trải nghiệm không thể tìm thấy ở đâu khác.',
        2022, 'Samsung', '07.6 inch, Phụ: 6.2 inch, Dynamic AMOLED 2X, WXGA+, 1768 x 2208 Pixels', '', '', '', '', '',
        '4250 mah', _binary '', '', '', 2),
       (37, 2, 'Samsung Galaxy Z Flip4 5G 128GB', 'Samsung-Galaxy-Z-Flip4-5G-128GB',
        '637957658354316100_samsung-galaxy-z-flip4-tim-1.webp', '637957703261967280_samsung-galaxy-z-flip4-tim-2.webp',
        '637957703260561099_samsung-galaxy-z-flip4-tim-3.webp', '637957703262279890_samsung-galaxy-z-flip4-tim-4.webp',
        20990000, 121,
        'Nhỏ gọn và tinh tế, Samsung Galaxy Z Flip4 là chiếc smartphone sinh ra dành cho các tín đồ thời trang. Cơ chế gập duyên dáng, bộ màu sắc nhẹ nhàng và loạt chức năng quay chụp sẽ làm say lòng những người yêu cái đẹp.',
        2022, 'Samsung', '06.7 inch, Phụ: 1.9 inch, Dynamic AMOLED, FHD+, 1080 x 2636 Pixels', '', '', '', '', '',
        '3700 mah', _binary '', '', '', NULL),
       (38, 2, 'Samsung Galaxy S23 Ultra 5G 256GB', 'Samsung-Galaxy-S23-Ultra-5G-256GB',
        '638108941585078058_samsung-galaxy-s23-ultra-den-1.webp',
        '638122552532122734_samsung-galaxy-s23-ultra-den-2.webp',
        '638122552532435910_samsung-galaxy-s23-ultra-den-4.webp',
        '638122552531139428_samsung-galaxy-s23-ultra-den-3.webp', 26990000, 116,
        'Tự hào là điện thoại Galaxy đầu tiên sở hữu cảm biến tuyệt đỉnh 200MP, Samsung Galaxy S23 Ultra đưa người dùng vào không gian nhiếp ảnh tân tiến vượt trội. Sức mạnh còn bùng nổ với vi xử lý Snapdragon mạnh nhất cho cách mạng hiệu năng gaming đột phá. Tất cả được gói gọn trong thiết kế cao cấp và bền vững cho hiện tại và tương lai.',
        2022, 'Samsung', '06.8 inch, Dynamic AMOLED 2X, QHD+, 1440 x 3088 Pixels', '', '', '', '', '', '5000 mah',
        _binary '', '', '', NULL),
       (39, 2, 'Samsung Galaxy S22 Bora Purple 5G', 'Samsung-Galaxy-S22-Bora-Purple-5G',
        '637941779749495327_samsung-galaxy-s22-bora-purple-1.webp',
        '637941779748870189_samsung-galaxy-s22-bora-purple-2.webp',
        '637941779746995258_samsung-galaxy-s22-bora-purple-3.webp',
        '637941779749182644_samsung-galaxy-s22-bora-purple-4.webp', 14990000, 120,
        'Bật nét kiêu kỳ, sẵn sàng trendy với phiên bản Samsung Galaxy S22 màu tím (Bora Purple), bạn sẽ trở nên thật thời thượng, ấn tượng và cá tính. Đồng hành đó là những công nghệ tốt nhất của Samsung từ hiệu năng Snapdragon 8 Gen 1, màn hình cao cấp cho đến hệ thống \'camera\' chuyên nghiệp.',
        2022, 'Samsung', '06.1 inch, Dynamic AMOLED 2X, FHD+, 1080 x 2340 Pixels', '', '', '', '', '', '3700 mah',
        _binary '', '', '', 2),
       (40, 2, 'Samsung Galaxy A73 5G', 'Samsung-Galaxy-A73-5G', '637849354241818312_samsung-galaxy-a73-xanh-1.webp',
        '637849354241818312_samsung-galaxy-a73-xanh-2.webp', '637849354241974615_samsung-galaxy-a73-xanh-4.webp',
        '637849354241193441_samsung-galaxy-a73-xanh-3.webp', 10990000, 120,
        'Trải nghiệm hệ thống \'camera\' 108MP đầu tiên trên thế hệ Galaxy A, hiệu năng cực mạnh Snapdragon 778G, màn hình 120Hz mượt mà và kết nối 5G siêu tốc, Samsung Galaxy A73 5G đã sẵn sàng đưa bạn vào thế giới công nghệ đỉnh cao, giúp cuộc sống tiện lợi hơn bao giờ.',
        2022, 'Samsung', '06.7 inch, Super AMOLED, FHD+, 1080 x 2400 Pixels', '', '', '', '', '', '3700 mah',
        _binary '', '', '', 2),
       (41, 2, 'OPPO Reno8 T 5G 128GB', 'OPPO-Reno8-T-5G-128GB', '638109492842561801_oppo-reno8-t-5g-vang-5.webp',
        '638109492829105392_oppo-reno8-t-5g-vang-3.webp', '638106988530845194_oppo-reno8-t-5g-vang-1.webp',
        '638109492832529871_oppo-reno8-t-5g-vang-2.webp', 9990000, 120,
        'Trọn vẹn từng trải nghiệm trên OPPO Reno8 T 5G với nâng cấp toàn diện từ thế hệ chân dung 108MP, màn hình cong 120Hz tuyệt đẹp đến sạc nhanh Super VOOCTM 67W. Bạn sẽ bất ngờ với những gì OPPO Reno8 T 5G mang đến – một siêu phẩm trong tầm giá.',
        2022, 'OPPO', '06.7 inch, AMOLED, FHD+, 1080 x 2412 Pixels', '', '', '', '', '', '4800 mah', _binary '', '',
        '', 2),
       (42, 2, 'OPPO A77s 8GB-128GB', 'OPPO-A77s-8GB-128GB', '638005897366049263_oppo-a77s-den-5.webp',
        '638005897365111890_oppo-a77s-den-4.webp', '638005897365893263_oppo-a77s-den-2.webp',
        '638005672570755785_oppo-a77s-den-3.webp', 6290000, 120,
        'Cuộc sống trở nên thú vị hơn khi có người bạn đồng hành trẻ trung, năng động – OPPO A77s. Chiếc điện thoại tầm trung với thiết kế hiện đại, tươi trẻ đi cùng những công nghệ ấn tượng như \'camera\' kép AI 50MP, sạc nhanh 33W, Snapdragon 680 và hỗ trợ mở rộng RAM.',
        2022, 'OPPO', '06.56 inch, LCD, HD+, 720 x 1612 Pixels', '', '', '', '', '', '5000 mah', _binary '', '', '',
        NULL),
       (43, 2, 'OPPO A57 4GB-128GB', 'OPPO-A57-4GB-128GB', '637919437068621162_oppo-a57-den-3.webp',
        '637998708770319266_oppo-a57-den-4.webp', '637910569084038088_oppo-a57-den-5.webp',
        '637998708771256795_oppo-a57-den-2.webp', 4290000, 120,
        'Chào đón thế hệ OPPO A mới với diện mạo trẻ trung, năng động – OPPO A57 sẽ đồng hành cùng bạn trong xu hướng thiết kế thời thượng năm 2022. Điện thoại còn tiện lợi với viên pin lớn 5.000mAh và công nghệ sạc nhanh 33W vượt trội trong phân khúc, giúp bạn luôn có kết nối liền mạch.',
        2022, 'OPPO', '06.56 inch, LCD, HD+, 720 x 1612 Pixels', '', '', '', '', '', '5000 mah', _binary '', '', '',
        NULL),
       (44, 2, 'OPPO A17 4GB-64GB', 'OPPO-A17-4GB-64GB', '638016267842487404_oppo-a17-den-1.webp',
        '638016278092104929_oppo-a17-den-2.webp', '638016278092261070_oppo-a17-den-3.webp',
        '638016278093338357_oppo-a17-den-4.webp', 3790000, 120,
        'Để mỗi trải nghiệm đều ấn tượng, OPPO đã cẩn thận trang bị loạt công nghệ vượt trội trong tầm giá. Một thiết kế nổi bật bởi chất liệu da độc đáo, trẻ trung, hệ thống \'camera\' 50MP, viên pin sử dụng thoải mái cả ngày dài. Đồng hành với trải nghiệm mượt mà, OPPO A17 còn hỗ trợ mở rộng RAM hữu ích.',
        2022, 'OPPO', '6.56 inch, LCD, HD+, 720 x 1612 Pixels', '', '', '', '', '', '5000 mah', _binary '', '', '',
        NULL),
       (45, 2, 'OPPO Find X5 Pro 12GB - 256GB', 'OPPO-Find-X5-Pro-12GB-256GB',
        '637982295035080684_oppo-find-x5-pro-trang-5.webp', '637982295033986858_oppo-find-x5-pro-trang-3.webp',
        '637982295031330586_oppo-find-x5-pro-trang-2.webp', '637982295033674392_oppo-find-x5-pro-trang-4.webp',
        24990000, 120,
        'Hội tụ những tinh hoa công nghệ  OPPO Find X5 Pro đưa bạn đến trải nghiệm vượt trội từ hiệu năng Snapdragon 8 Gen 1, sạc nhanh 80W, cảm biến Sony cao cấp đến thiết kế độc đáo, điện thoại phô diễn trọn bộ đột phá, khẳng định sức mạnh của chiếc flagship đầu bảng.',
        2022, 'OPPO', '06.7 inch, AMOLED, QHD+, 1440 x 3216 Pixels', '', '', '', '', '', '5000 mah', _binary '', '',
        '', NULL),
       (46, 2, 'Xiaomi Redmi 10 4GB-128GB 2021', 'Xiaomi-Redmi-10-4GB-128GB-2021',
        '637649622568371405_xiaomi-redmi-10-trang-1.webp', '637649622571652648_xiaomi-redmi-10-trang-2.webp',
        '637649622572433917_xiaomi-redmi-10-trang-3.webp', '637649622572746346_xiaomi-redmi-10-trang-4.webp', 3790000,
        120,
        'Dòng điện thoại Redmi yêu thích của bạn đã quay trở lại, Redmi 10 với bộ tứ \'camera\' 50MP AI đột phá, màn hình 90Hz siêu mượt và cấu hình “phá đảo” trong tầm giá, chắc chắn sẽ tiếp tục là lựa chọn hàng đầu ở phân khúc smartphone giá rẻ.',
        2022, 'Redmi', '06.5 inch, IPS LCD, FHD+, 1080 x 2400 Pixels', '', '', '', '', '', '5000 mah', _binary '', '',
        '', NULL),
       (47, 2, 'Xiaomi 11T Pro 5G 12GB - 256GB', 'Xiaomi-11T-Pro-5G-12GB-256GB',
        '637692066784791588_xiaomi-11t-pro-xam-1.webp', '637692066784479155_xiaomi-11t-pro-xam-2.webp',
        '637692066784322804_xiaomi-11t-pro-xam-3.webp', '637692066784791588_xiaomi-11t-pro-xam-4.webp', 10990000, 120,
        'Xiaomi 11T Pro là chiếc điện thoại cao cấp có mức giá tốt nhất hiện nay. Bạn sẽ nhận được \'camera\' chuyên nghiệp 108MP, sạc siêu nhanh 120W, màn hình AMOLED 120Hz mượt mà hỗ trợ Dolby Vision và bộ vi xử lý đầu bảng Snapdragon 888, một loạt những tính năng đỉnh cao sẽ mang tới trải nghiệm thú vị hơn bao giờ hết.',
        2022, 'Redmi', '05.67 inch, AMOLED, FHD+, 1080 x 2400 Pixels', '', '', '', '', '', '5000 mah', _binary '', '',
        '', 5),
       (48, 2, 'Xiaomi Redmi 10 5G 4GB-64GB', 'Lenovo-Gaming-IdeaPad-3-15IAH7',
        '637974781898407535_xiaomi-redmi-10-den-4.webp', '637974781895439247_xiaomi-redmi-10-den-2.webp',
        '637974781895126878_xiaomi-redmi-10-den-1.webp', '637974781891688457_xiaomi-redmi-10-den-3.webp', 3790000, 120,
        'Để nâng tầm trải nghiệm cho người dùng giá rẻ, Xiaomi đã làm điều bất ngờ với phiên bản Redmi 10 của họ. Redmi 10 5G sẽ đến với nhiều điểm cải tiến ấn tượng nhưng mức giá bán ra cũng thuộc top những chiếc smartphone 5G hiện nay. Không chỉ ấn tượng về giá mà mọi thứ sẽ được tổng hòa và tạo ra chiếc điện thoại tiềm năng này.',
        2022, 'Redmi', '06.58 inch, IPS LCD, FHD+, 1080 x 2408 Pixels', '', '', '', '', '', '5000 mah', _binary '', '',
        '', 5),
       (49, 2, 'Xiaomi Redmi 10C 4GB - 128GB', 'Xiaomi-Redmi-10C-4GB-128GB',
        '637830415222601150_xiaomi-redmi-10c-4gb-128gb-xanh-1.webp',
        '637830415224476121_xiaomi-redmi-10c-4gb-128gb-xanh-3.webp',
        '637830415222444875_xiaomi-redmi-10c-4gb-128gb-xanh-2.webp',
        '637830415224788599_xiaomi-redmi-10c-4gb-128gb-xanh-4.webp', 2890000, 120,
        'Sự lựa chọn xuất sắc nhất phân khúc đã xuất hiện, Xiaomi Redmi 10C được trang bị chip Snapdragon 680 6nm nhanh nhạy, có \'camera\' chính 50MP, sở hữu viên pin 5.000 mAh hỗ trợ sạc 18W đi kèm màn hình 6.71 inch và loa ngoài mạnh mẽ sống động.',
        2022, 'Redmi', '06.71 inch, IPS, HD+, 720 x 1560 Pixels', '', '', '', '', '', '5000 mah', _binary '', '', '',
        5),
       (50, 2, 'Xiaomi Redmi 12C 4GB - 64GB', 'Xiaomi-Redmi-12C-4GB-64GB',
        '638138646675311035_xiaomi-redmi-12c-xam-1.webp', '638138646675115995_xiaomi-redmi-12c-xam-3.webp',
        '638138646674864025_xiaomi-redmi-12c-xam-2.webp', '638138646674627859_xiaomi-redmi-12c-xam-4.webp', 3590000, 52,
        'Là sản phẩm giá rẻ nhưng Redmi 12C lại sở hữu nhiều công nghệ mới và mạnh mẽ, giúp cho người dùng phổ thông dễ dàng hơn trong việc tiếp cận với thế giới công nghệ hiện nay. Với hiệu suất cao, thời lượng pin cao, cụm \'camera\' sắc nét cùng giá bán vô cùng hấp dẫn, Redmi 12C dự kiến sẽ khuấy đảo thị trường phân khúc trên dưới 3 triệu đồng. ',
        2022, 'Redmi', '15.6 inch, IPS, HD+, 720 x 1560 Pixels', '', '', '', '', '', '5000 mah', _binary '', '', '',
        5),
       (51, 3, 'Samsung Galaxy Tab S6 Lite 2022', 'Samsung-Galaxy-Tab-S6-Lite-2022',
        '637931279963004703_samsung-galaxy-tab-s6-lite-2022-den-6.webp',
        '637931279962692192_samsung-galaxy-tab-s6-lite-2022-den-9.webp', '637232548612897625_ss-tab-s6-lite-xam-5.webp',
        '637931279962692192_samsung-galaxy-tab-s6-lite-2022-den-8.webp', 8990000, 119,
        'Gặp gỡ Samsung Galaxy Tab S6 Lite 2022 - phiên bản mới với sự nâng cấp mạnh về hiệu năng Snapdragon 720G, cho mọi tác vụ mượt mà, đa nhiệm hoàn hảo từ học tập, làm việc đến giải trí. Sự hỗ trợ của bút S-Pen còn là người bạn tuyệt vời để thỏa thích sáng tạo, tăng hiệu suất công việc.',
        2022, 'Samsung', '10.4 inch, TFT LCD, FHD, 1200 x 2000 Pixels', '', '', '', '', '', '', _binary '', '',
        '64 gb', 5),
       (52, 3, 'iPad Gen 9 2021 10.2 inch WiFi 64GB', 'iPad-Gen-9-2021-10.2-inch-WiFi-64GB',
        '638059477189671553_iPad-Gen-9-bac--6.webp', '638058485549424901_iPad Gen 9 bac -3.webp',
        '638058485549581174_iPad Gen 9 bac -1.webp', '638058485550049893_iPad Gen 9 bac -4.webp', 7990000, 123,
        'Mạnh mẽ, dễ dàng sử dụng, màn hình lớn, đặc biệt được bán ở mức giá rẻ, iPad Gen 9 10.2 2021 là chiếc máy tính bảng tuyệt vời cho mọi nhu cầu cơ bản, từ giải trí, sáng tạo, làm việc, kết nối và hơn thế nữa.',
        2022, 'Apple', '10.2 inch, IPS LCD, Liquid Retina HD, 2160 x 1620 Pixels', '', '', '', '', '', '', _binary '',
        '', '64 gb', 5),
       (53, 3, 'iPad mini 6 2021 8.3 inch WiFi 64GB', 'Lenovo-Gaming-IdeaPad-3-15IAH78',
        '638059319531382608_ipad-mini-6-wifi-xam-1.webp', '638059319531682592_ipad-mini-6-wifi-xam-2.webp',
        '638059319531382608_ipad-mini-6-wifi-xam-4.webp', '638059319531657137_ipad-mini-6-wifi-xam-3.webp', 12490000,
        120,
        'Sức mạnh khủng khiếp trong một thiết kế nhỏ gọn đáng yêu, iPad Mini 6 2021 đánh dấu sự trở lại mạnh mẽ của dòng iPad mini luôn được người dùng yêu thích, nơi bạn được tận hưởng ma thuật bên trong chiếc máy tính bảng tuyệt đẹp, hiệu suất đỉnh cao và hỗ trợ bút cảm ứng Apple Pencil.',
        2022, 'Apple', '8.3 inch, IPS LCD, Liquid Retina HD, 2048 x 1536 Pixels', '', '', '', '', '', '', _binary '',
        '', '64 gb', 5),
       (54, 3, 'Samsung Galaxy Tab A7 Lite', 'Samsung-Galaxy-Tab-A7-Lite',
        '637577064561995165_ss-tab-a7-lite-xam-1.webp', '637577064561442620_ss-tab-a7-lite-xam-2.webp',
        '637577064561286317_ss-tab-a7-lite-xam-3.webp', '637577064562533153_ss-tab-a7-lite-xam-5.webp', 4490000, 122,
        'Với thiết kế siêu mỏng, tính năng giải trí hấp dẫn và hiệu năng vượt trội, Samsung Galaxy Tab A7 Lite sẽ là người bạn đồng hành đầy phong cách dành cho cuộc sống của bạn. Tha hồ học hỏi, khám phá, kết nối trong niềm cảm hứng của công nghệ.',
        2022, 'Samsung', '8.7 inch, TFT LCD, HD+, 1340 x 800 Pixels', '', '', '', '', '', '', _binary '', '', '64 gb',
        5),
       (55, 3, 'Samsung Galaxy Tab S7 FE', 'Samsung-Galaxy-Tab-S7-FE',
        '637607331812565519_samsung-galaxy-tab-s7-fe-den-0.webp',
        '637607331811940520_samsung-galaxy-tab-s7-fe-den-1.webp',
        '637607331811315499_samsung-galaxy-tab-s7-fe-den-2.webp',
        '637607331808659176_samsung-galaxy-tab-s7-fe-den-3.webp', 13990000, 120,
        'Một chiếc máy tính bảng màn hình lớn sẽ giúp mọi trải nghiệm dù là học hay chơi đều trở nên vô cùng hấp dẫn. Samsung Galaxy Tab S7 FE với hiệu năng tuyệt đỉnh và bút S Pen chuyên nghiệp sẽ luôn mang đến sự thú vị cho bạn.',
        2022, 'Samsung', '12.4 inch, TFT LCD, WQXGA, 2560 x 1600 Pixels', '', '', '', '', '', '', _binary '', '',
        '64 gb', NULL),
       (56, 3, 'Samsung Galaxy Tab A8 2022', 'Samsung-Galaxy-Tab-A8-2022',
        '637772299858648454_samsung-galaxy-tab-a8-xam-4.webp', '637772299857867551_samsung-galaxy-tab-a8-xam-2.webp',
        '637772299857554683_samsung-galaxy-tab-a8-xam-3.webp', '637772299857867551_samsung-galaxy-tab-a8-xam-1.webp',
        6990000, 114,
        'Samsung Galaxy Tab A8 2022 đem đến giải pháp học tập, làm việc và giải trí hiệu quả trên màn hình rộng rãi 10.5 inch. Sản phẩm khoác lên thiết kế thanh lịch tối giản, sở hữu hệ thống âm thanh Dolby Atmos sống động, ghi nhận cấu hình ấn tượng trong tầm giá và đem tới loạt tính năng tiện dụng nâng cao trải nghiệm người dùng.',
        2022, 'Samsung', '10.5 inch, TFT LCD, WUXGA, 1920 x 1200 Pixels', '', '', '', '', '', '', _binary '', '',
        '64 gb', NULL),
       (57, 3, 'Samsung Galaxy Tab S8 5G', 'Samsung-Galaxy-Tab-S8-5G',
        '637800820554424975_samsung-galaxy-tab-s8-xam-1.webp', '637800820555050150_samsung-galaxy-tab-s8-xam-2.webp',
        '637800820555362608_samsung-galaxy-tab-s8-xam-4.webp', '637800820555362608_samsung-galaxy-tab-s8-xam-5.webp',
        20990000, 120,
        'Với Samsung Galaxy Tab S8, bạn sẽ thoải mái tận hưởng những khung hình mượt mà trên màn hình 120Hz, trải nghiệm loạt ứng dụng đòi hỏi cao ở hiệu suất nhờ chip Snapdragon 8 Gen 1, đồng thời nâng cao tính chuyên nghiệp khi làm việc với sự hỗ trợ của bút S-Pen.',
        2022, 'Samsung', '11.0 inch, TFT LCD, WQHD+, 2560 x 1600 Pixels', '', '', '', '', '', '', _binary '', '',
        '128 gb', NULL),
       (58, 3, 'iPad Pro 11 2021 M1 Wi-Fi 1TB', 'iPad-Pro-11-2021-M1-Wi-Fi-1TB',
        '638058527736303163_ipad-pro-11-m1-wifi-bac-1.webp', '638058527735827543_ipad-pro-11-m1-wifi-bac-2.webp',
        '638058527735508214_ipad-pro-11-m1-wifi-bac-3.webp', '638058527735983795_ipad-pro-11-m1-wifi-bac-5.webp',
        42990000, 119,
        'Dành cho những người thực sự chuyên nghiệp, iPad Pro 11 inch 2021 M1 phiên bản bộ nhớ tối đa lên đến 2TB cho khả năng lưu trữ gần như vô hạn. Bên cạnh đó là sức mạnh của bộ vi xử lý Apple M1 và hệ thống \'camera\' cao cấp đang chờ đón bạn.',
        2022, 'Apple', '11 inch, IPS LCD, Liquid Retina HD, 2388 x 1668 Pixels', '', '', '', '', '', '', _binary '',
        '', '512 gb', NULL),
       (59, 3, 'Samsung Galaxy Tab S8 Ultra 5G', 'Samsung-Galaxy-Tab-S8-Ultra-5G',
        '637884897849833687_samsung-galaxy-tab-s8-ultra-2.webp',
        '637884897848739858_samsung-galaxy-tab-s8-ultra-5.webp',
        '637884897849677473_samsung-galaxy-tab-s8-ultra-1.webp',
        '637884897848896178_samsung-galaxy-tab-s8-ultra-3.webp', 30990000, 120,
        'Trải nghiệm phiên bản tablet tuyệt vời nhất nhà Samsung - Galaxy Tab S8 Ultra, bạn sẽ thấy sự khác biệt của hiệu năng đầu bảng Snapdragon 8 Gen 1, thiết kế dẫn đầu xu hướng công nghệ và sự tiện lợi hoàn hảo của bút S-Pen thế hệ mới.',
        2022, 'Samsung', '14.0 inch, Super AMOLED, WQHD+, 2800 x 1752 Pixels', '', '', '', '', '', '', _binary '', '',
        '128 gb', NULL),
       (60, 3, 'iPad Air 5 2022 10.9 inch M1 WiFi 5G 64GB', 'iPad-Air-5-2022-10.9-inch-M1-WiFi-5G-64GB',
        '638058452662264686_ipad-air-5-wf-5g-vang-1.webp', '638058452662420873_ipad-air-5-wf-5g-vang-2.webp',
        '638058452688601459_ipad-air-5-wf-5g-vang-3.webp', '638058452889518721_ipad-air-5-wf-5g-xanh-5.webp', 17990000,
        120,
        'Với sự góp mặt của chip M1 siêu mạnh, iPad Air 5 Wifi 5G 2022 đánh dấu bước nhảy vọt về hiệu năng. Kết nối 5G nhanh nhạy và \'camera\' selfie 12MP Ultra Wide sẽ mang tới cho bạn trải nghiệm chưa từng có trên tất cả các mẫu iPad Air trước đó. Sản phẩm tương thích với Apple Pencil và bàn phím Magic Keyboard nhằm nâng cao hiệu suất làm việc.',
        2022, 'Apple', '10.9 inch, Liquid Retina HD, 2360 x 1640 Pixels', '', '', '', '', '', '', _binary '', '',
        '64 gb', NULL),
       (61, 3, 'Máy tính bảng Xiaomi Redmi Pad 3GB-64GB', 'Máy-tính-bảng-Xiaomi-Redmi-Pad-3GB-64GB',
        '638048985101984297_xiaomi-redmi-pad-xam-4.webp', '638048985101984297_xiaomi-redmi-pad-xam-2.webp',
        '638048985101666856_xiaomi-redmi-pad-xam-1.webp', '638048985101352420_xiaomi-redmi-pad-xam-3.webp', 5490000,
        120,
        'Chiếc Redmi Pad đầu tiên cuối cùng cũng được Xiaomi trình làng giới công nghệ, chiếc tablet này thừa hưởng những gì từng xuất hiện trên Xiaomi Pad kết hợp với một mức giá vô cùng phải chăng. Có Redmi Pad đa năng trong tay, niềm vui của bạn sẽ được nhân đôi, vượt ngoài mong đợi. ',
        2022, 'Xiaomi', '10.61 inch, IPS LCD, FHD, 1200 x 2000 Pixels', '', '', '', '', '', '', _binary '', '',
        '64 gb', NULL),
       (62, 3, 'Lenovo Tab M8-Gen 2', 'Lenovo-Tab-M8-Gen-2', '637618691429168075_lenovo-tab-m10-gen-2-xam-1.webp',
        '637618691429480426_lenovo-tab-m10-gen-2-xam-2.webp', '637618691429324107_lenovo-tab-m10-gen-2-xam-3.webp',
        '637618691429480426_lenovo-tab-m10-gen-2-xam-4.webp', 2290000, 120,
        'Lenovo Tab M8-Gen 2 là chiếc máy tính bảng đa dụng dành cho những ai muốn có được trải nghiệm thông minh trên màn hình lớn với mức chi phí hợp lý. Sản phẩm có không gian hiển thị rộng 8 inch độ phân giải 1280 x 800 pixels và sử dụng công nghệ âm thanh Dolby Audio. Thời lượng pin lên đến 18 giờ cho phép bạn sử dụng suốt cả ngày.',
        2022, 'Lenovo', '8.0 inch, HD, 1280 x 800 Pixels', '', '', '', '', '', '', _binary '', '', '32 gb', NULL),
       (63, 3, 'OPPO Pad Air ', 'OPPO-Pad-Air', '637953963685335528_oppo-pad-air-4.webp',
        '637953964748166251_oppo-pad-air-1.webp', '637953964743478927_oppo-pad-air-2.webp',
        '637953963684710392_oppo-pad-air-5.webp', 6690000, 120,
        'Sở hữu màn hình 2K siêu sắc nét, thân máy cực mỏng nhẹ, hệ thống âm thanh Dolby Atmos, viên pin khủng 7.100 mAh và chip xử lý Snapdragon 680, OPPO Pad Air đạt đến sự cân bằng hoàn hảo giữa nét thẩm mỹ và yếu tố công nghệ, trở thành một trong những mẫu tablet tầm trung lý tưởng nhất từ trước đến nay.',
        2022, 'OPPO', '10.36 inch, LCD, 2K, 1200 x 2000 Pixels', '', '', '', '', '', '', _binary '', '', '32 gb',
        NULL),
       (64, 3, 'Lenovo Tab M10 3GB-32GB', 'Lenovo-Tab-M10-3GB-32GB',
        '638046361536701393_lenovo-tab-m10-gen-3-xam-4.webp', '638046361537170967_lenovo-tab-m10-gen-3-xam-1.webp',
        '638046361535750788_lenovo-tab-m10-gen-3-xam-3.webp', '638046361536219624_lenovo-tab-m10-gen-3-xam-5.webp',
        4790000, 120,
        'Sở hữu màn hình 10.1 inch, viên pin xuất sắc và nằm ở phân khúc giá phải chăng, Lenovo Tab M10 Gen 3 là lựa chọn tốt cho những ai muốn tận hưởng hình ảnh rộng lớn với mức đầu tư vừa tầm. Giải trí, làm việc và học tập trên Tab M10, bạn sẽ có được trải nghiệm mà smartphone khó lòng có được.',
        2022, 'Lenovo', '10.1 inch Chính:, IPS Chính:, HD, 1920 x 1200 Pixels', '', '', '', '', '', '', _binary '', '',
        '32 gb', NULL),
       (65, 3, 'Lenovo Tab M10 64GB (Gen2)', 'Lenovo-Tab-M10-64GB-(Gen2)',
        '637618697975071623_lenovo-tab-m10-gen-2-xam-2.webp', '637618697974446411_lenovo-tab-m10-gen-2-xam-4.webp',
        '637618697974758910_lenovo-tab-m10-gen-2-xam-3.webp', '637618697975227700_lenovo-tab-m10-gen-2-xam-1.webp',
        4290000, 120,
        'Máy tính bảng Lenovo Tab M10 thế hệ hai là sự lựa chọn tuyệt vời nếu bạn muốn sắm cho trẻ một thiết bị vừa hữu ích vừa an toàn, được kiểm duyệt tốt về mặt nội dung và có giá bán rất vừa túi tiền.',
        2022, 'Lenovo', '10.1 inch, IPS, HD, 1280 x 800 Pixels', '', '', '', '', '', '', _binary '', '', '64 gb',
        NULL),
       (66, 3, 'Masstel Tab 10M 4G', 'Masstel-Tab-10M-4G',
        '637725810554462380_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-1.webp',
        '637725810559931216_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-3.webp',
        '637725810559931216_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-2.webp',
        '637725810551806112_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-4.webp', 3490000, 120,
        'Sở hữu cấu hình xuất sắc trong tầm giá và được trang bị hệ điều hành Android 11 thế hệ mới, máy tính bảng Masstel Tab 10M 4G là sự lựa chọn tuyệt vời nhất trong phân khúc giá rẻ khi ghi nhận dung lượng pin khủng 6.000 mAh. Màn hình rộng rãi chuẩn HD sẽ giúp ích rất nhiều cho bạn trong quá trình giải trí hoặc học tập, họp hành online.',
        2022, 'Masstel', '10.1 inch, IPS, HD, 1280 x 800 Pixels', '', '', '', '', '', '', _binary '', '', '64 gb',
        NULL),
       (67, 4, 'PC E-Power Office 12 Core i3 10105 3.7 GHz - 4.4 GHz / 8GB / 256GB / 250W', 'PC E-Power Office 12',
        '638096554107607142_00854280-E-Power Office 17-1.webp', '638096554115373578_00854280-E-Power Office 17-3.webp',
        '638096554108178257_00854280-E-Power Office 17-2.webp', '638096554165608616_00854280-E-Power Office 17-4.webp',
        6990000, 119,
        'Với mức giá rẻ đến bất ngờ, PC E-Power Office 12 vẫn sở hữu cấu hình mạnh mẽ với bộ vi xử lý Intel Core i3 10105 cùng 8GB RAM và 240GB SSD tốc độ cao. Hơn nữa, sản phẩm còn tặng kèm bộ chuột, bàn phím và USB Wi-Fi, giúp bạn làm việc vô cùng tiện lợi, dễ dàng.',
        2022, 'E-Power', '', 'Intel core i3', '8 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng',
        '', NULL),
       (68, 4, 'PC E-Power Office 15 Core i5 10400 2.9 GHz - 4.5 GHz / 16GB / 256GB / 400W', 'PC E-Power Office 15',
        '68(1).webp', '68(2).webp', '638096554165608616_00854280-E-Power Office 17-4.webp',
        '638096554113216539_00854272 E-Power Office 15.webp', 8990000, 112,
        'Không cần bỏ ra số tiền lớn, bạn vẫn có được case máy tính văn phòng vô cùng mạnh mẽ với vi xử lý Intel Core i5 thế hệ thứ 10, dung lượng RAM lớn 16GB và ổ SSD tốc độ cao. PC E-Power Office 15 thích hợp để xử lý mọi công việc từ tác vụ thường ngày cho đến những ứng dụng nặng đòi hỏi nhiều về phần cứng. Đặc biệt, sản phẩm còn được tặng bộ chuột, bàn phím và USB Wi-Fi đi kèm trong hộp, giúp trải nghiệm trở nên dễ dàng hơn bao giờ hết.',
        2022, 'E-Power', '', 'Intel core i5', '16 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '',
        'PC Văn phòng', '', 3),
       (69, 4, 'PC E-Power Office 16 Core i5 11400 2.6 GHz - 4.4 GHz / 8GB / 256GB / 400W', 'PC E-Power Office 16',
        '638096554115373578_00854280-E-Power Office 17-3.webp', '638096554107607142_00854280-E-Power Office 17-1.webp',
        '638096554108178257_00854280-E-Power Office 17-2.webp', '638096554171176189_00854280-E-Power Office 17-5.webp',
        8790000, 114,
        'PC E-Power Office 16 nổi bật với sức mạnh ấn tượng từ bộ vi xử lý Intel Core i5 11400 trong tầm giá chỉ 10 triệu đồng. Ngoài ra, bạn có thể sử dụng case máy tính ngay lập tức mà không cần mua thêm phụ kiện với bộ bàn phím, chuột, USB WiFi tiện ích đi kèm.',
        2022, 'E-Power', '', 'Intel core i5', '8 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng',
        '', 4),
       (70, 4, 'PC Gaming E-Power F1650 i5 10400F/8GB/256GB/600W/GeForce GTX 1650', 'PC Gaming E-Power F1650',
        '638041282329466097_HASP-EPOWER-F1650-3.webp', '638041282329466097_HASP-EPOWER-F1650-2.webp',
        '638041282331497383_HASP-EPOWER-F1650-4.webp', '638041282332409521_HASP-EPOWER-F1650-8.webp', 13290000, 120,
        'PC Gaming E-Power F1650 là case máy tính chơi game nhỏ gọn, giá tốt, cấu hình cao trong tầm giá. Bộ vi xử lý Intel Core i5 10400F kết hợp cùng card đồ họa GTX 1650 đủ để chơi tốt các game Esports và trải nghiệm một số game AAA phổ biến.',
        2022, 'E-Power', '', 'Intel core i5', '8 GB', 'NVIDIA', 'SSD 256 GB', '', '', _binary '', 'PC Gaming', '', 2),
       (71, 4, 'PC Gaming E-Power G1650 i3 10100F/8GB/256GB/500W/GeForce GTX 1650', 'PC Gaming E-Power G1650',
        '638131068638756332_pc-gaming-e-power-g1650-i3-10100f-500w-1.webp',
        '638131068638340692_pc-gaming-e-power-g1650-i3-10100f-500w-3.webp',
        '638131068637976057_pc-gaming-e-power-g1650-i3-10100f-500w-2.webp',
        '638131068637567604_pc-gaming-e-power-g1650-i3-10100f-500w-5.webp', 10490000, 120,
        'Bạn cần một case máy tính “chiến game” mạnh mẽ giá tốt, cùng khả năng nâng cấp để sử dụng lâu dài, PC Gaming E-Power G1650 chính là một sản phẩm như vậy. Với bộ vi xử lý Intel Core i3 10100F, card đồ họa GTX 1650 và SSD NVMe tốc độ vượt trội, PC Gaming E-Power G1650 đủ để đáp ứng nhu cầu chơi game Full HD xuất sắc.',
        2022, 'E-Power', '', 'Intel core i3', '8 GB', 'NVIDIA', 'SSD 256 GB', '', '', _binary '', 'PC Gaming', '', 6),
       (72, 4, 'PC Gaming E-Power G1660ti i5 10400F/8GB/250GB/600W/GeForce GTX 1660 Ti', 'PC Gaming E-Power G1660ti',
        '638131068638756332_pc-gaming-e-power-g1650-i3-10100f-500w-1.jpg',
        '638131068638648273_pc-gaming-e-power-g1650-i3-10100f-500w-4.jpg',
        '638131068638340692_pc-gaming-e-power-g1650-i3-10100f-500w-3.jpg',
        '638131068637976057_pc-gaming-e-power-g1650-i3-10100f-500w-2.jpg', 14790000, 112,
        'Bạn cần một case máy tính chơi game thật sự mạnh để chiến các game AAA với thiết lập đồ họa Ultra nhưng vẫn phải có giá tốt, hợp túi tiền. PC Gaming E-Power G1660ti chính là điều bạn đang tìm kiếm với sự kết hợp tuyệt vời của Intel Core i5 10400F, GTX 1660 Ti và SSD NVMe siêu nhanh.',
        2022, 'E-Power', '', 'Intel core i5', '8 GB', 'NVIDIA', 'SSD 256 GB', '', '', _binary '', 'PC Gaming', '', 8),
       (73, 4, 'PC Gaming E-Power i5G11 - 3060Ti i5 11400F/16GB/250GB/650W/RTX 3060 Ti', 'PC Gaming E-Power i5G11',
        '638107712753851371_pc-gaming-e-power-i5g11-3060ti-i5-11400f-den-1.jpg',
        '638131068637976057_pc-gaming-e-power-g1650-i3-10100f-500w-2.jpg',
        '638131068637567604_pc-gaming-e-power-g1650-i3-10100f-500w-5.jpg', 'Xigmatek-NYM-2F-2.jpg', 24990000, 120,
        'Nếu bạn cần chơi những game nặng, trải nghiệm các siêu phẩm AAA ở thiết lập QHD sắc nét, PC Gaming E-Power i5G11 - 3060Ti là sự lựa chọn đầy kinh tế khi sở hữu card đồ họa RTX 3060 Ti tuyệt đỉnh trong mức giá tầm trung.',
        2022, 'E-Power', '', 'Intel core i5', '16 GB', 'NVIDIA', 'SSD 256 GB', '', '', _binary '', 'PC Gaming', '', 4),
       (74, 4, 'iMac 24 2021 Retina 4.5K M1/8-Core cpu/7-Core GPU/8GB/256GB SSD', 'iMac 24 2021 Retina 4.5K',
        '637846093546715146_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (4).jpg',
        '637846093548121524_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (7).jpg',
        '637846093548746496_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (8).jpg',
        '637846093549371523_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (6).jpg', 31290000, 120,
        'Không chỉ là thiết bị làm việc sang trọng, nhỏ gọn và mạnh mẽ, iMac M1 2021 24 Retina 4.5K còn thổi bùng sức sống cho không gian của bạn với những tùy chọn màu sắc nổi bật, mang đến nhiều niềm hứng khởi.',
        2022, 'Apple (iMac)', '', 'Apple M1', '8 GB', 'M1', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng', '', 2),
       (75, 4, 'iMac 24 2022 Retina 4.5K M1/8-Core cpu/8-Core GPU/8GB/256GB SSD', 'iMac 24 2022 Retina 4.5K',
        '637846093546558931_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (1).jpg',
        '637846093548121524_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (7).jpg',
        '637846093548746496_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (8).jpg',
        '637846093549371523_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (6).jpg', 36199000, 120,
        'iMac 24\' 2022 Retina 4.5K M1 là lựa chọn hoàn hảo thích hợp cho mọi không gian của bạn. Dù là để làm việc hay giải trí, sức mạnh cùng phong cách của iMac cũng mang đến sự thú vị và những giá trị riêng biệt chỉ có ở Apple.',
        2022, 'Apple (iMac)', '', 'Apple M1', '8 GB', 'M1', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng', '',
        NULL),
       (76, 4, 'iMac 24\' 2023 Retina 4.5K M1/8-Core CPU/8-Core GPU/8GB/512GB SSD', 'iMac 24\' 2023 Retina 4.5K',
        '637846093546715146_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (2).jpg',
        '637846093548121524_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (7).jpg',
        '637846093548746496_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (8).jpg',
        '637846093549371523_iMac 24 2021 Retina 45K M18-Core CPU7-Core GPU8GB256GB SSD (6).jpg', 39990000, 120,
        'Không đơn thuần là một thiết bị làm việc hay giải trí, iMac M1 2022 24 inch đã được nâng tầm trở thành một tác phẩm nghệ thuật với thiết kế đột phá. Ẩn chứa bên trong thân máy siêu mỏng là bộ vi xử lý Apple M1 mạnh mẽ lần đầu tiên xuất hiện trên iMac.',
        2022, 'Apple (iMac)', '', 'Apple M1', '8 GB', 'M1', 'SSD 512 GB', '', '', _binary '', 'PC Văn phòng', '',
        NULL),
       (77, 4, 'Mac mini 2020 M1 256GB SSD MGNR3SA/A', 'Mac mini 2020',
        '637845969083215955_Mac mini 2020 M1 256GB SSD MGNR3SAA (2).jpg',
        '637845969083528403_Mac mini 2020 M1 256GB SSD MGNR3SAA (6).jpg',
        '637845969083059624_Mac mini 2020 M1 256GB SSD MGNR3SAA (3).jpg',
        '637407926277699019_mac-mini-2020-m1-bac-5.jpg', 19990000, 120,
        'Bộ vi xử lý mới Apple M1 đưa Mac mini 2020 lên một đẳng cấp hoàn toàn khác biệt. Sẵn sàng làm việc, giải trí và sáng tạo trên chiếc máy tính để bàn siêu nhỏ gọn Mac Mini M1 với tốc độ, sức mạnh vượt xa trí tưởng tượng của bạn.',
        2022, 'Apple (Mac mini)', '', 'Apple M1', '8 GB', 'M1', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng', '',
        5),
       (78, 4, 'Mac mini 2023 M2 8CPU 10GPU 8GB/512GB', 'Mac mini 2023', '638096359388473379_mac-mini-2023-m2-3.jpg',
        '638096359388004765_mac-mini-2023-m2-1.jpg', '638096359387527669_mac-mini-2023-m2-2.jpg',
        '638096359388317309_mac-mini-2023-m2-6.jpg', 8990000, 120,
        'Với nguồn sức mạnh đáng nể của chip M2, phiên bản 2023 của Mac mini tiếp tục đà tăng tiến hiệu năng ấn tượng. Giờ đây, bạn có thể làm các công việc chuyên nghiệp và thực hiện những tác vụ chuyên sâu nhất chỉ với một chiếc PC mỏng gọn, nhẹ nhàng trên bàn làm việc của mình.',
        2022, 'Apple (Mac mini)', '', 'Apple M2', '8 GB', 'M2', 'SSD 512 GB', '', '', _binary '', 'PC Văn phòng', '',
        6),
       (79, 4, 'Mac Studio 2022 M1 Max/32GB/512GB SSD', 'Mac Studio 2022 M1 Max',
        '637824229907890199_mac-studio-2022-bac-1.jpg', '637824229913671542_mac-studio-2022-bac-4.jpg',
        '637824229907421423_mac-studio-2022-bac-2.jpg', '637824229906952678_mac-studio-2022-bac-3.jpg', 55990000, 120,
        'Ẩn bên trong một thiết kế nhỏ nhắn và tối giản của Mac Studio M1 Max 2022, Apple đã thành công trao gửi nguồn sức mạnh nội lực cực kỳ ấn tượng với chip xử lý M1 Max. Sản phẩm được trang bị hệ thống cổng kết nối đa năng, giúp cho quá trình sáng tạo, làm việc và giải trí của bạn đạt đến tầm cao mới.',
        2022, 'Apple (Mac mini)', '', 'Apple M1', '32 GB', 'M1', 'SSD 512 GB', '', '', _binary '', 'PC Văn phòng', '',
        NULL),
       (80, 4, 'Mac Studio 2022 M1 Ultra/64GB/1TB SSD', 'Mac Studio 2022 M1',
        '637859621022242193_Mac Studio 2022 M1 Ultra64GB1TB SSD (3).jpg',
        '637859621022242193_Mac Studio 2022 M1 Ultra64GB1TB SSD (4).jpg',
        '637859621022710976_Mac Studio 2022 M1 Ultra64GB1TB SSD (1).jpg',
        '637859621022554682_Mac Studio 2022 M1 Ultra64GB1TB SSD (2).jpg', 109990000, 120,
        'Mac Studio M1 Ultra 2022 là thành quả công nghệ nổi bật từ Apple khi gói gọn nguồn sức mạnh khổng lồ vào trong bộ khung vỏ nhỏ nhẹ tí hon. Với bí quyết là chip M1 Ultra cực mạnh, hãng mở ra phương án hợp lý nhất để những người có nhu cầu cao về mặt hiệu năng giải quyết được bài toán tối ưu không gian làm việc.',
        2022, 'Apple (Mac mini)', '', 'Apple M1', '64 GB', 'M1', 'SSD 1 TB', '', '', _binary '', 'PC Đồ họa', '',
        NULL),
       (81, 4, 'Máy tính để bàn Lenovo IdeaCentre AIO 3 24ITL6 i3 1115G4/4GB/256GB/23.8 FHD/Chuột-Bàn phím/Win11',
        'Lenovo IdeaCentre AIO 3 24ITL6',
        '638000702151692106_lenovo-ideacentre-aio-3-24itl6-i3-1115g4-ram-4gb-den-1.jpg',
        '638000702151692106_lenovo-ideacentre-aio-3-24itl6-i3-1115g4-ram-4gb-den-2 (1).jpg',
        'Lenovo-IdeaCentre-AIO-3-24ITL6-black-7.jpg',
        '638000702150910572_lenovo-ideacentre-aio-3-24itl6-i3-1115g4-ram-4gb-den-4.jpg', 13190000, 120,
        'Được thiết kế để tạo nên ấn tượng từ những điều đơn giản, Lenovo IdeaCentre AIO 3 24ITL6 tích hợp màn hình Full HD 23,8 inch tuyệt đẹp, bộ vi xử lý Intel thế hệ thứ 11 mạnh mẽ và âm thanh được chứng nhận bởi Harman Kardon, mang đến chiếc máy tính đa năng cho gia đình hoặc văn phòng.',
        2022, 'Lenovo', '', 'Intel core i3', '4 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng',
        '', 5),
       (82, 4, 'Máy tính để bàn HP ProDesk 400G6 DMPentG6400T4GB/256GBPC-59D82PA', 'Máy tính để bàn HP ProDesk',
        '637762872891630450_hp-prodesk-400g6-den-1.jpg', 'HP-ProDesk-400G6-2 (1).jpg',
        '637762931116691737_hp-prodesk-400g6-den-2 (1).jpg', '637762931116848015_hp-prodesk-400g6-den-3 (1).jpg',
        5990000, 120,
        'HP ProDesk 400 G6 DMPentG6400T4GB là case máy tính để bàn với kích thước mini siêu nhỏ, rất gọn gàng trên bàn làm việc hoặc bạn có thể mang đi bất cứ đâu tùy thích. Cấu hình của chiếc máy tính mini này đủ để làm việc văn phòng, duyệt web hay xem phim giải trí.',
        2022, 'HP', '', 'Intel core i3', '4 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng', '',
        NULL),
       (83, 4, 'Máy tính để bàn HP Pavilion TP01-3008d i5-12400/8GB/256GB/Bàn phím-Chuột/Win 11',
        'HP Pavilion TP01-3008d', 'HP-Pavilion-TP01-2022-white-3 (1).jpg', 'HP-Pavilion-TP01-2022-white-2 (1).jpg',
        'HP-Pavilion-TP01-2022-white-1 (1).jpg', '638000729084328690_hp-pavilion-tp01-3008d-trang-1.jpg', 13790000, 120,
        'Được thiết kế để hoàn thành mọi công việc từ đơn giản cho đến phức tạp, máy tính để bàn HP Pavilion TP01-3008d kết hợp hiệu năng cao, sự bền bỉ và thiết kế trang trọng cho văn phòng của bạn sẽ mang đến nguồn năng lượng bất tận, giúp xử lý công việc với hiệu suất tốt nhất.',
        2022, 'HP', '', 'Intel core i5', '8 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng', '',
        NULL),
       (84, 4, 'Máy tính All In One HP 24-df1030d i5 1135G7', 'Máy tính All In One HP',
        '637609875783758205_hp-22-df0131d-trang-1.jpg', '637609875778289402_hp-22-df0131d-trang-2.jpg',
        'hp-all-in-one-24-3.jpg', '637609875776726884_hp-22-df0131d-trang-3.jpg', 8990000, 120,
        'Không cần bỏ ra số tiền lớn, bạn vẫn có được case máy tính văn phòng vô cùng mạnh mẽ với vi xử lý Intel Core i5 thế hệ thứ 10, dung lượng RAM lớn 16GB và ổ SSD tốc độ cao. Máy tính All In One HP thích hợp để xử lý mọi công việc từ tác vụ thường ngày cho đến những ứng dụng nặng đòi hỏi nhiều về phần cứng. Đặc biệt, sản phẩm còn được tặng bộ chuột, bàn phím và USB Wi-Fi đi kèm trong hộp, giúp trải nghiệm trở nên dễ dàng hơn bao giờ hết.',
        2022, 'HP', '', 'Intel core i5', '8 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng', '',
        NULL),
       (85, 4, 'Máy tính để bàn Asus S500MC-511400040W i5 11400/8GB/256GB-SSD/TPM/B560/WiFi6/BT5/KB/M/300W/Win 11 SL',
        'Asus S500MC', '637783716924049932_asus-s500sc-den-1.jpg', '637783716927174996_asus-s500sc-den-3.jpg',
        '637783716927174996_asus-s500sc-den-5.jpg', '637783716924518653_asus-s500sc-den-6.jpg', 11990000, 120,
        'Asus S500MC i5 là case máy tính đồng bộ có hiệu năng vô cùng ấn tượng với bộ vi xử lý Intel Core i5 11400, chạy tốt mọi phần mềm nặng. Đồng thời độ bền của Asus S500MC cũng rất đáng tin cậy trong một thiết kế thời trang.',
        2022, 'Asus', '', 'Intel core i5', '8 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng',
        '', NULL),
       (86, 4, 'Máy tính AIO Asus Vivo V222FAK-BA144W i5 10210U/8GB/512GB/21.5FHD/Chuột+Bàn phím/Win 11',
        'AIO Asus Vivo V222FAK', '637684185938066737_mt-aio-asus-v222fak-den-1.jpg',
        '637684185938066737_mt-aio-asus-v222fak-den-2.jpg', '637684185938691710_mt-aio-asus-v222fak-den-3.jpg',
        '637684185931816663_mt-aio-asus-v222fak-den-4.jpg', 16490000, 120,
        'Máy tính đa năng AIO Asus Vivo V222FAK-BA114W cho bạn tận hưởng hình ảnh tuyệt đẹp trên màn hình tràn viền vô cực, âm thanh ASUS SonicMaster sống động kết hợp cùng hiệu suất đẳng cấp từ bộ vi xử lý Intel Core i5 mạnh mẽ, là phương tiện làm việc và giải trí hàng đầu, thích hợp cho mọi không gian.',
        2022, 'Asus', '', 'Intel core i5', '8 GB', 'CARD ONBOARD', 'SSD 512 GB', '', '', _binary '', 'PC Văn phòng',
        '', NULL),
       (87, 4, 'Máy tính All in one Asus E5202WHAK-BA102T i3 11100B/4GB/512GB-SSD/DVD-RW/21.5 FHD/Key-Mouse/W10SL',
        'All in one Asus E5202WHAK', '637684213467621890_mt-aio-asus-e5-den-1.jpg',
        '637684213472465624_mt-aio-asus-e5-den-2.jpg', '637684213467621890_mt-aio-asus-e5-den-4.jpg',
        'ASUS-ExpertCenter-E5-AiO-22-4.jpg', 13990000, 120,
        'PC All-in-one Asus ExpertCenter E5 E5202WHAK-BA102T là chiếc máy tính All in One dành cho doanh nghiệp vô cùng mạnh mẽ với bộ vi xử lý Intel thế hệ thứ 11 hàng đầu, công nghệ khử tiếng ồn AI và một thiết kế cao cấp sẽ phát huy hết năng suất làm việc của bạn.',
        2022, 'Asus', '', 'Intel core i3', '4 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng',
        '', NULL),
       (88, 4, 'Máy tính AIO ASUS A3402WBAK-WA066W i5 1235U/8GB/512GB/23.8 FHD/CAM/MIC/KB/M/Win11',
        'AIO ASUS A3402WBAK', '638131034515917961_asus-a3402wbak-wa066w-i5-1235u-trang-1.jpg',
        '638131034515276164_asus-a3402wbak-wa066w-i5-1235u-trang-2.jpg',
        '638131034514596031_asus-a3402wbak-wa066w-i5-1235u-trang-3.jpg',
        '638131034515596577_asus-a3402wbak-wa066w-i5-1235u-trang-4.jpg', 19590000, 120, '', 2022, 'Asus', '',
        'Intel core i5', '8 GB', 'CARD ONBOARD', 'SSD 256 GB', '', '', _binary '', 'PC Văn phòng', '', NULL);
/*!40000 ALTER TABLE `Product`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating`
(
    `UserID`     bigint unsigned  NOT NULL,
    `OrderID`    bigint unsigned  NOT NULL,
    `ProductID`  bigint unsigned  NOT NULL,
    `RateAmount` tinyint unsigned NOT NULL,
    `Comment`    longtext         NOT NULL,
    `DateRating` date             NOT NULL,
    PRIMARY KEY (`UserID`, `OrderID`, `ProductID`),
    KEY `fk_Rating_OrderDetail1_idx` (`OrderID`, `ProductID`),
    CONSTRAINT `fk_Rating_OrderDetail1` FOREIGN KEY (`OrderID`, `ProductID`) REFERENCES `OrderDetail` (`OrderID`, `ProductID`) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT `fk_Rating_User1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

LOCK TABLES `Rating` WRITE;
/*!40000 ALTER TABLE `Rating`
    DISABLE KEYS */;
INSERT INTO `Rating`
VALUES (2, 338, 32, 5, 'sdasdas', '2023-05-10'),
       (2, 339, 31, 2, 'fsdfsfdsd', '2023-05-10'),
       (2, 341, 1, 3, 'Sản phẩm khá tốt', '2023-05-19'),
       (2, 351, 1, 5, 'sdasdasdasdasdasdads', '2023-05-10'),
       (2, 355, 1, 3, 'Sản phẩm khá tệ', '2023-05-19'),
       (2, 356, 1, 3, '', '2023-05-20'),
       (2, 377, 68, 3, 'Rất Tốt', '2023-05-12'),
       (2, 382, 4, 3, 'dfsdfsdf', '2023-05-23'),
       (2, 383, 17, 3, 'sdasdsdasdsdasdasdasdasdasdasdasd', '2023-05-23'),
       (2, 384, 11, 3, 'sdasd', '2023-05-23'),
       (2, 385, 2, 3, 'sdasdsdasd', '2023-05-23'),
       (2, 386, 73, 3, 'sdasdsdasdsdasda', '2023-05-23'),
       (2, 407, 12, 3, 'Sản phẩm khá tốt', '2023-05-19'),
       (2, 422, 2, 3, 'sdfsdfdfsfgdfgsdasd', '2023-05-23'),
       (2, 422, 5, 5, 'testsdsd\n', '2023-05-20'),
       (2, 437, 51, 3, 'sdadasdasd', '2023-05-23'),
       (2, 447, 5, 3, 'sdfsdfdfsfgdfg', '2023-05-23'),
       (2, 453, 16, 3, 'dfsdfsdf', '2023-05-23'),
       (2, 458, 1, 3, 'sdasda', '2023-05-30'),
       (2, 459, 1, 3, 'sdasdasd', '2023-05-30'),
       (2, 460, 1, 3, 'sasfdf', '2023-05-30'),
       (12, 352, 1, 3, 'Sản phẩm rất tốt!', '2023-05-10'),
       (12, 352, 9, 1, '', '2023-05-10'),
       (12, 352, 31, 5, 'Sản phẩm rất tệ', '2023-05-10'),
       (12, 352, 32, 5, 'Sản phẩm rất tốt', '2023-05-10'),
       (13, 353, 1, 1, 'Sản Phẩm Khá Tệ!', '2023-05-10'),
       (13, 354, 31, 4, 'Sản Phẩm Khá Tốt', '2023-05-10'),
       (15, 387, 31, 3, 'sdadsasada', '2023-05-12'),
       (16, 388, 22, 5, 'Rất Tốt', '2023-05-12'),
       (17, 473, 1, 5, 'adadasdadsdfsdfsd', '2023-05-29'),
       (18, 403, 31, 3, 'Sản Phẩm Khá Tốt', '2023-05-13'),
       (19, 410, 1, 3, 'fgdfgdfgdfgd', '2023-05-20'),
       (19, 442, 33, 3, 'dklahsdkjahdkjshasd\n', '2023-05-31');
/*!40000 ALTER TABLE `Rating`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User`
(
    `UserID`   bigint unsigned NOT NULL AUTO_INCREMENT,
    `Email`    varchar(255)    NOT NULL,
    `Password` varchar(255)    NOT NULL,
    `Role`     varchar(255)    NOT NULL,
    `Fullname` varchar(255)    NOT NULL,
    `Gender`   varchar(255) DEFAULT NULL,
    `Phone`    varchar(255) DEFAULT NULL,
    `Image`    longtext,
    `Enabled`  bit(1)       DEFAULT NULL,
    `Locked`   bit(1)       DEFAULT NULL,
    PRIMARY KEY (`UserID`),
    UNIQUE KEY `email_UNIQUE` (`Email`),
    UNIQUE KEY `phone_UNIQUE` (`Phone`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 28
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User`
    DISABLE KEYS */;
INSERT INTO `User`
VALUES (2, 'trandangnguyenbao2810@gmail.com', '$2a$10$fxNwb6yr1RAG8uMQjtucQuyQQOfKwuk/fE4tFqmapknAb.VARPUlq',
        'CUSTOMER', 'Trần Đăng Nguyễn Bảo', 'MALE', '0978567688',
        'data:image/webp;base64,UklGRvwIAABXRUJQVlA4WAoAAAAIAAAASAIAhQEAVlA4IEYIAAAQegCdASpJAoYBLiUYjEYREREBABIlpANiyvjd+Zq/xXsxt3sUmqAaO01T/X3vbJK1G2EE6KqQipCKkIqQipCKkIqQipCKkIqQipCKkIqLgUgW5VsEMakTiwBVqY/uJY5OiqkIqQipCKkIqQipCKkIqQipCKkIqQipCKkIqQipBLPBoyDe7hJ1kVI90MzxjFOJu76K/HKKjJWtUVW8sdwk6yKke6GjIN7u+Quvdwk6yKke6GjIN0o56rT6YZAhmLOLkVI90NGQb3cJOsip7R5oaMg3u4SdZFSPc8n/AqObd0LzvymMyx3CTrIqR7oaMg3u75C693CTrIqR7oaMg3TNSsANSVdcc73mxR7oaMg3u4SdZFSQ1ng0ZBvdwk6yKke6GXx7URt4IGbO9a/LHcJOsipHuhoyDe7vkLr3cJOsipHuhoyDdNBkTtTOufXwCkP5FSPdDRkG93CTrIqe0eaGjIN7uEnWRUj3PJ/JoM9jmoDKER7oaMg3u4SdZFSPePeiZBvdwk6yKke6Gi+j5xpFCM0sVh4QNayKke6GjIN7uEnWRzQg90NGQb3cJOsipHqq+JODdjm3M/ndlrIqR7oaMg3u4SdZHNCD3Q0ZBvdwk6yKkeqr4R0tHY5Cjxo1kVI90NGQb3cJOsjmhB7oaMg3u4SdZFSPVV8ScLekHKtGsTJ1kVI90NGQb3cJOtqSnP7oaMg3u4SdZFSGSwWON9F4nhjQwT+6GjIN7uEnWRUj3j3omQb3cJOsipHuhovo+cHOXY5qA0DBdwk6yKke6GjIN7uFY1LkVI90NGQb3cJOscVsJ70hM+5Ctd6PdDRkG93CTrIqR7x70TIN7uEnWRUj3Q0X0fOFFzpn3KpAwu4SdZFSPdDRkG93CsalyKke6GjIN7uEnWOK2E96QmfcqEzjwl7uEnWRUj3Q0ZB5NGjIN7uEnWRUj3Q0X0fOLRoOhsVHGNtDRkG93CTrIqR7oaTffFjuEnWRUj3Q0ZBumalSc62DlWjJgS93CTrIqR7oaMg3zJUEnWRUj3Q0ZBvdwkYA+uJpSiOnumyMipHuhoyDe7hJ1kVJDWeDRkG93CTrIqR7oZfHuFDhKeaJPWXIqR7oaMg3u4SdZFT2jzQ0ZBvdwk6yKke55P5N1cBM+5UJnHhL3cJOsipHuhoyDyaNGQb3cJOsipHuhovo+3od9lkAYz3l+Ksg3u4SdZFSPdDRkHk0aMg3u4SdZFSPdDRfTos61T+rmsDltcmCQ3Xcpp9CTrIqR7oaMg3u4SgBWlCTrIqR7oaMg3u3ww5iRL2EnWRUj3Q0ZBvdwkAAAP7///icLcb/2PQPAv7/wuzH6yJVVAcHlKL8zOq9et/JTSR7y7+FNIN/XPb2lANdOr/t5H/TvyIZNEZQHX/+fwtnQv230xvzlYiHQGP/d+b3NX7/4u30j/WRLsnnlTygaBt//DxX5zH+hzcoidzGi/1//iNWudQUrCr/VLECX4sFWdtoJhPU/4MhbIdVNYr+3fZkb07nMFXrThaUeG0ldJstuYJB6Z3uOvfeY0Yn3VswGs/vdKRNdmGCLpqZl9zv/tjm6BnIlruEtjyy8yFkwUU+2Zz/Ya7l0HsiCQfjOhI8s09w9Hqdg1QzSKqTGGDvww5NzgKo6/TaRP9SZC/7LQRbUt755eayaiWoO8VsmVbyBDqcPFFFzvjjJIIAn0r/qkVIfwNiN1mQ3VZ6lG1ZQ5aRyhkuJj4uPl+6T+upkFeenzelzOZsoD6Bu5qGpLeVoJyGv9Au03/1XRyNdfBQfCV0WZxYM7Ip9gI4CeoxW+ccbUcZ0Rz87KsSM8UPmF49SRQcWEhvjFgNUdxCAKco1WdTDU7BsqU+HEPgfjpstAcx4Rc5bU22TA28kxKnTUzN2FF64NaWKIQT7AgIGIEAxn5HKRD3VVStNeYov2436qj4Qh79L5f/32BCL0TjPFAM1pxzC2btHx/zyqiUhb+KWKgAUiaLwBIrc0eB+R+cEJAAg8BqGCR1MsguQhffZCPsvtE4kuN9J+TaTFH8yc868k5Pu07VHAbD9s5QYTrBugDAb/pUwOU0wxVnWGIMrmVFj37RNwTl4qtyMA7LM0dC5f014cXML708+uB3+ATsw9UlwHTGul8byrjANH0biYJaj+BlLcERw2udK41wwx2ZEe1E+BubAFgPEztp2ogOGSESk/Ejf+D5TAAIhORm3eASuFPgOjrBUHgfXAFCMAzK0zuYm4AlbbT+UZdke4D4bsOoEXSavGNGOQHzlWtcTQNrPKn/JO/T9xjclWzAYllG+gJKcJXK7g8pkhkGlIgPiuUbZAbw1qDveaLxqXiEfYl8gHGMLhLkOjqHbhy2lwEacs5sP8EMgSsGzS+NNIcaMd7+uPDXRPnDtfaQIkg/H0A6zs6Uxpj5YTNYIkeCmM7cedxE77FoJjPUjTomusjRX/u3WSdaTJzRwHPV2x+ABgO4nTfVTWEABMJMniljhLqMa5M3JhmApJnQZ2xmREGqGiQZdCJhL53Z01ek5H0GmduN33WGnwkGQNIren+dVURcjxTGVbOTtF5nFtxvKJmFq1s90A1ZoH88AwfJ3o8isDJcgraytIEpUsPr39jOM0ydm3cpgWWbtef9iXiTyiW3JUFePYVIXrgEefoLRSYfLnfUfwLhBe/bHjiH5mIvpkb+Oi7/2YP0Gjzy7qftgcl+gOvSuITbL6j3wtzH0mtWa9CYAbOyAjKKY0/bj5WWLVmm8hDwtxtD923/iYOmtYH0mV/kiUTcdfr9rgXLwOwewNyDbt2hDbF+XDVptJZvVPt8Pr2wfYW4+3GecbYAAABFWElGkAAAAEV4aWYAAE1NACoAAAAIAAUBPgAFAAAAAgAAAEoBPwAFAAAABgAAAFpREAABAAAAAQEAAABREQAEAAAAAQAACxNREgAEAAAAAQAACxMAAAAAAAB6JQABhqAAAICDAAGGoAAA+f8AAYagAACA6QABhqAAAHUwAAGGoAAA6mAAAYagAAA6mAABhqAAABdvAAGGoA==',
        _binary '', _binary '\0'),
       (3, 'nguyenhoangsidan@gmail.com', '123456789', 'CUSTOMER', 'Nguyễn Đan', 'MALE', '0978567687', 'string',
        _binary '', _binary '\0'),
       (4, 'nguyentrungquoc@gmail.com', '$2a$10$Gej4N3DD.eeLVHJveI8DKe2mNscQ5TRsShhYMBOa5LKoZftYzYIJu', 'CUSTOMER',
        'Nguyễn Trung Quốc', 'MALE', '0978567685', 'string', _binary '', _binary '\0'),
       (5, 'nguyendan@gmail.com', '123456789', 'CUSTOMER', 'Nguyễn Đan', 'FEMALE', '0234568450', '', _binary '',
        _binary '\0'),
       (7, 'admin@linkking.com', '$2a$10$EmkNC7E50W3961m/m2ZsPu0Krx5D5co2NcYQfNuSCUOklIN4q8r/G', 'ADMIN', '', 'MALE',
        '', '', _binary '', _binary '\0'),
       (11, 'letiendat1@gmail.com', '123456789', 'CUSTOMER', 'sdsdjhaskhajkhdkjashkjda', 'FEMALE', '0123456799', '',
        _binary '\0', _binary '\0'),
       (12, 'nguyentrungquoc123@gmail.com', '$2a$10$F9YlGKuyjM82jfnSB0.sAOgtppWt8NZdLTHLZCy44So940eLok.di', 'CUSTOMER',
        'Nguyễn Trung Quốc', 'FEMALE', '0315124251', '', _binary '\0', _binary '\0'),
       (13, '19h1120067@sv.ut.edu.vn', '$2a$10$L2XqL9W/G5ZAR5c0i/l3dumDP/TQYILJcfaSDudvGHOtF0ojudXlO', 'CUSTOMER',
        'Lê Tiến Đạt', 'MALE', '0325612465', 'string', _binary '\0', _binary '\0'),
       (15, 'trandangnguyenbao1234@gmail.com', '$2a$10$CdTkwnoq70fKx0d1Jjmj.uToQW2HiEfPL/DQAENGb1MTF2CBAJFwK',
        'CUSTOMER', 'Trần Quốc Thịnh', 'FEMALE', '09785676800', 'string', _binary '\0', _binary '\0'),
       (16, 'nguyenchanhbao@gmail.com', '$2a$10$vTxbWBOa5XONurNAnryhsewLyOmO68NyanyB0GrlFTmOA7ne1HvwK', 'CUSTOMER',
        'Nguyễn Chánh Bảo', 'FEMALE', '0978564646', '', _binary '\0', _binary '\0'),
       (17, 'trandangbien@gmail.com', '$2a$10$SLzPIJNgWCAHX5F.lKGubepcTsnXrcW6OjKcjBZaS.Ae9Tc5gLaGe', 'CUSTOMER',
        'Trần Đăng Biên', 'FEMALE', '0123456789', '', _binary '\0', _binary '\0'),
       (18, 'dinhquanghuy@gmail.com', '$2a$10$He.KJBxv.z8/kfVMbx9uie7ccDHcH1xvKvuFUsYaXA3glhjw53TrW', 'CUSTOMER',
        'Đinh Quang Huy', 'FEMALE', '0328272512', 'string', _binary '\0', _binary '\0'),
       (19, 'trandangbaoan1407@gmail.com', '$2a$10$CY5l0LY7Rmv1J.ymcXFLw.LQe3aD4C8gdavgX9IkA4F2Fp0v95cJa', 'CUSTOMER',
        'Trần Đăng Bảo An', 'MALE', '0123456678', '', _binary '\0', _binary '\0'),
       (20, 'tranquocthinh@gmail.com', '$2a$10$pgxpwhyDR0tbkPigc1aK1erX3f368uh4cPI0EtdLfGTpl9gZseTrK', 'SHIPPER',
        'Trần Quốc Thịnh', 'MALE', '0328123457',
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyMTIsIDIxMiwgMjE3KSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdXNlciI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiPjwvcGF0aD48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiPjwvY2lyY2xlPjwvc3ZnPg==',
        _binary '\0', _binary '\0'),
       (21, 'letuandu@gmail.com', '$2a$10$Db4KdiBWANeGyAxY1HRQhOoeSUMvmESlzwCxjhCAJpOjr9MxgzeQy', 'CUSTOMER',
        'Lê Tuấn Dự', 'FEMALE', '0328215124', '', _binary '\0', _binary '\0'),
       (23, 'nguyenbao2810@gmail.com', '$2a$10$DImvufbjcvGhe7P.uI1OhOR6hPNdegWnL5Kq3oGkZ4RC/R5jkXvKe', 'SHIPPER',
        'Đăng Nguyễn Bảo', 'MALE', '0212121212',
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyMTIsIDIxMiwgMjE3KSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdXNlciI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiPjwvcGF0aD48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiPjwvY2lyY2xlPjwvc3ZnPg==',
        _binary '\0', _binary '\0'),
       (24, 'tiendat123456@gmail.com', '$2a$10$R8Iybjr3Ncgyr/w0HyK91edau3WRsLcljm3KC9ayJnH3624WNjOy.', 'SHIPPER',
        'Tiến Đạt Lê', 'MALE', '0212121211',
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyMTIsIDIxMiwgMjE3KSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdXNlciI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiPjwvcGF0aD48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiPjwvY2lyY2xlPjwvc3ZnPg==',
        _binary '\0', _binary '\0'),
       (25, 'huyquang@gmail.com', '$2a$10$d1kJYVIouC5YgsWFV.apfOlL802u/wBPTTistcJnT72BUm7CGZyLm', 'SHIPPER',
        'Đinh Quang Huy', 'MALE', '0212121213',
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyMTIsIDIxMiwgMjE3KSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdXNlciI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiPjwvcGF0aD48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiPjwvY2lyY2xlPjwvc3ZnPg==',
        _binary '\0', _binary '\0'),
       (26, 'dannguyen@gmail.com', '$2a$10$DFvNvub.0LjvGwgA28xrhecEIn9tKF/WrB3jCJTas/0m/0aVfEfYK', 'SHIPPER',
        'Đan Nguyễn', 'MALE', '0212121214',
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyMTIsIDIxMiwgMjE3KSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdXNlciI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiPjwvcGF0aD48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiPjwvY2lyY2xlPjwvc3ZnPg==',
        _binary '\0', _binary '\0');
/*!40000 ALTER TABLE `User`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAddress`
--

DROP TABLE IF EXISTS `UserAddress`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAddress`
(
    `UserAddressID` bigint unsigned NOT NULL AUTO_INCREMENT,
    `UserID`        bigint unsigned NOT NULL,
    `Address`       varchar(255)    NOT NULL,
    PRIMARY KEY (`UserAddressID`, `UserID`),
    KEY `fk_UserAddress_User1_idx` (`UserID`),
    CONSTRAINT `fk_UserAddress_User1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB
  AUTO_INCREMENT = 55
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAddress`
--

LOCK TABLES `UserAddress` WRITE;
/*!40000 ALTER TABLE `UserAddress`
    DISABLE KEYS */;
INSERT INTO `UserAddress`
VALUES (29, 4, 'Hiệp Bình Phước'),
       (30, 4, 'Hiệp Bình Chánh'),
       (31, 2, '12/4, Phường Tân Chánh Hiệp, Quận 12, Thành phố Hồ Chí Minh'),
       (32, 2, 'asdasdasdasdasda'),
       (34, 2, 'adsadsadasd'),
       (47, 12, 'adasdasdadssdasdsd'),
       (49, 2, 'Thủ Đức'),
       (52, 17, 'TPHCM'),
       (54, 18, 'Hiệp Bình Chánh');
/*!40000 ALTER TABLE `UserAddress`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_id_seq`
--

DROP TABLE IF EXISTS `category_id_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_id_seq`
(
    `id`       bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_id_seq`
--

LOCK TABLES `category_id_seq` WRITE;
/*!40000 ALTER TABLE `category_id_seq`
    DISABLE KEYS */;
INSERT INTO `category_id_seq` (`next_val`)
VALUES (7);
/*!40000 ALTER TABLE `category_id_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_id_seq`
--

DROP TABLE IF EXISTS `order_id_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_id_seq`
(
    `id`       bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_id_seq`
--

LOCK TABLES `order_id_seq` WRITE;
/*!40000 ALTER TABLE `order_id_seq`
    DISABLE KEYS */;
INSERT INTO `order_id_seq` (`next_val`)
VALUES (480);
/*!40000 ALTER TABLE `order_id_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_id_seq`
--

DROP TABLE IF EXISTS `product_id_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_id_seq`
(
    `id`       bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_id_seq`
--

LOCK TABLES `product_id_seq` WRITE;
/*!40000 ALTER TABLE `product_id_seq`
    DISABLE KEYS */;
INSERT INTO `product_id_seq` (`next_val`)
VALUES (89);
/*!40000 ALTER TABLE `product_id_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address_id_seq`
--

DROP TABLE IF EXISTS `user_address_id_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address_id_seq`
(
    `id`       bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address_id_seq`
--

LOCK TABLES `user_address_id_seq` WRITE;
/*!40000 ALTER TABLE `user_address_id_seq`
    DISABLE KEYS */;
INSERT INTO `user_address_id_seq` (`next_val`)
VALUES (55);
/*!40000 ALTER TABLE `user_address_id_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_id_seq`
--

DROP TABLE IF EXISTS `user_id_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_id_seq`
(
    `id`       bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_id_seq`
--

LOCK TABLES `user_id_seq` WRITE;
/*!40000 ALTER TABLE `user_id_seq`
    DISABLE KEYS */;
INSERT INTO `user_id_seq` (`next_val`)
VALUES (28);
/*!40000 ALTER TABLE `user_id_seq`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2023-06-06  9:44:55
