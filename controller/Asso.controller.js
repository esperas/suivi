sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "../model/formatter",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, formatter, JSONModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Asso", {
        navBack : function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("");
        },

        onClear : function(){
            var aFilter = [];
            aFilter.push(new sap.ui.model.Filter("level", sap.ui.model.FilterOperator.EQ, '0'));
			// filter binding
			var oList = this.getView().byId("TileContainer");
			var oBinding = oList.getBinding("tiles");
			oBinding.filter(aFilter);
        },

        press : function(){
            var aFilter = [];
            aFilter.push(new sap.ui.model.Filter("level", sap.ui.model.FilterOperator.EQ, '1'));
			// filter binding
			var oList = this.getView().byId("TileContainer");
			var oBinding = oList.getBinding("tiles");
			oBinding.filter(aFilter);

        },

        onInit : function () {
            var oModel = new JSONModel;
            oModel.setData( {'Tiles' : [
                    { 'text' : 'Trésorerie', 'sub' : 'Total des Sous' , 'value' : '7801', 'state' : 'Good', 'footer' : 'Le 12/01/2017', 'unit' : 'EUR' , 'level' : '0', 'type' : 'T'},
                    { 'text' : 'Banque', 'value' : '6254 ',  'state' : 'Good', 'footer' : 'Le 21/01/2017', 'unit' : 'EUR', 'level' : '1', 'type' : 'T' },
                    { 'text' : 'Livret', 'value' : '165 ',  'footer' : 'Le 21/01/2017', 'unit' : 'EUR', 'level' : '1', 'type' : 'T' },
                    { 'text' : 'Caisse', 'value' : '865 ',  'footer' : 'Le 21/01/2017', 'unit' : 'EUR' , 'level' : '1', 'type' : 'T'},
                    { 'text' : 'Factures Parents Impayés', 'sub' : 'En attente' , 'value' : '-1254 ',  'state' : 'Critical', 'footer' : 'Le 21/01/2017', 'unit' : 'EUR', 'level' : '0', 'type' : 'R' },
                    { 'text' : 'Dettes fournisseurs', 'sub' : 'En attente de réglement' , 'value' : '-1254 ',  'state' :
                     'Error', 'footer' : 'Le 21/01/2017', 'unit' : 'EUR', 'level' : '0', 'type' : 'R', 'indicator' : 'Up' },
                    { 'text' : 'Subventions', 'sub' : 'En attente de paiement' , 'value' : '2254 ',  'state' :
                     'Good', 'footer' : 'Le 31/01/2017', 'unit' : 'EUR', 'level' : '0', 'type' : 'R' },
                    { 'text' : 'Résultat', 'sub' : 'Bilan provisoire' , 'value' : '1254 ',  'state' :
                     'Critical', 'footer' : 'Le 31/01/2017', 'unit' : 'EUR', 'level' : '0', 'type' : 'R' },
                    { 'text' : 'Liquidités', 'sub' : 'Sous restants' , 'value' : '1254 ',  'state' :
                     'Error', 'footer' : 'Le 31/01/2017', 'unit' : 'EUR' , 'level' : '0', 'type' : 'R'}

            ]
                            });
            this.getView().setModel(oModel);

        }

    });
});
