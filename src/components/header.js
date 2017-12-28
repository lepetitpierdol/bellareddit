import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import RedditService from '../services/reddit';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerShadow: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', event => {
      this.setState({headerShadow: window.scrollY !== 0});
    });
  }

  login() {
    RedditService.login();
  }

  render() {
    return (
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
            {this.props.user &&
              <i className="material-icons">settings</i>
            }

            {!this.props.user &&
              <a onClick={this.login}>
                <i className="material-icons">person</i>
              </a>
            }
          </button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user
});

export default connect(mapStateToProps)(Header);