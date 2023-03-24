DROP DATABASE IF EXISTS Projet;
CREATE DATABASE Projet;

USE Projet;

CREATE TABLE Organisation (
                              siren VARCHAR(255) NOT NULL,
                              rue VARCHAR(255) NOT NULL,
                              ville VARCHAR(255) NOT NULL,
                              region VARCHAR(255) NOT NULL,
                              codePostal INT NOT NULL,
                              pays VARCHAR(255) NOT NULL,
                              PRIMARY KEY (siren)
);

CREATE TABLE Utilisateur (
                             id INT NOT NULL AUTO_INCREMENT,
                             typeUtilisateur ENUM('Administrateur', 'Recruteur', 'Candidat') NOT NULL,
                             email VARCHAR(255) NOT NULL,
                             nom VARCHAR(255) NOT NULL,
                             prenom VARCHAR(255) NOT NULL,
                             dateCreation DATE NOT NULL,
                             statutCompte ENUM('actif', 'inactif', 'bannis') NOT NULL,
                             mdpHash VARCHAR(255) NOT NULL,
                             organisation VARCHAR(255),
                             PRIMARY KEY (id),
                             FOREIGN KEY (organisation) REFERENCES Organisation(siren),
                             CHECK ((typeUtilisateur IN ('Administrateur', 'Candidat') AND organisation IS NULL) OR (typeUtilisateur = 'Recruteur' AND organisation IS NOT NULL))
);

CREATE TABLE FichePoste (
                            id INT NOT NULL AUTO_INCREMENT,
                            dateUpload DATE NOT NULL,
                            intitule VARCHAR(255) NOT NULL,
                            responsable VARCHAR(255) NOT NULL,
                            typeMetier VARCHAR(255) NOT NULL,
                            rythme VARCHAR(255) NOT NULL,
                            fourchetteBasse INT NOT NULL,
                            fourchetteHaute INT NOT NULL,
                            description TEXT NOT NULL,
                            PRIMARY KEY (id)
);

CREATE TABLE Offre (
                       numeroOffre INT NOT NULL AUTO_INCREMENT,
                       dateUpload DATE NOT NULL,
                       type VARCHAR(255) NOT NULL,
                       fichePoste INT NOT NULL,
                       PRIMARY KEY (numeroOffre),
                       FOREIGN KEY (fichePoste) REFERENCES FichePoste(id)
);

CREATE TABLE DossierCandidature (
                                    id INT NOT NULL AUTO_INCREMENT,
                                    dateCandidature DATE NOT NULL,
                                    statut ENUM('en cours', 'refusé', 'en attente de traitement', 'accepté') NOT NULL,
                                    utilisateur INT,
                                    offre INT,
                                    PRIMARY KEY (id),
                                    FOREIGN KEY (utilisateur) REFERENCES Utilisateur(id),
                                    FOREIGN KEY (offre) REFERENCES Offre(numeroOffre),
                                    CHECK (statut IN ('en cours', 'refusé', 'en attente de traitement', 'accepté'))
);

CREATE TABLE Document (
                          id INT NOT NULL AUTO_INCREMENT,
                          dateUpload DATE NOT NULL,
                          nom VARCHAR(255) NOT NULL,
                          type VARCHAR(255) NOT NULL,
                          dossierCandidature INT NOT NULL,
                          PRIMARY KEY (id),
                          FOREIGN KEY (dossierCandidature) REFERENCES DossierCandidature(id)
);

CREATE TABLE demandeRecruteur (
                                  id INT NOT NULL AUTO_INCREMENT,
                                  dateDemande DATE NOT NULL,
                                  statut ENUM('refuse', 'accepte') NOT NULL,
                                  organisation VARCHAR(255) NOT NULL,
                                  utilisateur INT NOT NULL,
                                  PRIMARY KEY (id),
                                  FOREIGN KEY (organisation) REFERENCES Organisation(siren),
                                  FOREIGN KEY (utilisateur) REFERENCES Utilisateur(id),
                                  CHECK (statut IN ('refuse', 'accepte'))
);





