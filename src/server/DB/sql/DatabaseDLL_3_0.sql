-- ************************************** `KRSITEV`

CREATE TABLE `KRSITEV`
(
 `ID_krsitev`   integer NOT NULL AUTO_INCREMENT ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `Vsebina`      varchar(500) NOT NULL ,

PRIMARY KEY (`ID_krsitev`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_36` (`ID_uporabnik`, `Tip`)
);

-- ************************************** `OCENA`

CREATE TABLE `OCENA`
(
 `ID_ocena`     integer NOT NULL AUTO_INCREMENT ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `Vrednost`     float NOT NULL ,

PRIMARY KEY (`ID_ocena`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_39` (`ID_uporabnik`, `Tip`)
) AUTO_INCREMENT=0;

-- ************************************** `OGLAS`

CREATE TABLE `OGLAS`
(
 `ID_oglas`     integer NOT NULL AUTO_INCREMENT ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `Lokacija_lat` varchar(500) NULL ,
 `CasZacetka`   datetime NOT NULL ,
 `CasKonca`     datetime NOT NULL ,
 `JeAktiven`    smallint NOT NULL DEFAULT 1 ,
 `Lokacija_lng` varchar(500) NULL ,
 `Lokacija`     varchar(500) NULL ,

PRIMARY KEY (`ID_oglas`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_45` (`ID_uporabnik`, `Tip`)
) AUTO_INCREMENT=0;

-- ************************************** `OGLAS_PASME`

CREATE TABLE `OGLAS_PASME`
(
 `ID_oglas`     integer NOT NULL ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `ID_pasma`     integer NOT NULL ,

PRIMARY KEY (`ID_oglas`, `ID_uporabnik`, `Tip`, `ID_pasma`),
KEY `fkIdx_113` (`ID_oglas`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_119` (`ID_pasma`)
);

-- ************************************** `PASMA`

CREATE TABLE `PASMA`
(
 `ID_pasma`     integer NOT NULL ,
 `Pasma_ime`    varchar(100) NOT NULL ,
 `Temperament`  varchar(500) NULL ,
 `WikiPasmeUrl` varchar(500) NULL ,
 `Visina`       varchar(100) NULL ,
 `Teza`         varchar(100) NULL ,

PRIMARY KEY (`ID_pasma`)
);

-- ************************************** `PES`

CREATE TABLE `PES`
(
 `ID_pes`       integer NOT NULL AUTO_INCREMENT ,
 `ID_uporabnik` integer NOT NULL ,
 `Tip`          integer NOT NULL ,
 `ID_pasma`     integer NOT NULL ,
 `Ime_pes`      varchar(45) NOT NULL ,
 `Opis_pes`     varchar(500) NULL ,
 `Spol`         smallint NOT NULL ,
 `JeIzbrisan`   smallint NOT NULL DEFAULT 0 ,

PRIMARY KEY (`ID_pes`, `ID_uporabnik`, `Tip`),
KEY `fkIdx_122` (`ID_pasma`),
KEY `fkIdx_88` (`ID_uporabnik`, `Tip`)
);

-- ************************************** `SPREHAJALEC`

CREATE TABLE `SPREHAJALEC`
(
 `ID_uporabnik`   integer NOT NULL ,
 `Tip`            integer NOT NULL ,
 `OdzivniCas`     integer NULL ,
 `PovprecnaOcena` float NULL ,
 `Index`          float NOT NULL DEFAULT 0 ,
 `StSprehodov`    integer NOT NULL DEFAULT 0 ,

PRIMARY KEY (`ID_uporabnik`, `Tip`),
KEY `fkIdx_15` (`ID_uporabnik`, `Tip`)
);

-- ************************************** `SPREHOD`

CREATE TABLE `SPREHOD`
(
 `ID_sprehod`      integer NOT NULL AUTO_INCREMENT ,
 `ID_pes`          integer NOT NULL ,
 `ID_uporabnik`    integer NOT NULL ,
 `ID_oglas`        integer NOT NULL ,
 `Tip_sprehajalec` integer NOT NULL ,
 `Tip_lastnik`     integer NOT NULL ,
 `Status`          smallint NULL DEFAULT null ,
 `DatumKreiranja`  datetime NOT NULL ,
 `CasOdziva`       datetime NULL ,
 `novaSprememba`   smallint NOT NULL DEFAULT 1 ,
 `Priljubljen`     smallint NOT NULL DEFAULT 0 ,

PRIMARY KEY (`ID_sprehod`, `ID_pes`, `ID_uporabnik`, `ID_oglas`, `Tip_sprehajalec`, `Tip_lastnik`),
KEY `fkIdx_77` (`ID_pes`, `ID_uporabnik`, `Tip_lastnik`),
KEY `fkIdx_81` (`ID_oglas`, `ID_uporabnik`, `Tip_sprehajalec`)
) AUTO_INCREMENT=0;

-- ************************************** `UPORABNIK`

CREATE TABLE `UPORABNIK`
(
 `ID_uporabnik`      integer NOT NULL AUTO_INCREMENT ,
 `Tip`               integer NOT NULL ,
 `Ime_uporabnik`     varchar(20) NOT NULL ,
 `Geslo`             varchar(200) NOT NULL ,
 `Email`             varchar(254) NOT NULL ,
 `GSM`               integer NULL ,
 `Aktiviran`         smallint NOT NULL DEFAULT 0 ,
 `DatumUstvaritve`   datetime NOT NULL ,
 `DatumSpremembe`    datetime NOT NULL ,
 `DatumDeaktivacije` datetime NULL ,

PRIMARY KEY (`ID_uporabnik`, `Tip`)
) AUTO_INCREMENT=0;


-- ************************************** `CONSTRAINTS`
-- ************************************** `KRSITEV`

ALTER TABLE `KRSITEV`
ADD CONSTRAINT `FK_35` FOREIGN KEY `fkIdx_36` (`ID_uporabnik`, `Tip`) REFERENCES `SPREHAJALEC` (`ID_uporabnik`, `Tip`);

-- ************************************** `OCENA`

ALTER TABLE `OCENA`
ADD CONSTRAINT `FK_38` FOREIGN KEY `fkIdx_39` (`ID_uporabnik`, `Tip`) REFERENCES `SPREHAJALEC` (`ID_uporabnik`, `Tip`);
ALTER TABLE `OCENA`
ADD CONSTRAINT `check_87` CHECK ( Vrednost>=0 AND Vrednost<=5 );

-- ************************************** `OGLAS`

ALTER TABLE `OGLAS`
ADD CONSTRAINT `FK_44` FOREIGN KEY `fkIdx_45` (`ID_uporabnik`, `Tip`) REFERENCES `SPREHAJALEC` (`ID_uporabnik`, `Tip`);
ALTER TABLE `OGLAS`
ADD CONSTRAINT `check_131` CHECK ( JeAktiven>=0 );
ALTER TABLE `OGLAS`
ADD CONSTRAINT `check_132` CHECK ( JeAktiven<2 );

-- ************************************** `OGLAS_PASME`

ALTER TABLE `OGLAS_PASME`
ADD CONSTRAINT `FK_112` FOREIGN KEY `fkIdx_113` (`ID_oglas`, `ID_uporabnik`, `Tip`) REFERENCES `OGLAS` (`ID_oglas`, `ID_uporabnik`, `Tip`);
ALTER TABLE `OGLAS_PASME`
ADD CONSTRAINT `FK_118` FOREIGN KEY `fkIdx_119` (`ID_pasma`) REFERENCES `PASMA` (`ID_pasma`);

-- ************************************** `PASMA`



-- ************************************** `PES`

ALTER TABLE `PES`
ADD CONSTRAINT `FK_121` FOREIGN KEY `fkIdx_122` (`ID_pasma`) REFERENCES `PASMA` (`ID_pasma`);
ALTER TABLE `PES`
ADD CONSTRAINT `FK_87` FOREIGN KEY `fkIdx_88` (`ID_uporabnik`, `Tip`) REFERENCES `UPORABNIK` (`ID_uporabnik`, `Tip`);
ALTER TABLE `PES`
ADD CONSTRAINT `check_101` CHECK ( Tip=2 );
ALTER TABLE `PES`
ADD CONSTRAINT `check_129` CHECK ( Spol>=0 );
ALTER TABLE `PES`
ADD CONSTRAINT `check_130` CHECK ( Spol<2 );
ALTER TABLE `PES`
ADD CONSTRAINT `check_138` CHECK ( JeIzbrisan>=0 );
ALTER TABLE `PES`
ADD CONSTRAINT `check_139` CHECK ( JeIzbrisan<2 );

-- ************************************** `SPREHAJALEC`

ALTER TABLE `SPREHAJALEC` 
ADD CONSTRAINT `FK_14` FOREIGN KEY `fkIdx_15` (`ID_uporabnik`, `Tip`) REFERENCES `UPORABNIK` (`ID_uporabnik`, `Tip`);
ALTER TABLE `SPREHAJALEC` 
ADD CONSTRAINT `check_100` CHECK ( Tip<=1 );

-- ************************************** `SPREHOD`

ALTER TABLE `SPREHOD`
ADD CONSTRAINT `FK_76` FOREIGN KEY `fkIdx_77` (`ID_pes`, `ID_uporabnik`, `Tip_lastnik`) REFERENCES `PES` (`ID_pes`, `ID_uporabnik`, `Tip`);
ALTER TABLE `SPREHOD`
ADD CONSTRAINT `FK_80` FOREIGN KEY `fkIdx_81` (`ID_oglas`, `ID_uporabnik`, `Tip_sprehajalec`) REFERENCES `OGLAS` (`ID_oglas`, `ID_uporabnik`, `Tip`);
ALTER TABLE `SPREHOD`
ADD CONSTRAINT `check_133` CHECK ( novaSprememba>=0 );
ALTER TABLE `SPREHOD`
ADD CONSTRAINT `check_134` CHECK ( novaSprememba<2 );
ALTER TABLE `SPREHOD`
ADD CONSTRAINT `check_135` CHECK ( Priljubljen>=0 );
ALTER TABLE `SPREHOD`
ADD CONSTRAINT `check_136` CHECK ( Priljubljen<2 );

-- ************************************** `UPORABNIK`

ALTER TABLE `UPORABNIK`
ADD CONSTRAINT `check_91` CHECK ( Tip<4 );
ALTER TABLE `UPORABNIK`
ADD CONSTRAINT `check_127` CHECK ( Aktiviran < 2 );
ALTER TABLE `UPORABNIK`
ADD CONSTRAINT `check_128` CHECK ( Aktiviran>=0 );