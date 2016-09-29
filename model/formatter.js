sap.ui.define([], function () {
	"use strict";

	return {
        formatButton: function (sPiece) {
            if (sPiece) { return true};
            return false;

        },
        isNotEmpty: function (sValue) {
            if (sValue) { return true};
            return false;
        },
        montant: function (facture, reglement) {
            // Remvoi le montant de la facture en négatif sinon le règlement en positif
            var montant = facture || reglement;
            if (facture) { 
                montant = -1 * montant 
            };
            var value = sap.ui.core.format.NumberFormat.getCurrencyInstance();
            return value.format(montant);
        },
        
        soldeDisplay : function (montant) {
            var value = sap.ui.core.format.NumberFormat.getCurrencyInstance();
            return  "Solde : " + value.format(montant);
            
        },
        isStatusVisible : function (status) {
            if (typeof status == 'undefined') { 
                return false;
            } else if (status=='N') { 
                return true;
            } else if (status=='X') {
                return true;
            } else if (status=='R') {
                return true;
            }
            ;
        },
        isStatusText : function (status) {
            if (typeof status == 'undefined') { 
                return null;
            } else if (status=='N') { 
                return "Nouvelle facture";
            } else if (status=='X') {
                return "Facture réglé";
            } else if (status=='R') {
                return "Facture en retard";
            }
            ;
        },
        isStatusState : function (status) {
            if (typeof status == 'undefined') { 
                return "none";
            } else if (status=='N') { 
                return "Warning";
            } else if (status=='X') {
                return "Success";
            } else if (status=='R') {
                return "Error";
            }
            ;
        }        

	};
});
