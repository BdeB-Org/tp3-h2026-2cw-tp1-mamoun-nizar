# tp3-h2026-2cw-tp1-mamoun-nizar
# MN Sushi - TP3 Application Web dynamique

## 1. Description du projet

MN Sushi est une application Web dynamique développée pour gérer les données d’un restaurant de sushi.

Le projet reprend la base de données conçue dans le TP2 et l’utilise dans une interface Web. L’application permet de consulter, ajouter et supprimer des données à partir d’une base de données Oracle connectée avec Oracle REST Data Services.

Le but du projet est de créer une application frontend complète avec HTML, CSS et JavaScript, en utilisant des endpoints ORDS pour communiquer avec la base de données.

---

## 2. Sujet du projet

Le site représente un restaurant nommé **MN Sushi**.

L’application permet de gérer :

- les utilisateurs;
- les catégories de produits;
- les produits du menu;
- les réservations;
- les avis des clients.

---

## 3. Technologies utilisées

- HTML
- CSS
- JavaScript
- Oracle Database
- Oracle REST Data Services
- SQL Developer
- Live Server
- Git
- GitHub

---

## 4. Structure du projet

```txt
MNSushi-projet/
│
├── css/
│   └── style.css
│
├── html/
│   ├── index.html
│   ├── produits.html
│   ├── reservations.html
│   ├── utilisateurs.html
│   ├── categories.html
│   └── avis.html
│
├── js/
│   ├── api.js
│   ├── shared.js
│   ├── produits.js
│   ├── reservations.js
│   ├── utilisateurs.js
│   ├── categories.js
│   └── avis.js
│
├── sql/
│   ├── CreationTables.sql
│   └── PeuplementTables.sql
│
├── README.md
└── journal_apprentissage.md