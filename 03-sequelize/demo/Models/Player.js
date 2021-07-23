const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Player', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('active', 'injured', 'retired')
    },
    skill: {
      type: DataTypes.INTEGER,
      get() {
        // return this.skill + ' points'; // Wrong!
        return this.getDataValue('skill') + ' points';
      }
    }
  }, {
    // timestamps: false
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
  });
}