# Musilearn

Musilearn est une application web conçue pour aider les professeurs de musique à gérer leurs cours et les élèves à suivre leur progression.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) 

## Installation

1. Clonez le dépôt de l'application sur votre machine locale :

   ```bash
   git clone git@github.com:Balthiii/NextJs.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd musilearn
   ```

3. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

## Lancer l'application

Pour démarrer l'application en mode développement, exécutez la commande suivante :

```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Fonctionnalités

1. **Authentification**
   - Système de connexion avec email/mot de passe via NextAuth.js
   - Page de connexion personnalisée

2. **Interface Professeur**
   - Dashboard avec vue d'ensemble des cours
   - Gestion des cours (CRUD)
   - Suivi des élèves
   - Évaluation des progrès

3. **Interface Élève**
   - Inscription aux cours
   - Consultation des évaluations
   - Historique des cours

4. **Administration**
   - Gestion des utilisateurs
   - Attribution des cours
