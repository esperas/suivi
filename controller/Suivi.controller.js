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
            var idRIB = sap.ui.getCore().getModel('config').getProperty('/idRIB');
            var sURL = sap.ui.getCore().getModel('files').getUrl();
            if (sURL.indexOf("?") == -1) {
				sURL = sURL + '/' + idRIB;
			} else {
				var aUrlParts = sURL.split("?");
				sURL = aUrlParts[0] + '/' + idRIB;
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
            var toto = oCtx.getProperty("periode");
            if (toto!=null&&!toto!=undefined) {
                oRouter.navTo("Files",{
				    periode : oCtx.getProperty("periode")
			     });
            }
        }
    })
});
