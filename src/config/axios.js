import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.boicote.app',
  // baseURL: 'http://localhost:3001',
});
