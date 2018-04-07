module.exports = function(RED) {
      function OnStrapi(config) {
            var request = require('request');
            
            RED.nodes.createNode(this);

            var context = this.context;
            
            var node = this;

            var identifier = this.credentials.identifier;
            var password = this.credentials.password;
            var url = this.credentials.url;


            node.on('input', function(msg) {
                  strapiAuth( msg );
            });

            function strapiAuth( msg ) {
                  request({
                        identifier: identifier,
                        password: password,
                        url: url,
                        json: true,
                        method: 'POST'
                  }).then(function( result ) {
                        context.strapiAuth = result.auth;
                  }, function(error) {
                        node.error("An error occured: " + error);
                        msg.topic = {"user" : null, "token" : null};
                        node.send(msg);
                  });
            }
      }
      RED.nodes.registerType("auth", OnStrapi);
}
