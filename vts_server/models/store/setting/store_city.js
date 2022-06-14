const Sequelize = require("sequelize");

module.exports = class StoreCity extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ZipCodeStart : {
          // 도시 코드 시작
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        ZipCodeEnd : {
          // 도시 코드 종료
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        CityName: {
          // 도시이름
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        DeliveryPay: {
          // 배송료
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "StoreCity",
        tableName: "storeCity",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
