import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import logo from '../../image/logo-black.png';

const { login } = authAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login } = this.props;
    login();
    this.props.history.push('/dashboard');
  };
  render() {
    const from = { pathname: '/dashboard' };
    const style = { height: '80px' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <img src={logo} alt="logo" style={style} />
              </Link>
            </div>

            <div className="isoSignInForm">

              <p className="isoHelperText">
                Welcome to the React Dojo Demo!<br />
                <br />
                <br />
                Please sign in via Facebook or Google to help us keep track of who has been visiting!<br />
                <br />
                If you would like to sign in without using OAuth, please sign in using the following to begin:<br />
                <br />
                &nbsp;&nbsp;&nbsp;Email:    demo@demo.com<br />
                &nbsp;&nbsp;&nbsp;Password: demo
              </p>

              <div className="isoInputWrapper isoOtherLogin">
                {Auth0.isValid &&
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signInToProceed" />
                  </Button>}
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
  }),
  { login }
)(SignIn);
