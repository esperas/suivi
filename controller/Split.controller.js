sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Split", {

        onHelp : function(evt) {
            var oConfig = this.getView().getModel("config");
            window.open(oConfig.oData.urlHelp);
        }
    });
});
