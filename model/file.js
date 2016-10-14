sap.ui.define([], function () {
    "use strict";

    return {

        checkFile : function ( address ) {

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
                window.router.getTargets().display("nologin");
            }
        },


    };
});
