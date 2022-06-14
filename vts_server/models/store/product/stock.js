const Sequelize = require("sequelize");

module.exports = class Stock extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Stocks: {
          // 재고
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        WarehouseStocks: {
          // 창고 재고
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        Memo: {
          // 재고 메모
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        Email: {
          // 작성자
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Stock",
        tableName: "stock",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
