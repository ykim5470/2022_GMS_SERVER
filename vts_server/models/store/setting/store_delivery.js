const Sequelize = require("sequelize");

module.exports = class StoreDelivery extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        TypeTitle: {
          // 배송타입명
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        MonetaryUnit: {
          // 화폐단위
          type: Sequelize.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "StoreDelivery",
        tableName: "storeDelivery",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
