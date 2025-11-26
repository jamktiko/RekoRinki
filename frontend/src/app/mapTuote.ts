/**
 * kun backendista tuleva data on erilaisessa muodossa kuin mitä siellä ostoskorissa vaaditetaan.
 * ostokori vaaditaan myös uniqueID, amount ja totalprice. ei pelkä id, nimi ja hinta
 * sen takia teeme vain yhden kertaa mapTuote(), joka muuntaa tuotteen data ostoskoriin sopivaksi muodoksi.
 */

import { Product, YhdenIlmoitusTuotteet } from './types';

export function mapTuote(raw: YhdenIlmoitusTuotteet): Product {
  return {
    id: parseInt(raw.uniqueId.split('_')[0]), // esim. "1_2" → 1
    producerID: parseInt(raw.uniqueId.split('_')[1]), // esim. "1_2" → 2
    uniqueId: raw.uniqueId,

    // ------ perus data ------
    name: raw.tuotteet.nimi,
    description: raw.tuotteet.kuvaus || undefined,
    price: parseFloat(raw.tuotteet.yksikkohinta),

    // ------ UI & logiikka ------
    amount: 0, // Ostoskori lisää oman määrän
    totalprice: 0,
    image: raw.kuva ?? undefined,
    inventory: raw.maara,
    unit: 'kpl', // backendissa ei ole muuta tietoa
  };
}
