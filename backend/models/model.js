const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const conn = './dbconnection';
class Asiakas extends Model {}
Asiakas.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    kayttajatunnus: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
    },
    salasana: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    etunimi: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    sukunimi: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    puhelinnumero: {
      type: Sequelize.STRING(15),
      allowNull: false,
      validate: {
        is: /^\+?[1-9]\d{1,14}$/,
      },
    },
    sahkoposti: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    katuosoite: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    postinumero: {
      type: Sequelize.STRING(5),
      allowNull: false,
    },
    postitoimipaikka: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    paikkakunta: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
  },
  { sequelize: conn, modelName: 'Asiakas' }
);
class Tuottaja extends Model {}
Tuottaja.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    kayttajatunnus: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
    },
    salasana: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    etunimi: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    sukunimi: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    puhelinnumero: {
      type: Sequelize.STRING(15),
      allowNull: false,
      validate: {
        is: /^\+?[1-9]\d{1,14}$/,
      },
    },
    sahkoposti: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    katuosoite: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    postinumero: {
      type: Sequelize.STRING(5),
      allowNull: false,
    },
    postitoimipaikka: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    paikkakunta: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    lisatiedot: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
  },
  { sequelize: conn, modelName: 'Tuottaja' }
);
class Ilmoitukset extends Model {}
Ilmoitukset.init(
  {
    ilmoitusID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tuottajaID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    lisatiedot: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    julkaisupaiva: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    kuvaus: {
      type: sequelize.STRING(200),
      allowNull: false,
    },
    voimassaolo_paattyy: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    kuva: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { sequelize: conn, modelName: 'Ilmoitukset' }
);
class Tuotteet extends Model {}
Tuotteet.init(
  {
    tuoteID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tuottajaID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nimi: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    yksikko: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    kuvaus: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    tuotesaldo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    yksikkohinta: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    tuote_on_aktiivinen: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: conn, modelName: 'Tuotteet' }
);
class Reitit extends Model {}
Reitit.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    jakopaiva_aika: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    jakopaikka: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    katuosoite: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    postinumero: {
      type: Sequelize.STRING(5),
      allowNull: false,
    },
    paikkakunta: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    lisatieto: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    tuottaja_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: conn, modelName: 'Reitit' }
);
