import { DataTypes, type Sequelize } from "sequelize";

export function defineAnswersModel(s: Sequelize) {
  s.define("Answers", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hasSymptoms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subdivision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
}
