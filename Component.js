sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
	"sap/ui/Device",
    "./model/file"
], function (UIComponent, JSONModel,  ResourceModel, Device, file) {
    "use strict";
    return UIComponent.extend("ecole.famille.Component", {
        metadata : {
            manifest: "json"
        },
        file : file,

        successCallback : function(){
            console.log("Chargement Model OK")
            //console.log(window.models.famille)
        },
        errorCallback : function() {
            console.log("Chargement Model raté")
        },

        init : function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            console.log("Démarrage du Component.js")


            var parent = jQuery.sap.getUriParameters().get("parent");
            var parentId = parent;
            console.log("Parent : ", parent)
            // L'identifiant est composé de 10 characters, majuscules et chiffres
            var regex = /[A-Z0-9]{10}$/;

            if (!regex.test(parent)) {
                this.getRouter().initialize();
                this.getRouter().navTo("nologin");
            };

            //parent = "json/" + parent + ".json";
            //Mise à jour du model avec les "vrai" données

            // Stockage des Models pour partage simplifié (pb de porté des Modèles)

            window.oModels["famille"] = this.getModel("famille");
            window.oModels["files"] = this.getModel("files");
            window.oModels["ui"] = this.getModel("ui");
            window.oModels["ui"].oData.parent = parent;

            this.file.cachedModel( "famille", "http://api.calandreta-dauna.fr/famille/"+parent, this.successCallback);
            this.file.cachedModel( "files", "http://parents.calandreta-dauna.fr/moncompte/json/FILES.json", this.successCallback);

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

            // create the views based on the url/hash
            this.getRouter().initialize();

            window.router = this.getRouter();  // Le router est stocké en locale afin d'être disponible pour les fonctions appelé

            // Vérification de l'existence du fichier
            //this.file.checkFile(parent);           // Code à revoir, le test du fichier peu se faire dans les retours du cachedModel
            if (sap.ui.Device.system.phone!=true) {
                this.getRouter().navTo("Suivi");
            }


        },
       



    });
});
