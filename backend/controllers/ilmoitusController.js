import {
  Ilmoitukset,
  Tuotteet,
  Reitit,
  Ilmoitus_has_Tuotteet,
  Reitit_has_Ilmoitukset,
} from '../models/model.js';

const haeIlmoitus = async (ilmoitusID) => {
  try {
    const ilmoitus = await Ilmoitukset.findOne({
      where: { ilmoitusID: ilmoitusID },
      include: [
        {
          model: Ilmoitus_has_Tuotteet,
          include: [Tuotteet],
        },
        {
          model: Reitit_has_Ilmoitukset,
          include: [Reitit],
          association: 'reititsIlmoituksets',
          freezeAssociationName: true,
          //ei ole reititIlmoitukset vaan se on reititsIlmoituksets, koska se on monen suhde moneen
        },
      ],
    });

    return ilmoitus;
  } catch (error) {
    throw error;
  }
};

export default haeIlmoitus;
