import React from 'react';
import RedditService from './services/reddit';
import Header from './components/header';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchActive: false
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

        <Header />

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
