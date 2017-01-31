sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Split", {

        successCallback : function(){
            console.log("Chargement Model OK")
            window.oModels["famille"].refresh();
            //console.log(window.models.famille)
        },

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
            delete window.cachedScriptPromises.famille;
            var parent = window.oModels["ui"].oData.parent;
            window.oComp.file.cachedModel( "famille", "http://api.calandreta-dauna.fr/famille/"+parent, this.successCallback);

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
