# Version:
0.1.2.4  
Abandon des lectures de fichiers sur le serveur.
Les pièces jointes (PDF de factures ou pièces justificatives) sont désormais fournis par une API.
Aucun fichier n'est plus a déposer sur le serveur. Toutes les données sont désormais servis à l'aide d'une API tierce.
Aucun changement d'utilisation ou d'aspect de l'application.

0.1.2.3
La source des données de suivi n'est plus un fichier JSON déposé sur le serveur mais un  appel vers une API
L'API fourni les données de suivi qui seront affichées.
Aucun changement d'utilisation ou d'aspect de l'application.

0.1.2.0
Ajout d'une page de navigation donnant accès aux factures et aux pièces justificatifs. L'accès à cette page se fait en cliquant sur une facture.

0.1.1
Réorganisation de l'application sur la base d'un composant SPLIT. L'appli est désormais composé d'un menu permettant de naviguer sur 3 onglets différents, l'affichage du suivi, l'affichage des données d'adresse et la référence opensource de l'appli et le répertoire Github l'hébergeant

0.1.0
Première version, les données sont stockés dans des fichiers JSON déposés sur le serveur web publiant l'application.
Les factures sont des PDF également déposé sur le serveur web.
La mise à jour des données nécessite d'avoir une application tierce générant ces fichiers.

# Description
Cette application est utilisé dans le cadre de la gestion d'une association.
Des factures sont émises dans le cadre de l'activité de cette association vers les membres.
Cette aplication permet aux membres de l'association de suivre leurs factures et leurs paiements.
Les factures sont téléchargeables au format PDF.
# Architecture
L'application de suivi n'est que la partie frontend.
Le backend est une autre application Javascript/openui5 qui permet de mettre à jour l'ensemble des données.
Une API permet de publier ces données vers le client.
Les données sont stockés sur une base MySql et les PDF des factures et des pièces justificatives sont sstockés sur le serveur web hébergeant l'API.
# Technologie
Cette appli est codé en Javascript avec le framework openUI5.


