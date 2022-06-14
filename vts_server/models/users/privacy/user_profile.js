const Sequelize = require("sequelize");

module.exports = class UserProfile extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ProfileOriginal: {
          // 프로필 이미지 오리지널명
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        ProfileFile: {
          // 프로필 이미지 파일명
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        ProfilePath: {
          // 프로필 이미지 경로
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        OtherOriginal: {
          // 자격증 이미지 오리지널명
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        OtherFile: {
          // 자격증 이미지 파일명
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        OtherPath: {
          // 자격증 이미지 경로
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        Memo: {
          // 메모
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserProfile",
        tableName: "userProfile",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
