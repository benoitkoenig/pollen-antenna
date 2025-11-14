import { DataTypes, type Sequelize } from "sequelize";

export function defineSubdivisionsModel(s: Sequelize) {
  s.define("Subdivisions", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    northBound: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    eastBound: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    westBound: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    southBound: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
}
