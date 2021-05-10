import axios from 'axios';

export default axios.create({
  baseURL: 'https://bitcoin-mern.herokuapp.com/api',
  responseType: 'json',
});
