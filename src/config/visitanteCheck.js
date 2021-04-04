import Cookies from 'js-cookie';
import axios from './axios';

async function visitanteCheck() {
  const visitanteId = Cookies.get('visitanteId');

  if (visitanteId === undefined) {
    await axios.get('/visitantes/novo-visitante', { withCredentials: false })
      .then((response) => {
        Cookies.set('visitanteId', response.data, { expires: 1825 });
      })
      .catch((error) => {
        // eslint-disable-next-line
          console.log(error); // TODO
      })
      .then(() => {
        // always executed
      });
  }
}

export default visitanteCheck;
