sap.ui.require([
	"sap/ui/test/opaQunit"
], function () {
	"use strict";
	QUnit.module("Navigation");
	opaTest("Should open the hello dialog", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyAppInAFrame("../../index.html");
		//Actions

        When.onTheAppPage.iPressTheSayHelloWithDialogButton();
		// Assertions
		Then.onTheAppPage.theNoLoginScreenShouldBeDisplay().
			and.iTeardownMyAppFrame();
	});
    opaTest("Should not open the hello dialog", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyAppInAFrame("../../index.html?parent=AZERTY1234");
		//Actions

        When.onTheAppPage.iPressTheSayHelloWithDialogButton();
		// Assertions
		Then.onTheAppPage.theNoLoginScreenShouldBeDisplay().
			and.iTeardownMyAppFrame();
	});
});
