sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Split", {

        onHelp : function(evt) {
            window.open("http://wiki.calandreta-dauna.fr/doku.php?id=suivi");
        }
    });
});
