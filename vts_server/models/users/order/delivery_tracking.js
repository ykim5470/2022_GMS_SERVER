const Sequelize = require("sequelize");

module.exports = class DeliveryTracking extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        AddressZipcode: {
          // 배송지 우편
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
        AddressCity: {
          // 배송지 도시
          type: Sequelize.STRING(80),
          allowNull: true,
        },
        AddressDetail: {
          // 배송지 상세
          type: Sequelize.STRING(80),
          allowNull: true,
        },
        RecipientName: {
          // 수령자 이름
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        HomeNumber: {
          // 수령자 전화번호
          type: Sequelize.INTEGER(20),
          allowNull: true,
        },
        PhoneNumber: {
          // 수령자 핸드폰
          type: Sequelize.INTEGER(20),
          allowNull: true,
        },
        DeliveryMemo: {
          // 배송메모
          type: Sequelize.STRING(500),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "DeliveryTracking",
        tableName: "deliveryTracking",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
