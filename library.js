var when = require('when');
var settings;
var runtimestorage = require("./storage");
module.exports = {
    init: function(_settings) {
        settings = _settings;
    },
    getLibraryEntry: function(type, path)  {
        console.log("getLibraryEntry called with:");
        console.log("type: " + type);
        console.log("path: " + path);

    return when.promise(function(resolve,reject) {
      if (path[0] === "/") {
        // List out the library files in the directory
        var _path = path.substr(1); // drop leading slash
        var prefix = "cg:library:" + type + ":" + _path + "*";
        client.keys(prefix, function(err, replies) {
          var entries = [];

          replies.forEach(function(reply, i) {
            var filepath = reply.substr(prefix.length - 1);
            if (filepath[0] === "/") {
              filepath = filepath.substr(1);
            }
            if (filepath.includes("/")) {
              var entry = filepath.split("/")[0];
            } else {
              var entry = {fn: filepath};
            }
            entries.push(entry);
          });

          return resolve(entries);
        });
      } else {
        // return the content of the requested library file
        var key = "cg:library:" + type + ":" + path;
        client.get(key, function(err, reply) {
          var json = JSON.parse(reply.toString());
          return resolve(json.body);
        });
      }
    });
        //return runtimestorage.getJson("cg:library");
    },
    saveLibraryEntry: function(type, path, meta, body) 
    {
        console.log("save cg:library")
        var key = "cg:library:" + type + ":" + path;
        var entry = {meta: meta, body: body};
        console.log(key);
        console.log(entry);
        return runtimestorage.saveJson(key, entry);
    }
}