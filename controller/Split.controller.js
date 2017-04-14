sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Split", {

        onConnect : function (oEvent) {
            var oView = this.getView();
            var oDialog = oView.byId("Login");
            // create dialog lazily
            if (!oDialog) {
                // create dialog via fragment factory
                oDialog = sap.ui.xmlfragment(oView.getId(), "ecole.famille.view.Login", this);
                oView.addDependent(oDialog);
            }
            oDialog.open();
        },

        onLogin : function (oEvent) {
            this.getView().byId("Login").close();

            var parent = sap.ui.getCore().getModel('ui').getProperty('/parent').toUpperCase();

            if (parent){
                sap.ui.getCore().getModel('files').loadDataFromPath(null, '?famille='+parent);
                sap.ui.getCore().getModel('famille').loadDataFromPath(null, parent);
                sap.ui.getCore().getModel('ui').setProperty('/parent', parent);
            }

            jQuery.sap.require("jquery.sap.storage");
            var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            if (parent) {
                oStorage.put("parent", parent);
            }

        },

        onHelp : function(evt) {
            var oConfig = this.getView().getModel("config");
            window.open(oConfig.oData.urlHelp);
        }
    });
});
