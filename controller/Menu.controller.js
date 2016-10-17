sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Menu", {

        navToMenu : function(evt) {

            // Navigue vers le l'écran proposé dans le menu
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            var obj = evt.getSource().getBindingContext("menu").getObject();

            oRouter.navTo(obj.targetPage);

		}


    });
});
