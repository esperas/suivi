sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function (Controller, MessageToast, JSONModel, Toast, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Files", {
        done : function() {
            console.log("Demande CachedModel terminé")
        },
        callok : function () {
          console.log("call from cached ok")
        },
        ok : function () {
            console.log("chargement des 2 terminé")
            console.log(this.periode)

            var oFamille = window.oModels["famille"];
            var oModel = window.oModels["files"]

            console.log(window.controller.oArgs.periode)

            window.controller.periode = window.controller.oArgs.periode;
            for (var i=0;i<oFamille.oData.suivi.length;i++){
                if ( oFamille.oData.suivi[i].piece && oFamille.oData.suivi[i].periode) {
                    if (!oModel.oData.fichiers.some(
                        function(element, indice, array){
                            return element.piece == oFamille.oData.suivi[i].piece
                        })) {
                        oModel.oData.fichiers.push({
                            "periode": oFamille.oData.suivi[i].periode,
                            "filename": oFamille.oData.suivi[i].libelle+".pdf", //Pour l'affichage du symbole PDF
                            "piece" : oFamille.oData.suivi[i].piece
                            })
                        }
                }

            }
            oModel.refresh()

            // build filter array
			var aFilter = [];
			var sQuery = window.controller.oArgs.periode;
			if (sQuery) {
				aFilter.push(new sap.ui.model.Filter("periode", sap.ui.model.FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = window.controller.getView().byId("files");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);

        },
        getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
        onInit : function () {
            console.log("Démarage controller Files")
            this.periode = "toto";

            //var oRouter = this.getRouter();
            //var oRouter = sap.ui.core.routing.Router.getRouter("router");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            if (oRouter) {
			oRouter.getRoute("Files").attachMatched(this._onRouteMatched, this);
            }
        },
        _onRouteMatched : function (oEvent) {
            window.controller = this
			console.log("route matched", this.periode)
            this.oArgs = oEvent.getParameter("arguments");
            var oComp = this.getOwnerComponent()
            $.when(oComp.file.cachedModel( "famille", "json/AZERTY1234.json", this.callok),
                  oComp.file.cachedModel( "files", "json/FILES.json", this.callok ))
                .done(this.ok)

  /*          var oArgs, oView;

			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			oView.bindElement({
				path : "files>/periodes(\"2016-01\")",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}*/

		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
    });
});
