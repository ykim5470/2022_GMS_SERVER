const Sequelize = require("sequelize");

module.exports = class StoreWeight extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        DeliveryType: {
          // 배송타입명
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        WeightStart: {
          // 무게
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        WeightEnd: {
          // 무게
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        Price: {
          // 금액
          type: Sequelize.INTEGER(8),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "StoreWeight",
        tableName: "storeWeight",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
