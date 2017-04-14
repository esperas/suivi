sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "../model/formatter"

], function (Controller, JSONModel, MessageToast, Filter, FilterOperator, History, formatter) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Files", {

        formatter : formatter,

        done : function() {
            console.log("Demande CachedModel terminé")
        },
        callok : function () {
          console.log("call from cached ok")
        },
        ok : function () {
            var oModel = sap.ui.getCore().getModel('files');
            oModel.setProperty('/periode', this.oArgs.periode );

            // build filter array
			var aFilter = [];
			var sQuery = this.oArgs.periode;
			if (sQuery) {
				aFilter.push(new sap.ui.model.Filter("periode", sap.ui.model.FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("files");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);

        },
        getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
        onInit : function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            if (oRouter) {
			     oRouter.getRoute("Files").attachMatched(this._onRouteMatched, this);
            }

        },
        _onRouteMatched : function (oEvent) {

            this.oArgs = oEvent.getParameter("arguments");

            this.ok();

		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
        navBack : function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				oRouter.navTo("Suivi", {}, true /*no history*/);
			}
        }
    });
});
