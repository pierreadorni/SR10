# Rapport sécurité SR10

## I Violation de contrôle d’accès
### A Définition:
Référence directe non sécurisée : un développeur expose une référence à un objet d'exécution interne, tel qu’un fichier, un dossier, un enregistrement de base de données ou une clé de base de données. Sans un contrôle d'accès ou une autre protection, les attaquants peuvent manipuler ces références pour accéder à des données non autorisées.
### B Faiblesse détectée:
Un recruteur de l’organisation A peut accéder aux candidatures des offres de l’organisation B s’il connaît l’id de l’offre.

Par exemple: [http://localhost:3000/recruteur/applications/3](http://localhost:3000/recruteur/applications/2) peut être atteint par tous les recruteurs, quelle que soit leur organisation. 
## C Méthode protection:
Lorsque nous avons détecté la vulnérabilité nous avons modifié la route GET'/applications/:id/' de sorte détecter lorsque l’organisation du recruteur ne correspond pas à celle de l’offre (result[0].organisation !== req.session.user.organisation) avant de render la page.

## II Injections SQL
### A Définition:
Une faille d'injection SQL se produit quand une donnée non fiable est envoyée à un interpréteur en tant qu'élément d'une commande ou d'une requête. Les données hostiles de l'attaquant peuvent duper l'interpréteur afin de l'amener à exécuter des commandes fortuites ou accéder à des données non autorisées.
### B Faiblesse détectée:
Vulnérabilité considérée dès le début, nous l’avons prise en compte dans la construction de nos requêtes SQL
### C Méthode protection:
Toutes les requêtes vers la base de données qui reçoivent des paramètres ont été créées de manière  à n'utiliser que des requêtes préparées (en utilisant les prepared statements). Par exemple pour la requete Document.read :

```javascript
db.query('SELECT * FROM Document WHERE id = ?',
    [id],
    (error, results, fields) => {
        if (error) throw error;
        return callback(null, results[0]);
    }
)

```

## III Upload de fichier malicieux
### A Définition:
Lorsqu’un site présente un formulaire d’envoi de fichier non protégé, un utilisateur peut envoyer tous les fichiers qu’il veut, potentiellement malicieux.
### B Faiblesse détectée:
Sur le formulaire pour postuler à une offre, un utilisateur peut uploader tous types de fichier: il pourrait envoyer des pages de phishing par exemple. Il n’y a pas de taille max non plus:  des fichiers volumineux peuvent être envoyés pour effectuer une attaque par déni de service sur une partie du site.
### C Méthode protection
Nous avons effectué des vérifications au moment de l’upload d’une pièce de dossier de candidature: obligatoirement de format .pdf, max. 20Mo /pièce.
