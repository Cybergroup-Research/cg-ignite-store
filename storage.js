var when = require('when');
const dotenv = require('dotenv');
dotenv.config();

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

class FlowSetting extends Model {}

FlowSetting.init({
  id: {type: DataTypes.STRING, primaryKey: true},
  data: DataTypes.JSON
}, { sequelize, modelName: 'flowsetting' });

module.exports = {
    getJson: function(key, fallback)
    {
      if (fallback === undefined) {
        fallback = {};
      }
      return when.promise(function(resolve, reject) {
        FlowSetting.findAll({
          attributes: ['data'],
          where: {
            id: key
          },
          raw: true
        }).then((result)=>{
          if(result.length > 0){
            return resolve(result[0].data);
          }
          else{
            return resolve(fallback);
          }
        });
      });
    },
    saveJson: function(key, jsondata)
    {
      return when.promise(function(resolve, reject) 
      {
        FlowSetting.findAll({
          attributes: ['id'],
          where: {
            id: key
          },
        }).then((result)=>{
          if(result.length===0){
            FlowSetting.create(
              { id: key,
                data: jsondata
              }).then((result)=>
              {
                return resolve();
              });
          }else{
            FlowSetting.update(
                { data: jsondata
                },
                  {
                      where: {
                          id: key
                      }
                  }).then((result)=>{
                    return resolve();
                  });
              }
          });
      });
    },
};