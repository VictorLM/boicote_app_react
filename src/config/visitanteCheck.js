import Cookies from 'js-cookie';
import axios from './axios';

async function visitanteCheck() {
  let dominio = '';

  if (process.env.NODE_ENV === 'production') {
    dominio = '.boicote.app';
  } else if (process.env.NODE_ENV === 'development') {
    dominio = 'localhost';
  }

  const visitanteId = Cookies.get('visitanteId');

  if (visitanteId === undefined) {
    try {
      const response = await axios.get('/visitantes/novo-visitante', { withCredentials: false });
      Cookies.set('visitanteId', response.data, { domain: dominio, expires: 1825 });
    } catch (err) {
      // TODO?
      // console.error(err);
    }
  }
}

export default visitanteCheck;
