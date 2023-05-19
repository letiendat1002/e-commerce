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
-- Table `myecommerce`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`User` (
  `UserID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(254) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `FullName` VARCHAR(255) NOT NULL,
  `Gender` VARCHAR(255) NOT NULL,
  `Phone` VARCHAR(255) NOT NULL,
  `Image` LONGTEXT NOT NULL,
  `Role` VARCHAR(255) NOT NULL,
  `Locked` BIT(1) NOT NULL,
  `Enabled` BIT(1) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`Phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`UserAddress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`UserAddress` (
  `UserAddressID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` BIGINT UNSIGNED NOT NULL,
  `Address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`UserAddressID`),
  INDEX `fk_UserAddress_User1_idx` (`UserID` ASC) VISIBLE,
  CONSTRAINT `fk_UserAddress_User1`
    FOREIGN KEY (`UserID`)
    REFERENCES `myecommerce`.`User` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Order` (
  `OrderID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` BIGINT UNSIGNED NOT NULL,
  `AdditionalPrice` BIGINT UNSIGNED NOT NULL,
  `PaymentType` VARCHAR(255) NOT NULL,
  `Status` VARCHAR(255) NOT NULL,
  `DateOrder` DATE NOT NULL,
  `Address` VARCHAR(255) NOT NULL,
  `IsPreparing` BIT(1) NOT NULL,
  `DatePreparing` DATE NULL,
  `IsShipping` BIT(1) NOT NULL,
  `DateShipping` DATE NULL,
  `IsCompleted` BIT(1) NOT NULL,
  `DateCompleted` DATE NULL,
  `WorkerID` BIGINT UNSIGNED NULL,
  PRIMARY KEY (`OrderID`),
  INDEX `fk_Order_User1_idx` (`UserID` ASC) VISIBLE,
  CONSTRAINT `fk_Order_User1`
    FOREIGN KEY (`UserID`)
    REFERENCES `myecommerce`.`User` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Category` (
  `CategoryID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Slug` VARCHAR(255) NOT NULL,
  `Image` LONGTEXT NOT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE INDEX `Slug_UNIQUE` (`Slug` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Product` (
  `ProductID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `CategoryID` BIGINT UNSIGNED NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Slug` VARCHAR(255) NOT NULL,
  `Image` LONGTEXT NOT NULL,
  `ImageReview1` LONGTEXT NOT NULL,
  `ImageReview2` LONGTEXT NOT NULL,
  `ImageReview3` LONGTEXT NOT NULL,
  `UnitPrice` BIGINT UNSIGNED NOT NULL,
  `Discount` INT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  `Description` LONGTEXT NOT NULL,
  `YearRelease` SMALLINT(4) NOT NULL,
  `Manufacturer` VARCHAR(255) NOT NULL,
  `Monitor` VARCHAR(255) NOT NULL,
  `CPU` VARCHAR(255) NOT NULL,
  `RAM` VARCHAR(255) NOT NULL,
  `VGA` VARCHAR(255) NOT NULL,
  `HardDisk` VARCHAR(255) NOT NULL,
  `Camera` VARCHAR(255) NOT NULL,
  `Battery` VARCHAR(255) NOT NULL,
  `Memory` VARCHAR(255) NOT NULL,
  `Demand` VARCHAR(255) NOT NULL,
  `Status` BIT(1) NOT NULL,
  PRIMARY KEY (`ProductID`),
  INDEX `fk_Product_Category1_idx` (`CategoryID` ASC) VISIBLE,
  UNIQUE INDEX `Slug_UNIQUE` (`Slug` ASC) VISIBLE,
  CONSTRAINT `fk_Product_Category1`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `myecommerce`.`Category` (`CategoryID`)
    ON DELETE SET NULL
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`OrderDetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`OrderDetail` (
  `OrderID` BIGINT UNSIGNED NOT NULL,
  `ProductID` BIGINT UNSIGNED NOT NULL,
  `PurchasePrice` BIGINT UNSIGNED NOT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  `Status` VARCHAR(255) NULL,
  PRIMARY KEY (`OrderID`, `ProductID`),
  INDEX `fk_OrderDetail_Order1_idx` (`OrderID` ASC) VISIBLE,
  INDEX `fk_OrderDetail_Product1_idx` (`ProductID` ASC) VISIBLE,
  CONSTRAINT `fk_OrderDetail_Order1`
    FOREIGN KEY (`OrderID`)
    REFERENCES `myecommerce`.`Order` (`OrderID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_OrderDetail_Product1`
    FOREIGN KEY (`ProductID`)
    REFERENCES `myecommerce`.`Product` (`ProductID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myecommerce`.`Rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myecommerce`.`Rating` (
  `UserID` BIGINT UNSIGNED NOT NULL,
  `OrderID` BIGINT UNSIGNED NOT NULL,
  `ProductID` BIGINT UNSIGNED NOT NULL,
  `RateAmount` TINYINT(1) UNSIGNED NOT NULL,
  `Comment` LONGTEXT NOT NULL,
  `DateRating` DATE NOT NULL,
  PRIMARY KEY (`UserID`, `OrderID`, `ProductID`),
  INDEX `fk_Rating_OrderDetail1_idx` (`OrderID` ASC, `ProductID` ASC) VISIBLE,
  CONSTRAINT `fk_Rating_User1`
    FOREIGN KEY (`UserID`)
    REFERENCES `myecommerce`.`User` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_Rating_OrderDetail1`
    FOREIGN KEY (`OrderID` , `ProductID`)
    REFERENCES `myecommerce`.`OrderDetail` (`OrderID` , `ProductID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
