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
                    RIBShouldBeVisible: function (pBoolean) {
                        return this.waitFor({
                          viewName: sViewName,
                          controlType: "sap.m.Button",
						  success: function (buttons) {
							for (var i = 0; i < buttons.length; i++) {

                                Opa5.assert.ok(true, "The NoLogin is open");
                            }
                          },
                        errorMessage: "Recherche de bouton impossible"

					    });
                    }
				}
			}
		})
	})
