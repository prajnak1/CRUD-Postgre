import {Sequelize} from "sequelize";
import {createUserModel} from '../model/userSchema.js';



//call schema here

const sequelize = new Sequelize('postgres', 'postgres', 'Riku1234()', {
    host: 'localhost',
    dialect:  'postgres' 
  });
//connection with PostgreSQL database
  let UserModel = null;
  const connection = async() =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        UserModel=await createUserModel(sequelize)
        await sequelize.sync();
        console.log("Database Synced")
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }

  export {
    connection,
    UserModel
  }
