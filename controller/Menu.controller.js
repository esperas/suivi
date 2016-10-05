sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
    "use strict";
    return Controller.extend("ecole.famille.controller.Menu", {

        navToMenu : function(evt) {

            // Navigue vers le l'écran proposé dans le menu
            // Ce paramètre sert ensuite dans les pop-up de confirmation
            var obj = evt.getSource().getBindingContext("menu").getObject();

            //this.oParent.oParent.toDetail(obj.targetPage);
            var oTempora = this.getView().getParent().getParent();   //SplitControle

            var i;
            var len = oTempora._aDetailPages.length;
            var target;  //sId de la page de détail recherché
            for (i = 0; i < len; i++) {
                var str = "ecole.famille.view." + obj.targetPage;
                if (oTempora._aDetailPages[i].sViewName==str){
                    target = oTempora._aDetailPages[i].sId;
                }
            }

            oTempora.toDetail(target);
		},

		getSplitContObj : function() {
			var result = this.byId("Split");
			if (!result) {
				jQuery.sap.log.error("SplitApp object can't be found");
			}
			return result;
		}


    });
});
