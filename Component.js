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


            //Get Storage object to use
            jQuery.sap.require("jquery.sap.storage");
            var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

            var parent = jQuery.sap.getUriParameters().get("parent");

            if (parent) {
                oStorage.put("parent", parent);
                parent.toUpperCase();
            } else {
                parent = oStorage.get("parent");
            }

            console.log("Parent : ", parent)

            // Stockage des Models pour partage simplifié (pb de porté des Modèles)
            sap.ui.getCore().setModel(this.getModel("files"), "files");
            sap.ui.getCore().setModel(this.getModel("famille"), "famille");
            sap.ui.getCore().setModel(this.getModel("config"), "config");
            sap.ui.getCore().setModel(this.getModel("ui"), "ui");

            if (parent){
                this.getModel('files').loadDataFromPath(null, '?famille='+parent);
                this.getModel('famille').loadDataFromPath(null, parent);
                this.getModel('ui').setProperty('/parent', parent);
            }

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

            // create the views based on the url/hash
            this.getRouter().initialize();

            if (sap.ui.Device.system.phone!=true) {
                this.getRouter().navTo("Suivi");
            }


        },
       



    });
});
