sap.ui.require([
	"sap/ui/test/opaQunit"
], function () {
	"use strict";

    QUnit.module("Navigation");
    opaTest("Arrivé sur Page Adresse", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyAppInAFrame("../../index.html?parent=AZERTY1234");
		//Actions

        When.onTheMenuPage.iPressListItem("Famille");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Famille","famille");
	});
    opaTest("Retour vers la page menu", function (Given, When, Then) {
		// Arrangements
        When.onTheAppPage.iPressButtonBack("ecole.famille.view.Famille", "famille");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Menu","menu");

	});
    opaTest("Navigation sur Page A Propos", function (Given, When, Then) {
		// Arrangements
        When.onTheMenuPage.iPressListItem("Apropos");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Apropos","apropos");

	});
    opaTest("Retour vers la page menu", function (Given, When, Then) {
		// Arrangements
        When.onTheAppPage.iPressButtonBack("ecole.famille.view.Apropos", "apropos");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Menu","menu");

	});
    opaTest("Navigation sur Page Suivi", function (Given, When, Then) {
		// Arrangements
        When.onTheMenuPage.iPressListItem("Suivi");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Suivi","suivi");
	});
    opaTest("Retour vers la page menu", function (Given, When, Then) {
		// Arrangements
        When.onTheAppPage.iPressButtonBack("ecole.famille.view.Suivi", "suivi");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Menu","menu").and.iTeardownMyAppFrame();
	});

});
