import { Asiakas, Tuottaja } from '../models/model.js';
import bcrypt from 'bcryptjs';
import createToken from '../createToken.js';
const login = async(data) => {
 try {
data = {tuottaja, sahkoposti, salasana}
 let kayttaja;
 if(tuottaja === true) {
  kayttaja = await Tuottaja.findOne({sahkoposti, salasana})
 }else {
  kayttaja = await Asiakas.findOne({tuottaja, sahkoposti, salasana})
 }
 if(!kayttaja) {
 res.json({
        success: false,
        message: 'Kirjautuminen epäonnistui',
      });
    }
     
 }
}
}