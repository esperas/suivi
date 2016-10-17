sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/test/matchers/AggregationLengthEquals',
		'sap/ui/test/matchers/PropertyStrictEquals',
		'sap/ui/test/actions/Press',
        'sap/ui/test/matchers/Properties'
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
                    },

                    iPressButtonBack: function(sView, pId) {
                         return this.waitFor({
                            controlType: "sap.m.Button",
                            viewName: "ecole.famille.view.App",
                            matchers: function(oButton){
                                var regex = new RegExp("navButton");
                                console.log(oButton.getId(), regex.test(oButton.getId()));
                                if (regex.test(oButton.getId())) {
                                    return oButton;
                                };
                            },
							success: function (oButton) {

								oButton[0].$().trigger("tap");
							},
							errorMessage: "Did not find the nav button on object page"
						});
                    }
                },
				assertions: {
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
                   thisScreenShouldBeDisplay: function (pView, pId) {
                        return this.waitFor({
                          viewName: "ecole.famille.view.App",
                          //id: pId,
                            matchers: function(oPage){
                                var regex = new RegExp(pId);
                                console.log(oPage.sId, regex.test(oPage.getId()));
                                if (regex.test(oPage.getId())) {
                                    return oPage;
                                };
                            },
						  controlType: "sap.m.Page",
						  success: function (oPages) {
							// we set the view busy, so we need to query the parent of the app
                           // console.log(oPages)  ;
							Opa5.assert.ok(true, "Page ouverte");
						  },
						  errorMessage: "Affichage de l'écran ok"
					    });
                    },
                    URLShouldBe: function (sUrl){
                        return this.waitFor({

                          matchers : function() {
                            var oWindow = sap.ui.test.Opa5.getWindow();
                            if (oWindow.location.pathname==sUrl) {
                              return "Bla";
                            } else {
                              return false;
                            };
                          },
						  success: function (bla) {
							// we set the view busy, so we need to query the parent of the app
							Opa5.assert.ok(true, "URL correcte");
						  },
						  errorMessage: "Affichage de l'écran ok"
					    });


                    }
				}
			}
		})
	})
