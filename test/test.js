var when = require('when');

var postgresfilesystem = require('cg-ignite-store');
postgresfilesystem.init({


}).then((result)=>{
    console.log("init Complete")
    postgresfilesystem.getFlows().then((result)=>{
        console.log(result)
    });
});


