const Sequelize = require("sequelize");

module.exports = class ProductThumbnail extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ThumbnailImgPath: {
          // 대표 이미지(썸네일)
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        ThumbnailImgName: {
          // 대표 이미지(썸네일)
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        ThumbnailImgFilename: {
          // 대표 이미지(썸네일)
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ProductThumbnail",
        tableName: "productThumbnail",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
