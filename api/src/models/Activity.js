const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('activity', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true

        },
        season:{
            type:DataTypes.STRING, //ENUM('Winter','Summer','Spring','Autumn'),
            allowNull:false
        },


    }, { timestamps: false },)
    


}