import {Ilmoitukset, Tuotteet, Tuottajat, Reitit, Ilmoitus_has_Tuotteet } from '../models/model.js';
const haeIlmoitus = async(ilmoitusid) =>{
try {
  const ilmoitus = await Ilmoitukset.findOne({
    where: { ilmoitusid: id},
    include: [{
      Model: Ilmoitukset,
 attributes: ['title', 'maakunta', 'kuva', 'kuvaus',],}
});
return haeIlmoitus;
} catch(error) {
}