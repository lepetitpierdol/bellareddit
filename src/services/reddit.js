import APIService from './api';

class RedditService {
  test() {
    return APIService.make('get', 'https://www.reddit.com/r/all/hot.json');
  }
}

export default new RedditService();