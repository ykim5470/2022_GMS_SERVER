const Sequelize = require("sequelize");

module.exports = class StoreSetting extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        StoreNeme: {
          // 판매점 상호명
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        RegistrationNumber: {
          // 판매점 사업자번호
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        StoreCeoName: {
          // 판매점 대표명
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        StoreType: {
          // 판매점 타입 : 법인/개인
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        AapprovalNumber: {
          // 판매점 통신판매번호
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        TypeOfBusiness: {
          // 판매점 업태
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        ItemsOfBusiness: {
          // 판매점 종목
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        TaxMail: {
          // 판매점 계산서 이메일
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        ServiceCenter: {
          // 판매점 고객센터 연락처
          type: Sequelize.INTEGER(20),
          allowNull: true,
        },
        StoreAddressZipcode: {
          // 판매점 사업장 소재지 우편
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        StoreAddressCity: {
          // 판매점 사업장 소재지 도시
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        StoreAddressDetail: {
          // 판매점 사업장 소재지 상세
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        StoreReturnAddressZipcode: {
          // 판매점 반품 우편
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        StoreReturnAddressCity: {
          // 판매점 반품 도시
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        StoreReturnAddressDetail: {
          // 판매점 반품 상세
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        DefaultDeliveryPay : {
          // 국내 배송료
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        FreeShipping : {
          // 무료배송
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        StoreFax: {
          // 판매점 팩스
          type: Sequelize.INTEGER(20),
          allowNull: true,
        },
        ExchangeInformation: {
          // 반품 및 교환
          type: Sequelize.STRING,
          allowNull: true,
        },
        DeliveryInformation: {
          // 배송안내
          type: Sequelize.STRING,
          allowNull: true,
        },
        PayInformation: {
          // 결제안내
          type: Sequelize.STRING,
          allowNull: true,
        },
        StoreImgPath: {
          // 대표 이미지 path
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        StoreImgName: {
          // 대표 이미지 파일명
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        StoreImgFilename: {
          // 대표 이미지 hash
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        CeoMail: {
          // 대표 계정
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "StoreSetting",
        tableName: "storeSetting",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
