-- =====================================================
-- MN Sushi - Peuplement des tables
-- =====================================================

-- UTILISATEUR
insert into utilisateur (
   nom,
   prenom,
   courriel,
   telephone,
   motdepasse,
   role,
   datecreation
) values ( 'Benali',
           'Yassine',
           'yassine@email.com',
           '5141111111',
           'pass123',
           'client',
           to_date('2026-04-16','YYYY-MM-DD') );

insert into utilisateur (
   nom,
   prenom,
   courriel,
   telephone,
   motdepasse,
   role,
   datecreation
) values ( 'Martin',
           'Julie',
           'julie@email.com',
           '5142222222',
           'pass456',
           'client',
           to_date('2026-04-16','YYYY-MM-DD') );

insert into utilisateur (
   nom,
   prenom,
   courriel,
   telephone,
   motdepasse,
   role,
   datecreation
) values ( 'Admin',
           'Site',
           'admin@mnsushi.com',
           '5143333333',
           'admin789',
           'admin',
           to_date('2026-04-16','YYYY-MM-DD') );

-- CATEGORIE
insert into categorie (
   nomcategorie,
   descriptioncategorie
) values ( 'Sushi',
           'Sushis frais prepares avec poisson et riz vinaigre' );

insert into categorie (
   nomcategorie,
   descriptioncategorie
) values ( 'Maki',
           'Rouleaux de maki avec algue, riz et garnitures variees' );

insert into categorie (
   nomcategorie,
   descriptioncategorie
) values ( 'Nigiri',
           'Riz vinaigre accompagne de poisson ou fruit de mer' );

insert into categorie (
   nomcategorie,
   descriptioncategorie
) values ( 'Boisson',
           'Boissons froides et chaudes pour accompagner le repas' );

-- PRODUIT
insert into produit (
   nomproduit,
   descriptionproduit,
   prix,
   disponibilite,
   categorie_idcategorie
) values ( 'Sushi Saumon',
           'Sushi au saumon frais et riz vinaigre',
           6.99,
           'disponible',
           1 );

insert into produit (
   nomproduit,
   descriptionproduit,
   prix,
   disponibilite,
   categorie_idcategorie
) values ( 'Sushi Thon',
           'Sushi au thon frais et riz vinaigre',
           7.49,
           'disponible',
           1 );

insert into produit (
   nomproduit,
   descriptionproduit,
   prix,
   disponibilite,
   categorie_idcategorie
) values ( 'Maki Avocat',
           'Rouleau maki avec avocat, riz et algue nori',
           5.99,
           'disponible',
           2 );

insert into produit (
   nomproduit,
   descriptionproduit,
   prix,
   disponibilite,
   categorie_idcategorie
) values ( 'Maki Californie',
           'Rouleau maki avec goberge, avocat et concombre',
           8.99,
           'disponible',
           2 );

insert into produit (
   nomproduit,
   descriptionproduit,
   prix,
   disponibilite,
   categorie_idcategorie
) values ( 'Nigiri Crevette',
           'Nigiri avec crevette cuite et riz vinaigre',
           6.49,
           'disponible',
           3 );

insert into produit (
   nomproduit,
   descriptionproduit,
   prix,
   disponibilite,
   categorie_idcategorie
) values ( 'The Vert Japonais',
           'The vert chaud servi avec le repas',
           3.50,
           'disponible',
           4 );

insert into produit (
   nomproduit,
   descriptionproduit,
   prix,
   disponibilite,
   categorie_idcategorie
) values ( 'Ramune',
           'Boisson gazeuse japonaise',
           4.25,
           'indisponible',
           4 );

-- RESERVATION
insert into reservation (
   datereservation,
   heurereservation,
   nombrepersonne,
   status,
   commentaire,
   utilisateur_idutilisateur
) values ( to_date('2026-04-20','YYYY-MM-DD'),
           '18:30',
           2,
           'confirmee',
           'Table pres de la fenetre',
           1 );

insert into reservation (
   datereservation,
   heurereservation,
   nombrepersonne,
   status,
   commentaire,
   utilisateur_idutilisateur
) values ( to_date('2026-04-21','YYYY-MM-DD'),
           '20:00',
           4,
           'en attente',
           'Anniversaire',
           2 );

insert into reservation (
   datereservation,
   heurereservation,
   nombrepersonne,
   status,
   commentaire,
   utilisateur_idutilisateur
) values ( to_date('2026-04-22','YYYY-MM-DD'),
           '19:15',
           3,
           'annulee',
           'Annule par le client',
           1 );

-- AVIS
insert into avis (
   note,
   commentaire,
   dateavis,
   utilisateur_idutilisateur,
   produit_idproduit
) values ( 5,
           'Sushi saumon tres frais et savoureux',
           to_date('2026-04-16','YYYY-MM-DD'),
           1,
           1 );

insert into avis (
   note,
   commentaire,
   dateavis,
   utilisateur_idutilisateur,
   produit_idproduit
) values ( 4,
           'Maki Californie bien prepare et bon service',
           to_date('2026-04-16','YYYY-MM-DD'),
           2,
           4 );

insert into avis (
   note,
   commentaire,
   dateavis,
   utilisateur_idutilisateur,
   produit_idproduit
) values ( 5,
           'The vert excellent avec le repas',
           to_date('2026-04-17','YYYY-MM-DD'),
           1,
           6 );

commit;