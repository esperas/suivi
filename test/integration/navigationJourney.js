sap.ui.require([
	"sap/ui/test/opaQunit"
], function () {
	"use strict";
	QUnit.module("Connexion");
	opaTest("Connexion sans Login", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyAppInAFrame("../../index.html");
		//Actions

        //When.onTheAppPage.iPressTheSayHelloWithDialogButton();
		// Assertions
		Then.onTheAppPage.theNoLoginScreenShouldBeDisplay().
			and.iTeardownMyAppFrame();
	});
    opaTest("Connexion avec Login inexistant", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyAppInAFrame("../../index.html?parent=AQWXSZED");
		//Actions

        //When.onTheAppPage.iPressTheSayHelloWithDialogButton();
		// Assertions
		Then.onTheAppPage.theNoLoginScreenShouldBeDisplay().
			and.iTeardownMyAppFrame();
	});
    QUnit.module("Navigation");
    opaTest("Navigation sur Page Adresse", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyAppInAFrame("../../index.html?parent=AZERTY1234");
		//Actions

        When.onTheMenuPage.iPressListItem("Famille");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Famille","famille");
	});
    opaTest("Navigation sur Page A Propos", function (Given, When, Then) {
		// Arrangements
        When.onTheMenuPage.iPressListItem("Apropos");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Apropos","apropos");

	});
    opaTest("Navigation sur Page Suivi", function (Given, When, Then) {
		// Arrangements
        When.onTheMenuPage.iPressListItem("Suivi");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Suivi","suivi").
			and.iTeardownMyAppFrame();
	});
    QUnit.module("Bouton RIB");
    opaTest("Bouton RIB caché", function (Given, When, Then) {
        Given.iStartMyAppInAFrame("../../index.html?parent=AZERTY1234");

        Then.onTheSuiviPage.RIBShouldBeHide().
			and.iTeardownMyAppFrame();
    });


});
