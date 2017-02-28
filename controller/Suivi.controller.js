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
            window.open("http://localhost:8080/moncompte/json/facture/RIB.pdf");
        },
        
        navBack : function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("");
        },
        onPDF : function(evt) {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem, oCtx;
			oItem = evt.getSource();
			oCtx = oItem.getBindingContext("famille");
            var toto = oCtx.getProperty("periode");
            if (toto!=null&&!toto!=undefined) {
                oRouter.navTo("Files",{
				    periode : oCtx.getProperty("periode")
			     });
            }


            //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //oRouter.navTo("Files");

            //var obj = evt.getSource().getBindingContext("famille").getObject();
            //console.log(obj);
            //var url = "./json/facture/" + jQuery.sap.getUriParameters().get("parent") + "-" + obj.piece + ".pdf";
            //window.open(url);
        }
    })
});
