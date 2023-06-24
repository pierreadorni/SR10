USE SR10;
INSERT INTO Organisation (siren, nom, rue, ville, region, codePostal, pays, validated)
       VALUES ('123456789','Spotifail', '15 Rue de la Paix', 'Paris', 'Ile-de-France', 75001, 'France', TRUE),
       ('987654321','Saint-Cloux', '10 Downing Street', 'London', 'Greater London', 54001, 'United Kingdom', TRUE);

INSERT INTO Utilisateur (typeUtilisateur, email, nom, prenom, dateCreation, statutCompte, mdpHash, organisation)
VALUES ('Administrateur', 'admin@example.com', 'Doe', 'John', '2022-01-01', 'actif', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', NULL),
       ('Recruteur', 'recruiter@example.com', 'Smith', 'Jane', '2022-01-02', 'actif', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '123456789'),
       ('Candidat', 'candidate@example.com', 'Lee', 'Alex', '2022-01-03', 'actif', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', NULL),
       ('Candidat', 'bientotRecruteur@example.com', 'Mama', 'Joe', '2022-01-03', 'actif', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', NULL),
       ('Candidat', 'candidate2@example.com', 'anon', 'john', '2023-01-03', 'actif', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', NULL);

INSERT INTO FichePoste (organisation, dateUpload, intitule, responsable, typeMetier, rythme, fourchetteBasse, fourchetteHaute, description, localisation)
VALUES ('123456789', '2022-01-01', 'Développeur Full-Stack', 'Doe John', 'Informatique', 'CDI', 35000, 45000, 'Nous cherchons un développeur Full-Stack expérimenté pour rejoindre notre équipe dynamique.', 'Paris'),
       ('123456789', '2022-01-02', 'Chef de projet marketing', 'Smith Jane', 'Marketing', 'CDI', 40000, 50000, 'Nous cherchons un chef de projet marketing passionné pour mener notre équipe de marketing.','Paris' ),
       ('987654321', '2022-01-03', 'Assistant administratif', 'Lee Alex', 'Administration', 'CDD', 20000, 25000, 'Nous cherchons un assistant administratif à temps partiel pour soutenir nos opérations quotidiennes.','London');

INSERT INTO Offre (dateUpload, fichePoste)
VALUES ('2022-01-01', 1),
       ('2022-01-02', 2),
       ('2022-01-03', 3);

INSERT INTO DossierCandidature (dateCandidature, statut, utilisateur, offre)
VALUES ('2022-01-05', 'refusé', 3, 1),
       ('2022-01-07', 'en attente de traitement', 5, 1),
       ('2022-01-07', 'en attente de traitement', 5, 2),
       ('2022-01-07', 'en attente de traitement', 5, 3),
       ('2022-01-06', 'accepté', 3, 2),
       ('2022-01-07', 'en attente de traitement', 3, 3);

INSERT INTO Document (dateUpload, nom, type, dossierCandidature)
VALUES ('2022-01-05', 'CV', 'PDF', 1),
       ('2022-01-05', 'Lettre de motivation', 'PDF', 1),
       ('2022-01-06', 'CV', 'PDF', 2),
       ('2022-01-06', 'Lettre de motivation', 'PDF', 2);

INSERT INTO demandeRecruteur (dateDemande, statut, organisation, utilisateur)
VALUES ('2022-01-01', 'accepte', '123456789', 2),
       ('2022-01-01', 'accepte', '123456789', 2),
       ('2022-01-02', 'refuse', '987654321', 2),
       ('2022-01-02', 'en attente', '123456789',4);