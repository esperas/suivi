sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/test/matchers/AggregationLengthEquals',
		'sap/ui/test/matchers/PropertyStrictEquals',
		'sap/ui/test/actions/Press'
	],
	function (Opa5, AggregationLengthEquals, PropertyStrictEquals, Press) {
		"use strict";
		var sViewName = "App",
			sTableId = "table";
		Opa5.createPageObjects({
			onTheAppPage: {

				actions: {
                    iPressTheSayHelloWithDialogButton: function() {
                        //Rien pour l'instant
                    }
                },
				assertions: {
					theTableShouldHaveAllEntries: function () {
						return true;
					},
					theNoLoginScreenShouldBeDisplay: function () {
						return this.waitFor({
						controlType: "sap.m.MessagePage",
						success: function () {
							// we set the view busy, so we need to query the parent of the app
							Opa5.assert.ok(true, "The NoLogin is open");
						},
						errorMessage: "NoLogin Screen don't appears"
					});
					}
				}
			}
		})
	})
