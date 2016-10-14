sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "../model/formatter",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, formatter, JSONModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Apropos", {
        navBack : function() {
            var oSplitApp = this.getView().getParent().getParent();
            var oMaster = oSplitApp.getMasterPages()[0];
            oSplitApp.toMaster(oMaster, "slide");
        }
      
    });
});
