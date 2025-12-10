// Tuodaan, Sequelize, DataTypes, ja model
import { Sequelize, DataTypes, Model } from '@sequelize/core';
// tuodaan sequelizeyhteys
import conn from '../dbconnection.js';
// luodaan asiakas malli
class Asiakas extends Model {}
Asiakas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    kayttajatunnus: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    salasana: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    etunimi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sukunimi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    puhelinnro: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        is: /^\+?[1-9]\d{1,14}$/,
      },
    },
    sahkoposti: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    katuosoite: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postinumero: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    postitoimipaikka: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    paikkakunta: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    kuva: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  { sequelize: conn, modelName: 'Asiakas', freezeTableName: true }
);
// Tuottaja malli
class Tuottaja extends Model {}
Tuottaja.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    kayttajatunnus: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    salasana: { type: DataTypes.STRING(255), allowNull: false },
    etunimi: { type: DataTypes.STRING(50), allowNull: false },
    sukunimi: { type: DataTypes.STRING(50), allowNull: false },
    puhelinnro: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: { is: /^\+?[1-9]\d{1,14}$/ },
    },
    sahkoposti: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    katuosoite: { type: DataTypes.STRING(100), allowNull: false },
    postinumero: { type: DataTypes.STRING(5), allowNull: false },
    postitoimipaikka: { type: DataTypes.STRING(40), allowNull: false },
    paikkakunta: { type: DataTypes.STRING(40), allowNull: false },
    lisatiedot: { type: DataTypes.STRING(500), allowNull: false },
    kuva: { type: DataTypes.STRING(200), allowNull: true },
  },
  { sequelize: conn, modelName: 'Tuottaja', freezeTableName: true }
);
// Ilmoitukset malli
class Ilmoitukset extends Model {}
Ilmoitukset.init(
  {
    ilmoitusID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tuottajaID: { type: DataTypes.INTEGER, allowNull: false },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    maakunta: {
      type: DataTypes.ENUM(
        'Ahvenanmaa',
        'Etelä-Karjala',
        'Etelä-Pohjanmaa',
        'Etelä-Savo',
        'Kainuu',
        'Kanta-Häme',
        'Keski-Pohjanmaa',
        'Keski-Suomi',
        'Kymenlaakso',
        'Lappi',
        'Pohjois-Karjala',
        'Pohjanmaa',
        'Pohjois-Pohjanmaa',
        'Pohjois-Savo',
        'Päijät-Häme',
        'Pirkanmaa',
        'Satakunta',
        'Uusimaa',
        'Varsinais-Suomi'
      ),
      allowNULL: false,
    },
    nimi: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lisatiedot: { type: DataTypes.STRING(255), allowNull: false },
    julkaisupaiva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    kuvaus: { type: DataTypes.STRING(200), allowNull: false },
    voimassaolo_paattyy: { type: DataTypes.DATE, allowNull: false },
    kuva: { type: DataTypes.STRING(200), allowNull: true },
  },
  { sequelize: conn, modelName: 'Ilmoitukset', freezeTableName: true }
);
// Tuotteet Malli
class Tuotteet extends Model {}
Tuotteet.init(
  {
    tuoteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tuottajaID: { type: DataTypes.INTEGER, allowNull: false },
    nimi: { type: DataTypes.STRING(100), allowNull: false },
    yksikko: { type: DataTypes.STRING(20), allowNull: false },
    kuvaus: { type: DataTypes.STRING(255), allowNull: false },
    tuotesaldo: { type: DataTypes.INTEGER, allowNull: false },
    yksikkohinta: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    tuote_on_aktiivinen: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { sequelize: conn, modelName: 'Tuotteet', freezeTableName: true }
);
// Reitit malli
class Reitit extends Model {}
Reitit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    jakopaiva_aika: { type: DataTypes.DATE, allowNull: false },
    jakopaikka: { type: DataTypes.STRING(100), allowNull: false },
    katuosoite: { type: DataTypes.STRING(100), allowNull: false },
    postinumero: { type: DataTypes.STRING(5), allowNull: false },
    paikkakunta: { type: DataTypes.STRING(50), allowNull: false },
    lisatieto: { type: DataTypes.STRING(255), allowNull: false },
    Tuottaja_id: { type: DataTypes.INTEGER },
  },
  { sequelize: conn, modelName: 'Reitit', freezeTableName: true }
);
// Tilaus malli
class Tilaus extends Model {}
Tilaus.init(
  {
    tilausnro: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    asiakasID: { type: DataTypes.INTEGER, allowNull: false },
    tuottajaID: { type: DataTypes.INTEGER, allowNull: false },
    ilmoitusID: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM(
        'odottaa',
        'vahvistettu',
        'toimituksessa',
        'suoritettu'
      ),
      allowNull: false,
      defaultValue: 'odottaa',
    },
    tilauspaiva: { type: DataTypes.DATE, allowNull: false },
    summa: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    Reitit_id: { type: DataTypes.INTEGER, allowNull: false },
    kuva: { type: DataTypes.STRING(200), allowNull: true },
  },
  { sequelize: conn, modelName: 'Tilaus', freezeTableName: true }
);
// Ilmoitus_has_Tuotteet malli
class Ilmoitus_has_Tuotteet extends Model {}
Ilmoitus_has_Tuotteet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tuoteID: { type: DataTypes.INTEGER, allowNull: false },
    tuottajaID: { type: DataTypes.INTEGER, allowNull: false },
    ilmoitusID: { type: DataTypes.INTEGER, allowNull: false },
    maara: { type: DataTypes.INTEGER, allowNull: false },
    yksikkohinta: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    kuva: { type: DataTypes.STRING(200) },
  },
  { sequelize: conn, modelName: 'Ilmoitus_has_Tuotteet', freezeTableName: true }
);
class Tilaus_has_Tuotteet extends Model {}
Tilaus_has_Tuotteet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tuoteID: { type: DataTypes.INTEGER, allowNull: false },
    tuottajaID: { type: DataTypes.INTEGER, allowNull: false },
    tilausID: { type: DataTypes.INTEGER },
    maara: { type: DataTypes.INTEGER, allowNull: false },
    yksikkohinta: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { sequelize: conn, modelName: 'Tilaus_has_Tuotteet', freezeTableName: true }
);
// Reitit_has_Ilmoitukset malli
class Reitit_has_Ilmoitukset extends Model {}
Reitit_has_Ilmoitukset.init(
  {
    reitit_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    Ilmoitukset_ilmoitusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize: conn,
    modelName: 'Reitit_has_Ilmoitukset',
    freezeTableName: true,
  }
);
// Luodaan suhde asiakkaan ja tilauksen välille
Asiakas.hasMany(Tilaus, { foreignKey: 'asiakasID' });
Tilaus.belongsTo(Asiakas, { foreignKey: 'asiakasID' });
// Tuottajan ja ilmoitusten välinen suhde
Tuottaja.hasMany(Ilmoitukset, { foreignKey: 'tuottajaID' });
Ilmoitukset.belongsTo(Tuottaja, { foreignKey: 'tuottajaID' });
// Tuottajan ja tuotteiden välinen suhde
Tuottaja.hasMany(Tuotteet, { foreignKey: 'tuottajaID' });
Tuotteet.belongsTo(Tuottaja, { foreignKey: 'tuottajaID' });
// Tuottajan ja reittien välinen suhde
Tuottaja.hasMany(Reitit, { foreignKey: 'Tuottaja_id' });
Reitit.belongsTo(Tuottaja, { foreignKey: 'Tuottaja_id' });
// Tuottajan ja tilauksen välinen suhde
Tuottaja.hasMany(Tilaus, { foreignKey: 'tuottajaID' });
Tilaus.belongsTo(Tuottaja, { foreignKey: 'tuottajaID' });
// Ilmoitusten ja tilauksen välinen suhde
Ilmoitukset.hasMany(Tilaus, { foreignKey: 'ilmoitusID' });
Tilaus.belongsTo(Ilmoitukset, { foreignKey: 'ilmoitusID' });
// Reittien ja tilauksen välinen suhde
Reitit.hasMany(Tilaus, { foreignKey: 'Reitit_id' });
Tilaus.belongsTo(Reitit, { foreignKey: 'Reitit_id' });
// Tuotteiden ja Ilmoitus_has_Tuotteet välinen suhde
Tuotteet.hasMany(Ilmoitus_has_Tuotteet, { foreignKey: 'tuoteID' });
Ilmoitus_has_Tuotteet.belongsTo(Tuotteet, { foreignKey: 'tuoteID' });
// Ilmoitusten ja Ilmoitus_has_Tuotteet välinen suhde
Ilmoitukset.hasMany(Ilmoitus_has_Tuotteet, { foreignKey: 'ilmoitusID' });
Ilmoitus_has_Tuotteet.belongsTo(Ilmoitukset, { foreignKey: 'ilmoitusID' });
// Tuottajan ja Ilmoitus_has_Tuotteet välinen suhde
Tuottaja.hasMany(Ilmoitus_has_Tuotteet, { foreignKey: 'tuottajaID' });
// Ilmoitus_has_Tuotteet ja tuottajan välinen suhde
Ilmoitus_has_Tuotteet.belongsTo(Tuottaja, { foreignKey: 'tuottajaID' });
//Tilauksen ja Tilaus_has_Tuotteet väline suhde
Tilaus.hasMany(Tilaus_has_Tuotteet, { foreignKey: 'tilausID' });
Tilaus_has_Tuotteet.belongsTo(Tilaus, { foreignKey: 'tilausID' });
Tuottaja.hasMany(Tilaus_has_Tuotteet, { foreignKey: 'tuottajaID' });
// Tilaus_has_Tuotteet ja Tuottajan välinen suhde
Tilaus_has_Tuotteet.belongsTo(Tuottaja, { foreignKey: 'tuottajaID' });
// Reitit kuuluvat useampaan ilmoitukseen ja ilmoituksella voi olla useampi reitti
Reitit.belongsToMany(Ilmoitukset, {
  through: Reitit_has_Ilmoitukset,
  foreignKey: 'reitit_id',
  otherKey: 'Ilmoitukset_ilmoitusID',
});
Ilmoitukset.belongsToMany(Reitit, {
  through: Reitit_has_Ilmoitukset,
  foreignKey: 'Ilmoitukset_ilmoitusID',
  otherKey: 'reitit_id',
});

export {
  Asiakas,
  Tuottaja,
  Ilmoitukset,
  Tuotteet,
  Reitit,
  Tilaus,
  Ilmoitus_has_Tuotteet,
  Tilaus_has_Tuotteet,
  Reitit_has_Ilmoitukset,
};
// Exportataan modelit
