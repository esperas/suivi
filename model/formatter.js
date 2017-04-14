sap.ui.define([
    "sap/ui/Device"
], function (Device) {
	"use strict";

	return {

        formatFile : function(sType, sValue) {

        jQuery.sap.require("sap.ui.core.format.FileSizeFormat");
            if (sType=='size'){

				return sap.ui.core.format.FileSizeFormat.getInstance({
					binaryFilesize : false,
					maxFractionDigits : 1,
					maxIntegerDigits : 3
				}).format(sValue);

			} else {
				return sValue;
			}
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
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            var value = sap.ui.core.format.NumberFormat.getCurrencyInstance();
            //var res = oBundle.getText("solde.montant");
            return  oBundle.getText("solde.montant") + value.format(montant);
            
        },
        isStatusVisible : function (status) {
            if (typeof status == 'undefined') { 
                return false;
            } else {
                return true;
            }
/*            if (typeof status == 'undefined') {
                return false;
            } else if (status=='N') { 
                return true;
            } else if (status=='X') {
                return true;
            } else if (status=='R') {
                return true;
            } else if (status=='P') {
                return true;
            } else {
                return false;
            }*/
        },
        navigation : function (numPiece) {
                if (numPiece) {
                    return sap.m.ListType.Navigation;
                } else {
                    return sap.m.ListType.Active;
                };

        },
        isStatusText : function (status, typedoc) {

            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var doc = typedoc + '.' + status;
            if (typeof status == 'undefined'|| status == null ) {
                return null;
            } else {
                return oBundle.getText(doc);
            }
/*            if (typeof status == 'undefined'|| status == null ) {
                return null;
            } else if (status=='N') { 
                return oBundle.getText("factureStatus.new");
            } else if (status=='X') {
                return oBundle.getText("factureStatus.paied");
            } else if (status=='P') {
                return oBundle.getText("factureStatus.partial");
            } else if (status=='R') {
                return oBundle.getText("factureStatus.late");
            } else {
                return null;
            }*/
        },
        isStatusState : function (status, typedoc) {
            if (typeof status == 'undefined') { 
                return sap.ui.core.ValueState.None;
            };
            if (typedoc=='CHQ') {
                return sap.ui.core.ValueState.Success;
            }
            if (typedoc=='NDF') {
                return sap.ui.core.ValueState.Success;
            }
            if (typedoc=='F') {
                if (status=='N'||status=='P') {
                    return sap.ui.core.ValueState.Warning;
                } else if (status=='X') {
                    return sap.ui.core.ValueState.Success;
                } else if (status=='R') {
                    return sap.ui.core.ValueState.Error;
                } else {
                    return sap.ui.core.ValueState.None;
                }
            }
            if (typedoc=='A') {
                if (status=='N'||status=='P') {
                    return sap.ui.core.ValueState.Success;
                }
            }

            return sap.ui.core.ValueState.None;

    /*        if (typeof status == 'undefined') {
                return sap.ui.core.ValueState.None;
            } else if (status=='N'||status=='P') {
                return sap.ui.core.ValueState.Warning;
            } else if (status=='X') {
                return sap.ui.core.ValueState.Success;
            } else if (status=='R') {
                return sap.ui.core.ValueState.Error;
            } else {
                return sap.ui.core.ValueState.None;
            }*/
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
            var flag;
            var len = oModel.oData.suivi.length;
            var target;  //sId de la page de détail recherché
            for (i = 0; i < len; i++) {
                //console.log(oModel.oData.suivi[i].libelle);
                flag = regex.test(oModel.oData.suivi[i].libelle);
                if (flag==true) { result = sap.m.OverflowToolbarPriority.AlwaysOverflow; };
            }
            return result;
        },
        extractMonth : function (periode) {
            jQuery.sap.require("sap.ui.core.format.DateFormat");
            if (periode===null||periode===undefined) { return null}
            var oSourceFormat =  sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyyMM"});
            var oCibleFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "MMMM"});
            var oDate = oSourceFormat.parse(periode);
            return oCibleFormat.format(oDate);
        }
        ,
        extractDate : function (iDate) {
            jQuery.sap.require("sap.ui.core.format.DateFormat");
            var oCibleFormat;
            var oSourceFormat =  sap.ui.core.format.DateFormat.getDateInstance({pattern: "yyyy-MM-dd"});
            var oDevice = this.getView().getModel("device");
            if (oDevice.getProperty('/system/phone')) {
              oCibleFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern: "dd-MMM"});
            } else {
              oCibleFormat = sap.ui.core.format.DateFormat.getDateInstance({style: "long"});
            }

            var oDate = oSourceFormat.parse(iDate);
            return oCibleFormat.format(oDate);
        }
    }
});
