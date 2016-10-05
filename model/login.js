sap.ui.define([], function () {
	"use strict";

	return {

        loginOK : function(){
            console.log("Trouvé");
        },

        loginKO : function() {
            console.log("Raté");
        },

        checkFile : function(file){
                    //var oBla = this.getOwnerComponent();
            //this.getRouter().getTargets().display("nologin");
            $.ajax({
                url:file,
                type:'HEAD',
                error: this.loginOK(),
                success: this.loginKO()
            });
        }
    }
};
