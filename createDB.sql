DROP DATABASE IF EXISTS SR10;
CREATE DATABASE SR10;

USE SR10;

CREATE TABLE Organisation
(
    siren      VARCHAR(255) NOT NULL,
    nom        VARCHAR(255) NOT NULL,
    rue        VARCHAR(255) NOT NULL,
    ville      VARCHAR(255) NOT NULL,
    region     VARCHAR(255) NOT NULL,
    codePostal INT          NOT NULL,
    pays       VARCHAR(255) NOT NULL,
    PRIMARY KEY (siren)
);

CREATE TABLE Utilisateur
(
    id              INT                                              NOT NULL AUTO_INCREMENT,
    typeUtilisateur ENUM ('Administrateur', 'Recruteur', 'Candidat') NOT NULL,
    email           VARCHAR(255)                                     NOT NULL,
    nom             VARCHAR(255)                                     NOT NULL,
    prenom          VARCHAR(255)                                     NOT NULL,
    dateCreation    DATE                                             NOT NULL,
    statutCompte    ENUM ('actif', 'inactif', 'bannis')              NOT NULL,
    mdpHash         VARCHAR(255)                                     NOT NULL,
    organisation    VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (organisation) REFERENCES Organisation (siren) ON DELETE CASCADE,
    #on delete cascade
    CHECK ((typeUtilisateur IN ('Administrateur', 'Candidat') AND organisation IS NULL) OR
           (typeUtilisateur = 'Recruteur' AND organisation IS NOT NULL))

);

CREATE TABLE FichePoste
(
    id              INT          NOT NULL AUTO_INCREMENT,
    organisation    VARCHAR(255),
    dateUpload      DATE         NOT NULL,
    intitule        VARCHAR(255) NOT NULL,
    responsable     VARCHAR(255) NOT NULL,
    typeMetier      VARCHAR(255) NOT NULL,
    rythme          VARCHAR(255) NOT NULL,
    fourchetteBasse INT          NOT NULL,
    fourchetteHaute INT          NOT NULL,
    description     TEXT         NOT NULL,
    localisation VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (organisation) REFERENCES Organisation (siren) ON DELETE CASCADE
);

CREATE TABLE Offre
(
    numeroOffre INT          NOT NULL AUTO_INCREMENT,
    dateUpload  DATE         NOT NULL,
    type        VARCHAR(255) NOT NULL,
    fichePoste  INT          NOT NULL,
    PRIMARY KEY (numeroOffre),
    FOREIGN KEY (fichePoste) REFERENCES FichePoste (id) ON DELETE CASCADE
);

CREATE TABLE DossierCandidature
(
    id              INT                                                                NOT NULL AUTO_INCREMENT,
    dateCandidature DATE                                                               NOT NULL,
    statut          ENUM ('refusé', 'en attente de traitement', 'accepté') NOT NULL,
    utilisateur     INT,
    offre           INT,
    PRIMARY KEY (id),
    FOREIGN KEY (utilisateur) REFERENCES Utilisateur (id) ON DELETE CASCADE,
    FOREIGN KEY (offre) REFERENCES Offre (numeroOffre) ON DELETE CASCADE,
    CHECK (statut IN ('refusé', 'en attente de traitement', 'accepté'))
);

CREATE TABLE Document
(
    id                 INT          NOT NULL AUTO_INCREMENT,
    dateUpload         DATE         NOT NULL,
    nom                VARCHAR(255) NOT NULL,
    type               VARCHAR(255) NOT NULL,
    dossierCandidature INT          NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dossierCandidature) REFERENCES DossierCandidature (id) ON DELETE CASCADE
);

CREATE TABLE demandeRecruteur
(
    id           INT                                      NOT NULL AUTO_INCREMENT,
    dateDemande  DATE                                     NOT NULL DEFAULT (CURRENT_DATE),
    statut       ENUM ('en attente', 'refuse', 'accepte') NOT NULL DEFAULT 'en attente',
    organisation VARCHAR(255)                             NOT NULL,
    utilisateur  INT                                      NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (organisation) REFERENCES Organisation (siren) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur) REFERENCES Utilisateur (id) ON DELETE CASCADE,
    CHECK (statut IN ('en attente', 'refuse', 'accepte'))
);





