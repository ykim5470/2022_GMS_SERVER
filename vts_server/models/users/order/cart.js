const Sequelize = require("sequelize");

module.exports = class Cart extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ProductName: {
            // 상품명
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        ProductCount: {
          // 상품 수량
          type: Sequelize.INTEGER(14),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Cart",
        tableName: "cart",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
