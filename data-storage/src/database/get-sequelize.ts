import { DataTypes, Sequelize } from "sequelize";

const DATABASE_URL = process.env["DATABASE_URL"];

if (!DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

// From https://sequelize.org/docs/v6/other-topics/aws-lambda/

let sequelizePromise: Promise<Sequelize> | null = null;

/** Remember to call `sequelize.connectionManager.close` when done */
export async function getSequelize() {
  if (sequelizePromise) {
    const sequelize = await sequelizePromise;

    sequelize.connectionManager.initPools();

    // eslint-disable-next-line no-prototype-builtins -- Following https://sequelize.org/docs/v6/other-topics/aws-lambda/
    if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete sequelize.connectionManager.getConnection;
    }

    return sequelizePromise;
  }

  const s = new Sequelize(DATABASE_URL!, {
    pool: {
      max: 2,
      min: 0,
      idle: 0,
      acquire: 3000,
      evict: 30_000,
    },
    dialectOptions: {
      ssl: process.env["AZURE_FUNCTIONS_ENVIRONMENT"] !== "Development",
    },
  });

  s.define("Answers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hasHayFever: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subdivision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  sequelizePromise = s.sync().then(() => {
    return s;
  });

  return sequelizePromise;
}
