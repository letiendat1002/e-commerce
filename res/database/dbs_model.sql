-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema myecommerce
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema myecommerce
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `myecommerce` ;
USE `myecommerce` ;

-- -----------------------------------------------------
-- Table `myecommerce`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Users` (
  `UserID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Role` VARCHAR(255) NOT NULL,
  `Fullname` VARCHAR(255) NOT NULL,
  `Gender` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Phone` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `username_UNIQUE` (`Username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`Phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`UserAddresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`UserAddresses` (
  `UserAddressID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` BIGINT UNSIGNED NOT NULL,
  `Address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`UserAddressID`, `UserID`),
  INDEX `fk_UserAddresses_Users1_idx` (`UserID` ASC) VISIBLE,
  CONSTRAINT `fk_UserAddresses_Users1`
    FOREIGN KEY (`UserID`)
    REFERENCES `myecommerce`.`Users` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`Orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Orders` (
  `OrderID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` BIGINT UNSIGNED NOT NULL,
  `Total` BIGINT UNSIGNED NOT NULL,
  `PaymentType` VARCHAR(255) NOT NULL,
  `Status` VARCHAR(255) NOT NULL,
  `DateOrder` DATE NOT NULL,
  PRIMARY KEY (`OrderID`, `UserID`),
  INDEX `fk_Orders_Users1_idx` (`UserID` ASC) VISIBLE,
  CONSTRAINT `fk_Orders_Users1`
    FOREIGN KEY (`UserID`)
    REFERENCES `myecommerce`.`Users` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Categories` (
  `CategoryID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Slug` VARCHAR(255) NOT NULL,
  `Image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`CategoryID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Products` (
  `ProductID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `CategoryID` BIGINT UNSIGNED NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Slug` VARCHAR(255) NOT NULL,
  `Image` VARCHAR(255) NOT NULL,
  `UnitPrice` BIGINT UNSIGNED NOT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  `Status` BIT(1) NOT NULL,
  `YearRelease` SMALLINT(4) NOT NULL,
  `Manufacturer` VARCHAR(255) NOT NULL,
  `Monitor` VARCHAR(255) NOT NULL,
  `CPU` VARCHAR(255) NOT NULL,
  `RAM` VARCHAR(255) NOT NULL,
  `VGA` VARCHAR(255) NOT NULL,
  `HardDisk` VARCHAR(255) NOT NULL,
  `Camera` VARCHAR(255) NOT NULL,
  `Battery` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ProductID`),
  INDEX `fk_Products_Categories1_idx` (`CategoryID` ASC) VISIBLE,
  CONSTRAINT `fk_Products_Categories1`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `myecommerce`.`Categories` (`CategoryID`)
    ON DELETE SET NULL
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`OrderDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`OrderDetails` (
  `OrderID` BIGINT UNSIGNED NOT NULL,
  `ProductID` BIGINT UNSIGNED NOT NULL,
  `PurchasePrice` BIGINT UNSIGNED NOT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`OrderID`, `ProductID`),
  INDEX `fk_OrderDetails_Orders1_idx` (`OrderID` ASC) VISIBLE,
  INDEX `fk_OrderDetails_Products1_idx` (`ProductID` ASC) VISIBLE,
  CONSTRAINT `fk_OrderDetails_Orders1`
    FOREIGN KEY (`OrderID`)
    REFERENCES `myecommerce`.`Orders` (`OrderID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_OrderDetails_Products1`
    FOREIGN KEY (`ProductID`)
    REFERENCES `myecommerce`.`Products` (`ProductID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`Ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Ratings` (
  `UserID` BIGINT UNSIGNED NOT NULL,
  `OrderID` BIGINT UNSIGNED NOT NULL,
  `ProductID` BIGINT UNSIGNED NOT NULL,
  `RateAmount` TINYINT(1) UNSIGNED NOT NULL,
  `Comment` VARCHAR(255) NOT NULL,
  `DateRating` DATE NOT NULL,
  PRIMARY KEY (`UserID`, `OrderID`, `ProductID`),
  INDEX `fk_Ratings_OrderDetails1_idx` (`OrderID` ASC, `ProductID` ASC) VISIBLE,
  CONSTRAINT `fk_Ratings_Users1`
    FOREIGN KEY (`UserID`)
    REFERENCES `myecommerce`.`Users` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_Ratings_OrderDetails1`
    FOREIGN KEY (`OrderID` , `ProductID`)
    REFERENCES `myecommerce`.`OrderDetails` (`OrderID` , `ProductID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
