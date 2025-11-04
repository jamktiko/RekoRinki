const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const conn = require('./dbconnection');
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
    puhelinnro: {
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
    kuva: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
  },
  { sequelize: conn, modelName: 'Asiakas', freezeTableName: true }
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
    puhelinnro: {
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
    kuva: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
  },
  { sequelize: conn, modelName: 'Tuottaja', freezeTableName: true }
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
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    voimassaolo_paattyy: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    kuva: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
  },
  { sequelize: conn, modelName: 'Ilmoitukset', freezeTableName: true }
);
class Tuotteet extends Model {}
Tuotteet.init(
  {
    tuoteID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tuottajaID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
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
  {
    sequelize: conn,
    modelName: 'Tuotteet',
    freezeTableName: true,
  }
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
    Tuottaja_id: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize: conn, modelName: 'Reitit', freezeTableName: true }
);
class Tilaus extends Model {}
Tilaus.init(
  {
    tilausnro: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    asiakasID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tuottajaID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ilmoitusID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(
        'odottaa',
        'vahvistettu',
        'toimituksessa',
        'suoritettu'
      ),
      allowNull: false,
      defaultValue: 'odottaa',
    },
    tilauspaiva: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    summa: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    Reitit_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    kuva: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
  },
  { sequelize: conn, modelName: 'Tilaus', freezeTableName: true }
);
class Ilmoitus_has_Tuotteet extends Model {}
Ilmoitus_has_Tuotteet.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tuoteID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tuottajaID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ilmoitusID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    maara: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    yksikkohinta: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    kuva: {
      type: Sequelize.STRING(200),
    },
  },
  { sequelize: conn, modelName: 'Ilmoitus_has_Tuotteet', freezeTableName: true }
);
class Tilaus_has_Tuotteet extends Model {}
Tilaus_has_Tuotteet.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tuoteID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tuottajaID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tilausID: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    maara: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    yksikkohinta: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { sequelize: conn, modelName: 'Tilaus_has_Tuotteet', freezeTableName: true }
);
class Reitit_has_Ilmoitukset extends Model {}
Reitit_has_Ilmoitukset.init(
  {
    reitit_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Ilmoitukset_ilmoitusID: {
      type: Sequelize.INTEGER,
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
Asiakas.hasMany(Tilaus, {
  foreignKey: 'asiakasID',
  sourceKey: 'id',
});
Tilaus.belongsTo(Asiakas, {
  foreignKey: 'asiakasID',
  targetKey: 'id',
});
Tuottaja.hasMany(Ilmoitukset, {
  foreignKey: 'tuottajaID',
  sourceKey: 'id',
});
Ilmoitukset.belongsTo(Tuottaja, {
  foreignKey: 'tuottajaID',
  targetKey: 'id',
});
Tuottaja.hasMany(Tuotteet, {
  foreignKey: 'tuottajaID',
  sourceKey: 'id',
});
Tuotteet.belongsTo(Tuottaja, {
  foreignKey: 'tuottajaID',
  targetKey: 'id',
});
Tuottaja.hasMany(Reitit, {
  foreignKey: 'Tuottaja_id',
  sourceKey: 'id',
});
Reitit.belongsTo(Tuottaja, {
  foreignKey: 'Tuottaja_id',
  targetKey: 'id',
});
Tuottaja.hasMany(Tilaus, {
  foreignKey: 'tuottajaID',
  sourceKey: 'id',
});
Tilaus.belongsTo(Tuottaja, {
  foreignKey: 'tuottajaID',
  targetKey: 'id',
});
Ilmoitukset.hasMany(Tilaus, {
  foreignKey: 'ilmoitusID',
  sourceKey: 'ilmoitusID',
});
Tilaus.belongsTo(Ilmoitukset, {
  foreignKey: 'ilmoitusID',
  targetKey: 'ilmoitusID',
});
Reitit.hasMany(Tilaus, {
  foreignKey: 'Reitit_id',
  sourceKey: 'id',
});
Tilaus.belongsTo(Reitit, {
  foreignKey: 'Reitit_id',
  targetKey: 'id',
});
Tuotteet.hasMany(Ilmoitus_has_Tuotteet, {
  foreignKey: 'tuoteID',
  sourceKey: 'tuoteID',
});
Ilmoitus_has_Tuotteet.belongsTo(Tuotteet, {
  foreignKey: 'tuoteID',
  targetKey: 'tuoteID',
});
Ilmoitukset.hasMany(Ilmoitus_has_Tuotteet, {
  foreignKey: 'ilmoitusID',
  sourceKey: 'ilmoitusID',
});
Ilmoitus_has_Tuotteet.belongsTo(Ilmoitukset, {
  foreignKey: 'ilmoitusID',
  targetKey: 'ilmoitusID',
});
Tuottaja.hasMany(Ilmoitus_has_Tuotteet, {
  foreignKey: 'tuottajaID',
  sourceKey: 'id',
});
Ilmoitus_has_Tuotteet.belongsTo(Tuottaja, {
  foreignKey: 'tuottajaID',
  targetKey: 'id',
});
Tilaus.hasMany(Tilaus_has_Tuotteet, {
  foreignKey: 'tilausID',
  sourceKey: 'tilausnro',
});
Tilaus_has_Tuotteet.belongsTo(Tilaus, {
  foreignKey: 'tilausID',
  targetKey: 'tilausnro',
});
Tuottaja.hasMany(Tilaus_has_Tuotteet, {
  foreignKey: 'tuottajaID',
  sourceKey: 'id',
});
Tilaus_has_Tuotteet.belongsTo(Tuottaja, {
  foreignKey: 'tuottajaID',
  targetKey: 'id',
});
Reitit.belongsToMany(Ilmoitukset, {
  through: Reitit_has_Ilmoitukset,
  foreignKey: 'Reitit_id',
  otherKey: 'Ilmoitukset_ilmoitusID',
});
Ilmoitukset.belongsToMany(Reitit, {
  through: Reitit_has_Ilmoitukset,
  foreignKey: 'Ilmoitukset_ilmoitusID',
  otherKey: 'Reitit_id',
});
module.exports = {
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

// test
