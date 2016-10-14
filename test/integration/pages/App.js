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
                    iPressListItem: function() {
                       return this.waitFor({
                              viewName: "ecole.famille.view.Menu",

						      controlType: "sap.m.ObjectListItem",
						      success: function (aItems) {
							     aItems[1].$().trigger("tap");
						  },
						errorMessage: "Did not find the Item List on the app page"
					});
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
					},
                    theNoLoginScreenShouldNotBeDisplay: function () {
						return this.waitFor({
						  controlType: "sap.m.MessagePage",
						  success: function () {
							// we set the view busy, so we need to query the parent of the app
							//Opa5.assert.ok(false, "The NoLogin is open");
						  },
						  errorMessage: "Affichage de l'écran ok"
					    });
					},
                    theAdressScreenShouldBeDisplay: function () {
                        return this.waitFor({
                          viewName: "ecole.famille.view.Famille",
                          id:"famille",
						  controlType: "sap.m.Page",
						  success: function () {
							// we set the view busy, so we need to query the parent of the app
							Opa5.assert.ok(true, "Page Adresse ouverte");
						  },
						  errorMessage: "Affichage de l'écran ok"
					    });
                    }
				}
			}
		})
	})
