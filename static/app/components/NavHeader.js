import React from 'react';
import {Link} from 'react-router-dom';

export default class NavHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isBackgroundActive: false,
      isLogoUp: true,
      scrollCutoff: 100
    };
  }

  onMobileClick = () =>
    this.setState({
      isHidden: !this.state.isHidden
    });

  handleScroll = () => {
    let {scrollCutoff} = this.state;

    this.setState({
      isBackgroundActive: $(window).scrollTop() > 0,
      isLogoUp: $(window).scrollTop() <= scrollCutoff
    });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {isHidden, isBackgroundActive, isLogoUp} = this.state;
    const navOpen = (isHidden ? '' : 'nav-open');
    const activeBackground = (isBackgroundActive ?
      'sd-nav__background-active' : '');
    console.log(isHidden, isLogoUp);
    const logoUp = ((isHidden && isLogoUp) ? 'sd-nav__logo-up' : '');

    return (<nav className={`sd-nav ${navOpen}`}>
      <div className={`sd-nav__background ${activeBackground}`}></div>
      <div className="container sd-container">
        <div className="sd-nav__left sd-nav__side">
          <a className={`sd-nav__logo-wrap ${logoUp}`} href="/">
            <img className="sd-nav__logo" src="/assets/img/vectors/logo.svg" />
          </a>
        </div>
        <div className="sd-nav__right hidden-sm-down">
          <ul className="sd-inline-list sd-nav__links">
            <Link to="/apply"><li>Apply</li></Link>
            <Link to="/user/login"><li>Login</li></Link>
            <a href="https://tesc.typeform.com/to/PYPjRK"><li>Volunteer</li></a>
            <a href="mailto://tesc.ucsd.edu"><li>Sponsor</li></a>
            <a href="http://2016.sdhacks.io"><li>2016 Site</li></a>
          </ul>
        </div>
        <a className="mobile-link hidden-sm-up sd-nav__mobile-link"
          onClick={this.onMobileClick}>
          <span className="mobile-hamburger"></span>
        </a>
        <div className="navigation nav-right sd-nav__mobile">
          <ul>
            <li><a className="sd-nav__mobile-link" href="/">Home</a></li>
            <li><Link className="sd-nav__mobile-link"
              to="/apply">Apply</Link></li>
            <li><Link className="sd-nav__mobile-link"
              to="/user/login">Login</Link></li>
            <li><a className="sd-nav__mobile-link"
              href="https://tesc.typeform.com/to/PYPjRK">Volunteer</a></li>
            <li><a className="sd-nav__mobile-link"
              href="mailto://tesc.ucsd.edu">Sponsor</a></li>
            <li><a className="sd-nav__mobile-link"
              href="http://2016.sdhacks.io">2016 Site</a></li>
          </ul>
        </div>
      </div>
    </nav>);
  }
};
