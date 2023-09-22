const sequelize = require('./index')
const UserModel = require("./user");



sequelize.sync({ force: false})
.then(()=>{
    console.log("Table synced sccessfully")
}).catch((err)=>{
    console.log("unable to sync successfully:"+ err)
});


