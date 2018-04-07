module.exports = function(RED) {
      function OnFirebase(config) {
            
            RED.nodes.createNode(this);
            
            var node = this;

            var identifier = this.credentials.identifier;
            var password = this.credentials.password;


            node.on('input', function(msg) {
                  strapiAuth( msg );
            });

            function strapiAuth( msg ) {
                  firebase.app.auth().signInWithEmailAndPassword(config.user, config.password).then(function( result ) {
                        node.log("Session Opened...");
                        result.getIdToken().then(function(token) {
                              node.error(token);
                              msg.topic = {"idToken" : token, "auth" : true};
                              node.send(msg);
                        });
                  }, function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        node.error("Errors Open Auth : " + errorCode + " " + errorMessage);
                        msg.topic = {"idToken" : null, "auth" : false};
                        node.send(msg);
                  });
            }
      }
      RED.nodes.registerType("auth", OnFirebase);
}
