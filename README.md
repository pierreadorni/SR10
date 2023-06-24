# SR10 P23
Projet de **Alexandre Laval** et **Pierre adorni**

## Installation
***

Clonez le projet
```bash
git clone git@github.com:pierreadorni/SR10.git
```

Installez les dépendances
```bash
npm install
```

Créez les dossiers `/sessions` et `/uploads`
```bash
mkdir sessions
mkdir uploads
```
Créez le fichier .env à la racine du projet, et ajoutez-y les variables d'environnement suivantes :
```bash
MYSQL_HOST=***
MYSQL_USER=***
MYSQL_PASS=***
MYSQL_DB=***
```

Exécutez le script de migration de la base de données (avec `--test-data` pour ajouter des données de test)
```bash
npm run migrate -- --test-data
```

## Utilisation
***

```bash
npm start
```
Le serveur de développement est maintenant accessible à l'adresse [http://localhost:3000](http://localhost:3000)

