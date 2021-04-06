import Cookies from 'js-cookie';
import axios from './axios';

async function visitanteCheck() {
  // const dominio = '.localhost.local'; // DEV
  const dominio = '.boicote.app';
  const visitanteId = Cookies.get('visitanteId');

  if (visitanteId === undefined) {
    try {
      const response = await axios.get('/visitantes/novo-visitante', { withCredentials: false });
      Cookies.set('visitanteId', response.data, { path: '', domain: dominio, expires: 1825 });
    } catch (err) {
      // console.error(err);
    }
  }
}

export default visitanteCheck;
