sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "../model/formatter",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, formatter, JSONModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Ndf", {
        formatter : formatter,

        downloadNDF : function(evt) {
            var idNDF = sap.ui.getCore().getModel('config').getProperty('/idNDF');
            var sURL = sap.ui.getCore().getModel('files').getUrl();
            if (sURL.indexOf("?") == -1) {
				sURL = sURL + '/' + idNDF;
			} else {
				var aUrlParts = sURL.split("?");
				sURL = aUrlParts[0] + '/' + idNDF;
			}
            window.open(sURL);

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
            var toto = oCtx.getProperty("idFile");
            var sURL = sap.ui.getCore().getModel('files').getUrl() + '/' + toto;
            if (toto){
                window.open(sURL);
            }
        }
    })
});
