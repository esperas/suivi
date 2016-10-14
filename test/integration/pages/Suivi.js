sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/test/matchers/AggregationLengthEquals',
		'sap/ui/test/matchers/PropertyStrictEquals',
		'sap/ui/test/actions/Press'
	],
	function (Opa5, AggregationLengthEquals, PropertyStrictEquals, Press) {
		"use strict";
		var sViewName = "ecole.famille.view.Suivi";

		Opa5.createPageObjects({
			onTheSuiviPage: {

				assertions: {
                    RIBShouldBeHide: function (pBoolean) {
                        return this.waitFor({
                          viewName: sViewName,
                          controlType: "sap.m.ToggleButton",  //On recherche le bouton Toggle, il doit apparaitre quand le bouton RIB disparait
    /*                      matchers: function (oPage) {
                              var oModel = sap.ui.getCore().getModel("famille");
						      var sExpectedText = oPage.getModel("famille").getProperty("famille")
				              return new PropertyStrictEquals({
								name: "text",
								value: sExpectedText
							  }).isMatching(oPage);
				          },     */
						  success: function (buttons) {
                                Opa5.assert.ok(true, "Le bouton RIB est caché");
                          },
                        errorMessage: "Recherche de bouton impossible"

					    });
                    },
                    RIBShouldBeVisible: function (pBoolean) {
                        return this.waitFor({
                          viewName: sViewName,
                          id: "RIB",
                          controlType: "sap.m.Button",  //On recherche le bouton RIB
                          matchers: function (oButton) {
                            var oObject = oButton;
                            var oModel = oButton.getModel("famille");
  						    if (oModel.oData.famille=="TEST2") {return true};
                          },
						  success: function (buttons) {
                                Opa5.assert.ok(true, "Le bouton RIB est visible");
                          },
                        errorMessage: "Recherche de bouton impossible"

					    });
                    }
				}
			}
		})
	})
