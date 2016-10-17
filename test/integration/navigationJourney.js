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
		Then.onTheAppPage.theNoLoginScreenShouldBeDisplay()
			.and.iTeardownMyAppFrame();
	});
    QUnit.module("Navigation");
    opaTest("Navigation sur Page Adresse", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyAppInAFrame("../../index.html?parent=AZERTY1234");
		//Actions

        When.onTheMenuPage.iPressListItem("Famille");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Famille","famille")
            .and.iTeardownMyAppFrame();
	});
    opaTest("Navigation sur Page A Propos", function (Given, When, Then) {
        Given.iStartMyAppInAFrame("../../index.html?parent=AZERTY1234");
		// Arrangements
        When.onTheMenuPage.iPressListItem("Apropos");
		// Assertions
		Then.onTheAppPage.thisScreenShouldBeDisplay("ecole.famille.view.Apropos","apropos")
            .and.iTeardownMyAppFrame();

	});
    opaTest("Navigation sur Page Suivi", function (Given, When, Then) {
        Given.iStartMyAppInAFrame("../../index.html?parent=AZERTY1234");
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
    });   // Test non fiable, le bouton RIB disparait dans l'overflow mais est d'abord visible
    opaTest("Bouton RIB visible", function (Given, When, Then) {
        Given.iStartMyAppInAFrame("../../index.html?parent=AZERTY6666");

        Then.onTheSuiviPage.RIBShouldBeVisible();
			//and.iTeardownMyAppFrame();
    });
    QUnit.module("Navigation sur items du suivi");
    opaTest("Facture N104 navigable", function (Given, When, Then) {
        Then.onTheSuiviPage.listItemIsNavigable(1, "Navigation");

    });
    opaTest("Facture numérique navigable", function (Given, When, Then) {
        Then.onTheSuiviPage.listItemIsNavigable(2, "Navigation");

    });
    opaTest("Virement non navigable", function (Given, When, Then) {
        Then.onTheSuiviPage.listItemIsNavigable(0, "Active").
		  and.iTeardownMyAppFrame();
    });



});
