import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://recruting-test-api.herokuapp.com/api/v1'
});

export default instance;
