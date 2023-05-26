const mongoose = require('mongoose');

const dbConnection = async ()=>{
    const db = await mongoose.connect(process.env.DB_URL , {useNewUrlParser: true,useUnifiedTopology: true});
    console.log(`Db Connected at ${db.connection.host}`);
}
module.exports = dbConnection;