sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "../model/formatter",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, formatter, JSONModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Suivi", {
        formatter : formatter,

        downloadRIB : function(evt) {
            window.open("./json/facture/RIB.pdf");
        },
        
        navBack : function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("menu");
        },
        onPDF : function(evt) {
            var obj = evt.getSource().getBindingContext("famille").getObject();
            //console.log(obj);
            var url = "./json/facture/" + jQuery.sap.getUriParameters().get("parent") + "-" + obj.piece + ".pdf";
            window.open(url);
        }
    })
});
