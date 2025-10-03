-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema RekoRinki
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema RekoRinki
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `RekoRinki` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `RekoRinki` ;

-- -----------------------------------------------------
-- Table `RekoRinki`.`Asiakas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Asiakas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `kayttajatunnus` VARCHAR(20) NOT NULL,
  `salasana` VARCHAR(255) NOT NULL,
  `etunimi` VARCHAR(50) NOT NULL,
  `sukunimi` VARCHAR(50) NOT NULL,
  `puhelinnro` VARCHAR(15) NOT NULL,
  `sahkoposti` VARCHAR(255) NOT NULL,
  `katuosoite` VARCHAR(100) NOT NULL,
  `postinumero` VARCHAR(5) NOT NULL,
  `postitoimipaikka` VARCHAR(40) NOT NULL,
  `paikkakunta` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `sahkoposti_UNIQUE` (`sahkoposti` ASC) VISIBLE,
  UNIQUE INDEX `kayttajatunnus_UNIQUE` (`kayttajatunnus` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `RekoRinki`.`Tuottaja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Tuottaja` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `kayttajatunnus` VARCHAR(50) NOT NULL,
  `salasana` VARCHAR(255) NOT NULL,
  `etunimi` VARCHAR(50) NOT NULL,
  `sukunimi` VARCHAR(50) NOT NULL,
  `puhelinnro` VARCHAR(15) NOT NULL,
  `sahkoposti` VARCHAR(255) NOT NULL,
  `katuosoite` VARCHAR(100) NOT NULL,
  `postinumero` VARCHAR(5) NOT NULL,
  `postitoimipaikka` VARCHAR(40) NOT NULL,
  `paikkakunta` VARCHAR(40) NOT NULL,
  `lisatiedot` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `sahkoposti_UNIQUE` (`sahkoposti` ASC) VISIBLE,
  UNIQUE INDEX `kayttajatunnus_UNIQUE` (`kayttajatunnus` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `RekoRinki`.`Ilmoitukset`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Ilmoitukset` (
  `ilmoitusID` INT NOT NULL AUTO_INCREMENT,
  `tuottajaID` INT NOT NULL,
  `lisatiedot` VARCHAR(255) NOT NULL,
  `julkaisupaiva` TIMESTAMP NOT NULL,
  `kuvaus` VARCHAR(200) NOT NULL,
  `voimassaolo_paattyy` TIMESTAMP NOT NULL,
  `kuva` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ilmoitusID`),
  INDEX `tuottajaID` (`tuottajaID` ASC) VISIBLE,
  CONSTRAINT `ilmoitukset_ibfk_1`
    FOREIGN KEY (`tuottajaID`)
    REFERENCES `RekoRinki`.`Tuottaja` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `RekoRinki`.`Tuotteet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Tuotteet` (
  `tuoteID` INT NOT NULL AUTO_INCREMENT,
  `tuottajaID` INT NOT NULL,
  `nimi` VARCHAR(100) NOT NULL,
  `yksikko` VARCHAR(20) NOT NULL,
  `kuvaus` VARCHAR(255) NOT NULL,
  `tuotesaldo` INT NOT NULL,
  `yksikkohinta` DECIMAL(10,2) NOT NULL,
  `tuote_on_aktiivinen` TINYINT(1) NOT NULL,
  PRIMARY KEY (`tuoteID`, `tuottajaID`),
  INDEX `tuottajaID` (`tuottajaID` ASC) VISIBLE,
  UNIQUE INDEX `nimi_UNIQUE` (`nimi` ASC) VISIBLE,
  CONSTRAINT `tuotteet_ibfk_1`
    FOREIGN KEY (`tuottajaID`)
    REFERENCES `RekoRinki`.`Tuottaja` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `RekoRinki`.`Reitit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Reitit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `jakopaiva_aika` DATETIME NOT NULL,
  `jakopaikka` VARCHAR(100) NOT NULL,
  `katuosoite` VARCHAR(100) NOT NULL,
  `postinumero` VARCHAR(5) NOT NULL,
  `paikkakunta` VARCHAR(50) NOT NULL,
  `lisatieto` VARCHAR(255) NOT NULL,
  `Tuottaja_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Reitit_Tuottaja1_idx` (`Tuottaja_id` ASC) VISIBLE,
  CONSTRAINT `fk_Reitit_Tuottaja1`
    FOREIGN KEY (`Tuottaja_id`)
    REFERENCES `RekoRinki`.`Tuottaja` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `RekoRinki`.`Tilaus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Tilaus` (
  `tilausnro` INT NOT NULL AUTO_INCREMENT,
  `asiakasID` INT NOT NULL,
  `tuottajaID` INT NOT NULL,
  `ilmoitusID` INT NOT NULL,
  `status` ENUM('odottaa', 'vahvistettu ', 'toimituksessa', 'suoritettu') NOT NULL DEFAULT 'odottaa',
  `tilauspaiva` DATE NOT NULL,
  `summa` DECIMAL(10,2) NOT NULL,
  `Reitit_id` INT NOT NULL,
  PRIMARY KEY (`tilausnro`),
  INDEX `asiakasID` (`asiakasID` ASC) VISIBLE,
  INDEX `tuottajaID` (`tuottajaID` ASC) VISIBLE,
  INDEX `ilmoitusID` (`ilmoitusID` ASC) VISIBLE,
  INDEX `fk_Tilaus_Reitit1_idx` (`Reitit_id` ASC) VISIBLE,
  CONSTRAINT `tilaus_ibfk_1`
    FOREIGN KEY (`asiakasID`)
    REFERENCES `RekoRinki`.`Asiakas` (`id`),
  CONSTRAINT `tilaus_ibfk_2`
    FOREIGN KEY (`tuottajaID`)
    REFERENCES `RekoRinki`.`Tuottaja` (`id`),
  CONSTRAINT `tilaus_ibfk_3`
    FOREIGN KEY (`ilmoitusID`)
    REFERENCES `RekoRinki`.`Ilmoitukset` (`ilmoitusID`),
  CONSTRAINT `fk_Tilaus_Reitit1`
    FOREIGN KEY (`Reitit_id`)
    REFERENCES `RekoRinki`.`Reitit` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `RekoRinki`.`Ilmoitus_has_Tuotteet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Ilmoitus_has_Tuotteet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tuoteID` INT NOT NULL,
  `tuottajaID` INT NOT NULL,
  `ilmoitusID` INT NOT NULL,
  `maara` INT NOT NULL,
  `yksikkohinta` DECIMAL(10,2) NOT NULL,
  `kuva` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tuoteID` (`tuoteID` ASC) VISIBLE,
  INDEX `tuottajaID` (`tuottajaID` ASC) VISIBLE,
  INDEX `ilmoitusID` (`ilmoitusID` ASC) VISIBLE,
  CONSTRAINT `ilmoitus_has_tuotteet_ibfk_1`
    FOREIGN KEY (`tuoteID`, `tuottajaID`)  -- Korjattu: viittaa molempiin yhdessä
    REFERENCES `RekoRinki`.`Tuotteet` (`tuoteID`, `tuottajaID`),
  CONSTRAINT `ilmoitus_has_tuotteet_ibfk_2`
    FOREIGN KEY (`tuottajaID`)
    REFERENCES `RekoRinki`.`Tuottaja` (`id`),
  CONSTRAINT `ilmoitus_has_tuotteet_ibfk_3`
    FOREIGN KEY (`ilmoitusID`)
    REFERENCES `RekoRinki`.`Ilmoitukset` (`ilmoitusID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `RekoRinki`.`Tilaus_has_Tuotteet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Tilaus_has_Tuotteet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tuoteID` INT NOT NULL,
  `tuottajaID` INT NOT NULL,
  `tilausID` INT NULL,
  `maara` INT NOT NULL,
  `yksikkohinta` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tuoteID` (`tuoteID` ASC) VISIBLE,
  INDEX `tuottajaID` (`tuottajaID` ASC) VISIBLE,
  INDEX `tilausID` (`tilausID` ASC) VISIBLE,
  CONSTRAINT `tilaus_has_tuotteet_ibfk_1`
    FOREIGN KEY (`tuoteID`, `tuottajaID`)  -- Korjattu myös täällä samalla periaatteella
    REFERENCES `RekoRinki`.`Tuotteet` (`tuoteID`, `tuottajaID`),
  CONSTRAINT `tilaus_has_tuotteet_ibfk_2`
    FOREIGN KEY (`tuottajaID`)
    REFERENCES `RekoRinki`.`Tuottaja` (`id`),
  CONSTRAINT `tilaus_has_tuotteet_ibfk_4`
    FOREIGN KEY (`tilausID`)
    REFERENCES `RekoRinki`.`Tilaus` (`tilausnro`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `RekoRinki`.`Reitit_has_Ilmoitukset`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RekoRinki`.`Reitit_has_Ilmoitukset` (
  `Reitit_id` INT NOT NULL,
  `Ilmoitukset_ilmoitusID` INT NOT NULL,
  INDEX `fk_Reitit_has_Ilmoitukset_Ilmoitukset1_idx` (`Ilmoitukset_ilmoitusID` ASC) VISIBLE,
  INDEX `fk_Reitit_has_Ilmoitukset_Reitit1_idx` (`Reitit_id` ASC) VISIBLE,
  PRIMARY KEY (`Reitit_id`, `Ilmoitukset_ilmoitusID`),
  CONSTRAINT `fk_Reitit_has_Ilmoitukset_Reitit1`
    FOREIGN KEY (`Reitit_id`)
    REFERENCES `RekoRinki`.`Reitit` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reitit_has_Ilmoitukset_Ilmoitukset1`
    FOREIGN KEY (`Ilmoitukset_ilmoitusID`)
    REFERENCES `RekoRinki`.`Ilmoitukset` (`ilmoitusID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;