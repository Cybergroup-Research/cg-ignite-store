var when = require('when');

const { npmInstallAsync } = require("runtime-npm-install");
var settings;
var runtimeSettings = require("./settings");
module.exports = {
    init: function(_settings) {
        settings = _settings;
        runtimeSettings.init(_settings);
    },
    install: function(){
        return when.promise(function(resolve, reject) {
            runtimeSettings.getSettings().then((result)=>
            {
                var packagerequired = [];
                for(var key in result.nodes)
                {
                    var name = result.nodes[key].name;
                    var version = result.nodes[key].version;
                    var islocal = false;
                    for(var nodekey in result.nodes[key].nodes)
                    {
                        islocal = result.nodes[key].nodes[nodekey].local;
                        break;
                    }
                    if(islocal)
                    {
                        packagerequired.push(name + "@" + version);
                    }
                }
                if(packagerequired.length > 0)
                {
                    npmInstallAsync(packagerequired, settings.userDir).then((packageresult)=>
                    {
                        console.log("User Packages : ", packagerequired);
                        return resolve();
                    });
                }
                else
                {
                    return resolve();
                }
            });
        });
    }
}