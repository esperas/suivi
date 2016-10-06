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
                return sap.ui.core.ValueState.None;
            } else if (status=='N') { 
                return sap.ui.core.ValueState.Warning;
            } else if (status=='X') {
                return sap.ui.core.ValueState.Success;
            } else if (status=='R') {
                return sap.ui.core.ValueState.Error;
            } else {
                return sap.ui.core.ValueState.None;
            }

            ;
        },
        isRIBvisible : function () {
            // Cette fonction calcule s'il y a un libellé virement d'effectuer.
            // Si ce n'est pas le cas, le RIB est afficher directement
            // Sinon, le RIB est "masquer" dans un bouton [...]
            var result = sap.m.OverflowToolbarPriority.Low;
            var oModel = this.getView().getParent().getParent().getModel("famille");

            if (!oModel) { return result };  // Low
            if (!oModel.oData) {return result };  // Low
            if (!oModel.oData.suivi) {return result }; // Low
            var regex = /virement/i;
            var i;
            var len = oModel.oData.suivi.length;
            var target;  //sId de la page de détail recherché
            for (i = 0; i < len; i++) {
                console.log(oModel.oData.suivi[i].libelle);
                var flag = regex.test(oModel.oData.suivi[i].libelle);
                if (flag==true) { result = sap.m.OverflowToolbarPriority.AlwaysOverflow; };
                //if (regex.test(oModel.oData.suivi[i].libelle)) { result = "AlwaysOverflow" };

            }
            console.log(result);
            return result;
            return "Low";
        }

	};
});
