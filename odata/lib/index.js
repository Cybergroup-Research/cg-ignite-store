const { ExecuteQuery } = require('../helpers/test')
// const { GetQuery } = require('../helpers/resolvers')

module.exports = function(RED) {
    function odata(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.user = config.user;
        this.password = config.password;
        this.server = config.server;
        this.database = config.database;
        this.returntype = config.returntype;
        var node = this;

        var ConnectionString = {
            user: this.user,
            password: this.password,
            server: this.server,
            database: this.database
        };
        
        // Node.js related Code to call odata complaint api
        this.on('input', function(msg) {
            ExecuteQuery(ConnectionString, `select * from Products`)
            .then(result => {
                msg.payload = result.recordset
                node.send(msg)
            });

            // msg.payload = "result"
            // node.send(msg)
        });
    }
    RED.nodes.registerType("odata",odata);
}