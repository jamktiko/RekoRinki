// Tuodaan sequelizeyhteys
import con from '../dbconnection.js';
// Tuodaan tarvittavat modelit
import {
  Asiakas,
  Tuottaja,
  Ilmoitukset,
  Reitit,
  Tilaus_has_Tuotteet,
  Tilaus,
  Tuotteet,
} from '../models/model.js';
// Luodaan tilaus funktio tilauksen tekemiseen
const tilaus = async (data) => {
  // Aloitetaan transaktio
  const transaktio = await con.startUnmanagedTransaction();
  try {
    // Luodaan summa muuttuja jonka arvo on 0
    let summa = 0;
    // luodaan uusi tilaus tilaustauluun
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
    // Lisätään tilauksen tuotteet tuotetauluun
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
      // Kasvatetaan summaa mikä on
      summa += i.maara * i.yksikkohinta;
      // Vähennetään ostettujen tuotteiden määrä tuotesaldosta
      await Tuotteet.increment(
        { tuotesaldo: -i.maara },
        { where: { tuoteID: i.tuoteID }, transaction: transaktio }
      );
    }
    // Päivitetään tilauksen lopullinen summa
    await Tilaus.increment(
      { summa: +summa },
      { where: { tilausnro: uusiTilaus.tilausnro }, transaction: transaktio }
    );
    // Tehdään kommit ja transaktio onnistuu
    await transaktio.commit();
    return uusiTilaus;
    // Virheen käsittely jos tilaus epäonnistuu
  } catch (error) {
    // Peruutetaan transaktio transaktion tapahtumat ja heitetään error
    await transaktio.rollback();
    throw error;
  }
};
export default tilaus;
// Exportataan tilausfunktio
