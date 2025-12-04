// import { Sequelize } from '@sequelize/core';
import con from '../dbconnection.js';
import {
  Asiakas,
  Tuottaja,
  Ilmoitukset,
  Reitit,
  Tilaus_has_Tuotteet,
  Tilaus,
  Tuotteet,
} from '../models/model.js';
const tilaus = async (data) => {
  const transaktio = await con.startUnmanagedTransaction();
  try {
    const uusiTilaus = await Tilaus.create(
      {
        asiakasID: data.asiakasID,
        tuottajaID: data.tuottajaID,
        ilmoitusID: data.ilmoitusID,
        status: 'odottaa',
        tilauspaiva: data.tilauspaiva,
        summa: data.summa,
        Reitit_id: data.Reitit_id,
        kuva: data.kuva,
      },
      { transaction: transaktio }
    );
    for (const i of data.Tuotteet) {
      await Tilaus_has_Tuotteet.create(
        {
          tuoteID: i.tuoteID,
          tuottajaID: i.tuottajaID,
          tilausID: uusiTilaus.tilausnro,
          maara: i.maara,
          yksikkohinta: i.yksikkohinta,
        },
        { transaction: transaktio }
      );
      await Tuotteet.increment(
        { tuotesaldo: -i.maara },
        { where: { tuoteID: i.tuoteID }, transaction: transaktio }
      );
    }
    await transaktio.commit();
    return uusiTilaus;
  } catch (error) {
    await transaktio.rollback();
    throw error;
  }
};
export default tilaus;
