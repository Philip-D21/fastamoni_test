const { Sequelize , DataTypes } = require('sequelize');
require("dotenv").config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'b5jlk3a3yqrdlfk4eafk-mysql.services.clever-cloud.com',
      port: 3306,
      logging: console.log,
      maxConcurrentQueries: 100,
      dialect:'mysql',
      pool: {
        max: 5,                 
        idle: 30                
      },
      language: 'en'
    }
  );
  


sequelize.authenticate()
    .then(()=>{
        console.log("Connection successful")
    }).catch((err) =>{
        console.log("unable to sync successfully:"+ err)
    });



module.exports = sequelize 