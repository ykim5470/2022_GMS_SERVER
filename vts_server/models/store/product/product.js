const Sequelize = require("sequelize");

module.exports = class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 상품 id 연결 필요
        // 가맹점 타입 연결
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Activation: {
          // 활성화 여부
          type: Sequelize.INTEGER(3),
          allowNull: true,
        },
        ProductName: {
          // 상품명
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        RetailPrice: {
          // 시중가격
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
        DiscountPrice: {
          // 판매가격
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        WholesalePrice: {
          // 도매가
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
        SingleDelivery: {
          // 단독배송여부
          type: Sequelize.INTEGER(3),
          allowNull: true,
        },
        SingleDeliveryPrice: {
          // 단독배송료
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
        StockInfinity: {
          // 무한재고
          type: Sequelize.INTEGER(3),
          allowNull: true,
        },
        SizeX: {
          // 사이즈 x
          type: Sequelize.INTEGER(50),
          allowNull: false,
        },
        SizeY: {
          // 사이즈 y
          type: Sequelize.INTEGER(50),
          allowNull: false,
        },
        SizeZ: {
          // 사이즈 z
          type: Sequelize.INTEGER(50),
          allowNull: false,
        },
        Weight: {
          // 중량
          type: Sequelize.INTEGER(50),
          allowNull: false,
        },
        DetailsPage: {
          // 제품 상세페이지
          type: Sequelize.STRING,
          allowNull: false,
        },
        StoreMemo: {
          // 스토어 메모
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Product",
        tableName: "product",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
