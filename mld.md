MLD:
Utilisateur(#id,type: enum: {Administrateur, Recruteur, Candidat},email: string, nom: string, prenom: string, dateCreation: Date, statutCompte: enum: {actif, inactif, bannis}, mdpHash: string, organisation=>Organisation)
avec type, email, nom, prenom, dateCreation, statutCompte, mdpHash NOT NULL;
organisation is NULL if type is Administrateur or Candidat; organisation not NULL if type is Recruteur

Organisation (#siren: string, rue: string, ville: string, region: string, codePostal: int, pays: string)
avec rue, ville region, codePostal, pays NOT NULL

Offre(#numeroOffre: int , dateUpload:Date, type: string, fichePoste => FichePoste)
avec dateUpload, type, fichePoste NOT NULL

DossierCandidature(#id: int, dateCandidature: Date, statut: enum: {en cours, refusé, en attente de traitement, accepté, utilisateur=> Utilisateur, offre => Offre)

FichePoste(#id,  dateUpload: Date, intitule: string, responsable: string, typeMetier: string, rythme: string, fourchetteBasse: int, fourchetteHaute: int, description: string)

demandeRecruteur(#id, dateDemande: Date, statut: enum: {refuse, accepte}, organisation=> Organisation, utilisateur=> Utilisateur)

Document(#id, dateUpload: Date, nom: string, type: string, dossierCandidature => DossierCandidature)


