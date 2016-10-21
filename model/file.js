sap.ui.define([], function () {
    "use strict";

    return {


        cachedModel : function( key, url, callback ) {
            console.log("cachedModel ", key, "demandé" )
            if ( !window.cachedScriptPromises[ key ] ) {
                window.cachedScriptPromises[ key ] = $.Deferred(function( defer ) {
                    console.log("Executer script : ", key)
                    //var oModel2 = new sap.ui.model.json.JSONModel(url)
                    var jqxhr = $.getJSON(url, function() {
                        console.log( "Requête GET lancé" );
                        })
                        .done(function(data) {
                            window.oModels[key].setData(data)
                            console.log( "Lecture des données ", key, " terminé" );
                            defer.resolve()
                        })
                        .fail(function(evt) {
                            defer.reject()
                            console.log( "error", evt );
                        })
                        .always(function() {
                            console.log( "complete" );
                        });
                   /* window.oModels[key]
                        .attachRequestCompleted(function (){
                            //window.oModels[key].oData = oModel2.oData
                            window.oModels[key].refresh();
                            console.log("Lecture OK : ", key)
                            defer.resolve()

                        })
                        .attachRequestFailed(function (){
                            console.log("Lecture raté: ", key)
                            defer.reject()

                        .loadData(url)
                        });*/
                });
            }
            return window.cachedScriptPromises[ key ].done( callback );
        },

        checkFile : function ( address ) {
            console.log("Vérification Fichier Parent : ",address)
            var href = window.location.origin + window.location.pathname;  // On retirer la chaine de recherche
            if (href.search("index.html")!=-1) {
                href = href.slice(0, href.search("index.html"));
            }
            address =  href + address;
            var client = new XMLHttpRequest();
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
                window.router.navTo("nologin");
            }
        },


    };
});
