var when = require('when');
const dotenv = require('dotenv');
dotenv.config();

const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

var settings;
var runtimeSettings = require("./settings");
module.exports = {
    init: function(_settings) {
        settings = _settings;
        runtimeSettings.init(_settings);
    },
    install: function(){
        return when.promise(function(resolve, reject)
        {
            console.log("Creating/Validating Table");
            var queryCreateTable = 'CREATE TABLE flowsettings ("data" json NOT NULL, "createdAt" date NULL, "updatedAt" date NULL, id varchar(255) NOT NULL,CONSTRAINT flowsettings_pkey PRIMARY KEY (id) )';
            var queryCheckTable =  "SELECT 1 as found FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'flowsettings'"
            sequelize.query(queryCheckTable, { type: QueryTypes.SELECT}).then((resultCheckTable)=>{
                if(resultCheckTable.length == 0){
                    sequelize.query(queryCreateTable).then((resultCreateTabel)=>{
                        console.log("Table Created");
                        return resolve();
                    });
                }
                else
                {
                    console.log("Table Already Exist");
                    return resolve();
                }
                
            });
            
        });
    }
}