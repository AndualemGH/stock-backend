const { Sequelize, DataTypes } = require("sequelize");
const Database = require("better-sqlite3");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  dialectModule: Database
});

const Item = sequelize.define("Item", {
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT }
});

const Import = sequelize.define("Import", {
  invoiceNumber: DataTypes.STRING,
  itemId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  date: DataTypes.DATE,
  cnumber: DataTypes.STRING
});

const Sale = sequelize.define("Sale", {
  itemId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  date: DataTypes.DATE,
  fsNumber: DataTypes.STRING,
  price: DataTypes.FLOAT
});

const OpeningStock = sequelize.define("OpeningStock", {
  itemId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT
});

Item.hasMany(Import, { foreignKey: "itemId" });
Item.hasMany(Sale, { foreignKey: "itemId" });
Item.hasOne(OpeningStock, { foreignKey: "itemId" });
OpeningStock.belongsTo(Item, { foreignKey: "itemId" });

module.exports = {
  sequelize,
  Item,
  Import,
  Sale,
  OpeningStock
};
