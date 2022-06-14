const Sequelize = require("sequelize");

module.exports = class Sagawa extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 상품 id 연결 필요
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ItemEn: {
          // 아이템 영문
          type: Sequelize.STRING(400),
          allowNull: true,
        },
        ItemJp: {
          // 아이템 일본어
          type: Sequelize.STRING(400),
          allowNull: true,
        },
        ItemCode: {
          // 아이템코드
          type: Sequelize.STRING(400),
          allowNull: true,
        },
        SagawaCode: {
          // SAGAWA CODE
          type: Sequelize.STRING(400),
          allowNull: true,
        },
        HsCode: {
          // HS 코드
          type: Sequelize.STRING(400),
          allowNull: true,
        },
        Barcode: {
          // 바코드
          type: Sequelize.STRING(400),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Sagawa",
        tableName: "sagawa",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
