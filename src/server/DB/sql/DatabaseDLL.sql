
CREATE TABLE `Krsitev`
(
 `ID_krsitev`   integer NOT NULL AUTO_INCREMENT ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `Vsebina`      varchar(500) NOT NULL ,

PRIMARY KEY (`ID_krsitev`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_36` (`ID_uporabnik`, `Tip`)
);


CREATE TABLE `Ocena`
(
 `ID_ocena`     integer NOT NULL AUTO_INCREMENT ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `Vrednost`     float NOT NULL ,

PRIMARY KEY (`ID_ocena`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_39` (`ID_uporabnik`, `Tip`),
CONSTRAINT `check_87` CHECK ( Vrednost>=0 AND Vrednost<=5 )
) AUTO_INCREMENT=0;


CREATE TABLE `Oglas`
(
 `ID_oglas`     integer NOT NULL AUTO_INCREMENT ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `Lokacija`     varchar(500) NOT NULL ,
 `CasZacetka`   datetime NOT NULL ,
 `CasKonca`     datetime NOT NULL ,

PRIMARY KEY (`ID_oglas`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_45` (`ID_uporabnik`, `Tip`)
) AUTO_INCREMENT=0;


CREATE TABLE `Pes`
(
 `ID_pes`       integer NOT NULL AUTO_INCREMENT ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `Ime_pes`      varchar(45) NOT NULL ,
 `Opis_pes`     varchar(500) NULL ,
 `Spol`         binary NOT NULL ,
 `Pasma_ime`    varchar(100) NOT NULL ,
 `Temperament`  varchar(200) NOT NULL ,
 `WikiPasmeUrl` varchar(500) NOT NULL ,
 `Visina`       integer NOT NULL ,
 `Teza`         integer NOT NULL ,

PRIMARY KEY (`ID_pes`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_88` (`ID_uporabnik`, `Tip`),
CONSTRAINT `check_101` CHECK ( Tip=2 )
);

CREATE TABLE `Sprehajalec`
(
 `ID_uporabnik`   integer NOT NULL ,
 `Tip`            integer NOT NULL ,
 `OdzivniCas`     integer NULL ,
 `PovprecnaOcena` float NULL ,
 `Index`          float NOT NULL DEFAULT 0 ,
 `StSprehodov`    integer NOT NULL DEFAULT 0 ,

PRIMARY KEY (`ID_uporabnik`, `Tip`),
KEY `fkIdx_15` (`ID_uporabnik`, `Tip`),
CONSTRAINT `check_100` CHECK ( Tip<=1 )
);

CREATE TABLE `Sprehod`
(
 `ID_sprehod`     integer NOT NULL AUTO_INCREMENT ,
 `ID_pes`         integer NOT NULL ,
 `ID_uporabnik`   integer NOT NULL ,
 `ID_oglas`       integer NOT NULL ,
 `Tip`            integer NOT NULL ,
 `Tip_1_1`        integer NOT NULL ,
 `Status`         binary NULL DEFAULT null ,
 `DatumKreiranja` datetime NOT NULL ,
 `CasOdziva`      datetime NULL ,
 `novaSprememba`  binary NOT NULL DEFAULT 1 ,
 `Priljubljen`    binary NOT NULL DEFAULT 0 ,

PRIMARY KEY (`ID_sprehod`, `ID_pes`, `ID_uporabnik`, `ID_oglas`, `Tip`, `Tip_1_1`),
KEY `fkIdx_77` (`ID_pes`, `ID_uporabnik`, `Tip_1_1`),
KEY `fkIdx_81` (`ID_oglas`, `ID_uporabnik`, `Tip`)
) AUTO_INCREMENT=0;

CREATE TABLE `Uporabnik`
(
 `ID_uporabnik`      integer NOT NULL AUTO_INCREMENT ,
 `Tip`               integer NOT NULL ,
 `Ime_uporabnik`     varchar(20) NOT NULL ,
 `Geslo`             varchar(200) NOT NULL ,
 `Email`             varchar(254) NOT NULL ,
 `GSM`               integer NULL ,
 `Aktiviran`         binary NOT NULL DEFAULT 0 ,
 `DatumUstvaritve`   datetime NOT NULL ,
 `DatumSpremembe`    datetime NOT NULL ,
 `DatumDeaktivacije` datetime NULL ,

PRIMARY KEY (`ID_uporabnik`, `Tip`),
 CONSTRAINT `check_91` CHECK ( Tip<4 )
) AUTO_INCREMENT=0;

ALTER TABLE `Krsitev`
ADD CONSTRAINT `FK_35` FOREIGN KEY `fkIdx_36` (`ID_uporabnik`, `Tip`) REFERENCES `Sprehajalec` (`ID_uporabnik`, `Tip`);

ALTER TABLE `Ocena`
ADD CONSTRAINT `FK_38` FOREIGN KEY `fkIdx_39` (`ID_uporabnik`, `Tip`) REFERENCES `Sprehajalec` (`ID_uporabnik`, `Tip`);

ALTER TABLE `Oglas`
ADD CONSTRAINT `FK_44` FOREIGN KEY `fkIdx_45` (`ID_uporabnik`, `Tip`) REFERENCES `Sprehajalec` (`ID_uporabnik`, `Tip`);

ALTER TABLE `Pes`
ADD CONSTRAINT `FK_87` FOREIGN KEY `fkIdx_88` (`ID_uporabnik`, `Tip`) REFERENCES `Uporabnik` (`ID_uporabnik`, `Tip`);

ALTER TABLE `Sprehajalec`
ADD CONSTRAINT `FK_14` FOREIGN KEY `fkIdx_15` (`ID_uporabnik`, `Tip`) REFERENCES `Uporabnik` (`ID_uporabnik`, `Tip`);

ALTER TABLE `Sprehod`
ADD CONSTRAINT `FK_76` FOREIGN KEY `fkIdx_77` (`ID_pes`, `ID_uporabnik`, `Tip_1_1`) REFERENCES `Pes` (`ID_pes`, `ID_uporabnik`, `Tip`);
ALTER TABLE `Sprehod`
ADD CONSTRAINT `FK_80` FOREIGN KEY `fkIdx_81` (`ID_oglas`, `ID_uporabnik`, `Tip`) REFERENCES `Oglas` (`ID_oglas`, `ID_uporabnik`, `Tip`);













