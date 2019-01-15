import React from "react";
import { connect } from 'react-redux';
import * as actions from 'store/actions/index';
import { Redirect } from 'react-router-dom';


import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Https from "@material-ui/icons/Https";
import AccountCircle from "@material-ui/icons/AccountCircle";

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinksUnauth from "components/Header/HeaderLinksUnauth.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import signupPageStyle from "assets/jss/material-kit-react/views/signupPage.jsx";

import image from "assets/img/bg7.jpg";

class SignupPage extends React.Component {

  state = {
    cardAnimaton: "cardHidden",
    email: '',
    password: '',
    username: ''
  };

  componentDidMount = () => {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      500
    );
  }

   handleChange = (event) => {
     this.setState({
       [event.target.name]: event.target.value
     })
   };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onSignup(this.state.email, this.state.password, this.state.username);
  }

  render(){
    const { classes, ...rest } = this.props;

    let usernameError = '';
    let emailError = '';
    let passwordError = ''
    let takenWarning = '';
    let errorMessage = '';

    if (this.props.errors) {
      if(this.props.errors.username){usernameError = `Username ${this.props.errors.username[0]}`};
        if(this.props.errors.password){passwordError = `Password ${this.props.errors.password[0]}`};
        if (this.props.errors.email){
          emailError = `Email ${this.props.errors.email[0]}`;
          if (this.props.errors.email[0] === "has already been taken"){
            takenWarning = 
            <SnackbarContent
              message={
                <span>
                  <b> Email Already In Use </b> please choose a different email.
                </span>
              }
            close
            color="danger"
            icon="info_outline"
          />
          }
        }
    }
    if ( this.props.errors === "Not Found") {
        errorMessage = (
          <SnackbarContent
            message={
              <span>
                <b>USER NOT FOUND:</b> please enter a valid password-email combination
              </span>
            }
            close
            color="danger"
            icon="info_outline"
          />
        );
    }

    let authRedirect = null;
    if (this.props.isNewSignup) {
      authRedirect = <Redirect to = "/login-page" />
    }

    return (
      <div>
      {authRedirect}
        <Header
          absolute
          color="transparent"
          brand="My Cook Book"
          rightLinks={<HeaderLinksUnauth />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
        {takenWarning}
        {errorMessage}
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Signup</h4>
                  </CardHeader>
                  <form className={classes.form} onSubmit={this.submitHandler}>
                    <CardBody>
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    type= "text"
                    placeholder="Choose Username"
                    label="Username"
                    name="username"
                    fullWidth
                    value={this.state.username}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                            <InputAdornment position="end">
                              <AccountCircle className = {
                                classes.inputIconsColor
                              }
                              />
                            </InputAdornment>
                      ),
                    }}
                  />
                  <Typography color='error' variant="caption" gutterBottom>{usernameError}</Typography>
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    type= "email"
                    label="Email"
                    placeholder = "Enter Valid Email Adress"
                    name="email"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                      ),
                    }}
                  />
                      <Typography color='error' variant="caption" gutterBottom>{emailError}</Typography>
                    <TextField
                    variant="outlined"
                    type= "password"
                    label="Password"
                    placeholder = "8 characters minimum"
                    name="password"
                    fullWidth
                    value={this.state.password}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                            <InputAdornment position="end">
                              <Https className={classes.inputIconsColor} />
                            </InputAdornment>
                      ),
                    }}
                  />
                      <Typography color='error' variant="caption" gutterBottom>{passwordError}</Typography>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" type="submit">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errors: state.auth.signupError,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    isNewSignup: state.auth.isNewSignup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (email, password, username) => dispatch(actions.signup(email, password, username))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(signupPageStyle)(SignupPage));

