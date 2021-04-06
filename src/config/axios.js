import axios from 'axios';

export default axios.create({
  // baseURL: 'https://api.boicote.app', // PRODUÇÃO
  baseURL: 'http://localhost:3001', // DEV
});
