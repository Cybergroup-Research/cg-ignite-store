var when = require('when');
var nodeFn = require('when/node/function');
var util = require("./util");

var fs = require('fs-extra');
var fspath = require("path");
var mkdirp = fs.mkdirs;
var promiseDir = nodeFn.lift(mkdirp);

var library = require("./library");
var sessions = require("./sessions");
var runtimeSettings = require("./settings");
var projects = require("./projects");

var modulemanager = require("./modulemanager");

var dbmigrationmanager = require("./dbmigrationmanager");

var initialFlowLoadComplete = false;
var settings;


var flowsFile;
var projectFile;
var flowsFullPath;

var postgresfilesystem = {
    init: function(_settings, runtime)
    {
        settings = _settings;
        var promises = [];
        
        // Node Modules
        if (!settings.userDir)
        {
            try {
                fs.statSync(fspath.join(process.env.NODE_RED_HOME,".config.json"));
                settings.userDir = process.env.NODE_RED_HOME;
            } catch(err) {
                settings.userDir = fspath.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE || process.env.NODE_RED_HOME,".node-red");
                if (!settings.readOnly) {
                    promises.push(promiseDir(fspath.join(settings.userDir,"node_modules")));
                }
            }
        }
        
        library.init(settings);
        sessions.init(settings);
        runtimeSettings.init(settings);
        modulemanager.init(settings);
        dbmigrationmanager.init(settings);
        
        return when.all(promises).then(dbmigrationmanager.install).then(modulemanager.install);
    },
    getFlows: projects.getFlows,
    saveFlows: projects.saveFlows,
    getCredentials: projects.getCredentials,
    saveCredentials: projects.saveCredentials,

    getSettings: runtimeSettings.getSettings,
    saveSettings: runtimeSettings.saveSettings,
    getSessions: sessions.getSessions,
    saveSessions: sessions.saveSessions,
    getLibraryEntry: library.getLibraryEntry,
    saveLibraryEntry: library.saveLibraryEntry,
};

module.exports = postgresfilesystem;