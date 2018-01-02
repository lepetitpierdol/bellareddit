import APIService from './api';
import {EventEmitter} from 'fbemitter';
const ipcRenderer = window.require('electron').ipcRenderer;

class RedditService {
  events$ = new EventEmitter();

  constructor() {
    console.log('construct');
    ipcRenderer.on('authorized', (event, data) => {
      console.dir(data);

      this.events$.emit('authorized');
    });
  }

  test() {
    return APIService.make('get', 'https://www.reddit.com/r/all/hot.json');
  }

  login() {
    ipcRenderer.sendSync('authorize');
  }
}

export default new RedditService();