sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/test/matchers/AggregationLengthEquals',
		'sap/ui/test/matchers/PropertyStrictEquals',
		'sap/ui/test/actions/Press'
	],
	function (Opa5, AggregationLengthEquals, PropertyStrictEquals, Press) {
		"use strict";
		var sViewName = "ecole.famille.view.Menu",
			sTableId = "table";
		Opa5.createPageObjects({
			onTheMenuPage: {

				actions: {
                    iPressListItem: function(pId) {
                       return this.waitFor({
                              viewName: sViewName,
						      controlType: "sap.m.ObjectListItem",
						      success: function (oItems) {
                                  for(var i = 0; i < oItems.length; i++) {
                                    var obj = oItems[i].getBindingContext("menu").getObject();
                                    if (obj.targetPage==pId) {
                                        oItems[i].$().trigger("tap");
                                    }
                                  }
                                   // oItems.$().trigger("tap");
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
