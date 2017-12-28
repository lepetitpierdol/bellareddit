import APIService from './api';
const ipcRenderer = window.require('electron').ipcRenderer;

class RedditService {
  test() {
    return APIService.make('get', 'https://www.reddit.com/r/all/hot.json');
  }

  login() {
    ipcRenderer.sendSync('authorize');
  }
}

export default new RedditService();