import React from 'react';
import classNames from 'classnames/bind';
import RedditService from './services/reddit';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchActive: false,
      headerShadow: false
    };

    this.onMenuScroll = this.onMenuScroll.bind(this);
    this.onSearchToggle = this.onSearchToggle.bind(this);
  }

  componentDidMount() {
    RedditService.test().then((res) => {
      const json = res.data;
      let posts = json.data.children.map(item => {
        return item.data;
      });

      console.dir(posts);

      this.setState({
        posts
      });
    });

    window.addEventListener('scroll', event => {
      this.setState({headerShadow: window.scrollY !== 0});
    });
  }

  onMenuScroll(event) {
    event.preventDefault();

    if (event.deltaY > 0) {
      this.refs.menuList.scrollLeft += 30;
    } else {
      this.refs.menuList.scrollLeft -= 30;
    }
  }

  onSearchToggle() {
    this.setState({
      searchActive: !this.state.searchActive
    });
  }

  render() {
    return (
      <div className="app">
        <div className="bar"></div>

        <header className={classNames({shadow: this.state.headerShadow})}>
          <a className="logo">
            bella
          </a>

          <div className="menu">
            <ul ref="menuList" onWheel={this.onMenuScroll}>
              <li className="active"><a>all</a></li>
              <li><a>grandtour</a></li>
              <li><a>europe</a></li>
              <li><a>polska</a></li>
              <li><a>mildlyinteresting</a></li>
              <li><a>eli5</a></li>
              <li><a>imgoingtohellforthis</a></li>
            </ul>

            <div className="fade start"></div>
            <div className="fade end"></div>
          </div>

          <div className="right">
            <div className={classNames('search', {active: this.state.searchActive})}>
              {this.state.searchActive &&
                <input type="text" placeholder="Search for subreddit..." />
              }

              <button onClick={this.onSearchToggle}>
                <i className="material-icons">search</i>
              </button>
            </div>

            <button className="search">
              <i className="material-icons">settings</i>
            </button>
          </div>
        </header>

        <div className="container">
          {this.state.posts &&
            <section className="posts">
              {this.state.posts.map(post => {
                return <div className="post" key={post.id}>
                  <h1>
                    <a>{post.title}</a>
                  </h1>

                  <h2>Some shorter text as description...</h2>

                  <div className="actions">
                    <a>Open link</a>
                    <a>Comments</a>
                    <a>Open in browser</a>
                  </div>
                </div>
              })}
            </section>
          }
        </div>
      </div>
    );
  }
}

export default App;
