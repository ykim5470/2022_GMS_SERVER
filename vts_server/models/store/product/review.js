const Sequelize = require("sequelize");

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 상품 id 연결 필요
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Content: {
          // 내용
          type: Sequelize.STRING(400),
          allowNull: false,
        },
        WriterEmail: {
          // 작성자 이메일
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        WriterNickname: {
          // 작성자 닉네임
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        Lft : {
          // 깊이 참조
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        Rgt : {
          // 깊이 참조 (임시 현재만 사용)
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Review",
        tableName: "review",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
