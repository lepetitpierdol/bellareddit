import * as axios from 'axios';

class APIService {
  make(method, url) {
    return axios.request({
      url,
      method,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
}

export default new APIService();