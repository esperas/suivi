sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
	"sap/ui/Device"
], function (UIComponent, JSONModel,  ResourceModel, Device) {
    "use strict";
    return UIComponent.extend("ecole.famille.Component", {
        metadata : {
            manifest: "json"
        },

        checkFile : function ( address ) {

            var href = window.location.origin + window.location.pathname;  // On retirer la chaine de recherche
            if (href.search("index.html")!=-1) {
                href = href.slice(0, href.search("index.html"));
            }
            address =  href + address;
            console.log(href);
            var client = new XMLHttpRequest();
            window.cool = this.getRouter();
            client.addEventListener("load", this.returnStatus);
            client.open( "GET", address );
            client.send();
        },

        returnStatus : function ( oEvent ) {
            if ( oEvent.currentTarget.status === 200 ) {
                console.log( 'file exists!' );
            }
            else {
                console.log( 'file does not exist! status: ' + status );
                window.cool.getTargets().display("nologin");
            }
        },

        init : function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            this.getRouter().initialize();

            var parent = jQuery.sap.getUriParameters().get("parent");

            // L'identifiant est composé de 10 characters, majuscules et chiffres
            var regex = /[A-Z0-9]{10}$/;

            if (!regex.test(parent)) {
                this.getRouter().getTargets().display("nologin");
            };

            parent = "json/" + parent + ".json";
            //Mise à jour du model avec les "vrai" données

            // Vérification des
            this.checkFile(parent);

            var oModel = this.getModel("famille");

            oModel.loadData(parent);


            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName : "ecole.famille.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");

			// set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

            // Set App paramtre pour affichage dans A Propos
            var oModel2 = new sap.ui.model.json.JSONModel("manifest.json");
            this.setModel(oModel2,"app");

            // Définir les paramètres de configuration de l'appli
            var oConfig = new sap.ui.model.json.JSONModel("config.json");
            this.setModel(oConfig,"config");

        },
       



    });
});
