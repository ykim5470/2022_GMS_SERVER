const Sequelize = require("sequelize");

module.exports = class Birthday extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        LocalBirthday: {
          // Local 생일 (1993/12/02)
          type: Sequelize.DATE,
          allowNull: true,
        },
        OtherBirthday: {
          // kakao 생일 (1202)
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        OtherAge: {
          // kakao 나이 (20~29), * 가입한 시점 이후로 변하지 않음
          type: Sequelize.INTEGER(5),
          allowNull: true,
        },
        Gender: {
          // 성별
          type: Sequelize.STRING(5),
          allowNull: true,
        },
        Memo: {
          // 메모
          type: Sequelize.STRING(500),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Birthday",
        tableName: "birthday",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
