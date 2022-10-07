const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Ability",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mana_cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 10.0,
          max: 250.0,
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      summary: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.name} (${this.mana_cost} points of mana) - Description: ${this.description}`;
        },
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name", "mana_cost"],
        },
      ],
    },
    {
      timestamps: false,
    }
  );
};
