const Sequelize = require('sequelize')

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        CategoryName: {
          // 카테고리 이름
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        Lft: {
          // 카테고리 참조
          type: Sequelize.INTEGER(20),
          allowNull: true,
        },
        Rgt: {
          // 카테고리 참조
          type: Sequelize.INTEGER(20),
          allowNull: true,
        },
        Salt: {
          // 순서
          type: Sequelize.INTEGER(20),
          allowNull: true,
        },
        Url: {
          // URL
          type: Sequelize.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Category',
        tableName: 'category',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    )
  }
}
