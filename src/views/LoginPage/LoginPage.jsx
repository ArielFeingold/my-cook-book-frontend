import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from 'store/actions/index';

import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Https from "@material-ui/icons/Https";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinksHeaderLinksUnauth from "components/Header/HeaderLinksUnauth.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
import HeaderLinksUnauth from "../../components/Header/HeaderLinksUnauth";

class LoginPage extends React.Component {

    state = {
      cardAnimaton: "cardHidden",
      email: '',
      password: ''
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
    this.props.onLogin(this.state.email, this.state.password);
  }

  render() {
    const { classes, ...rest } = this.props;

    let emailError = '';
    let passwordError = ''
    let errorMessage = null;

    if (this.props.errors) {
        if(this.props.errors.password){passwordError = `Password ${this.props.errors.password[0]}`};
        if (this.props.errors.email){
          emailError = `Email ${this.props.errors.email[0]}`;
          if (this.props.errors.email[0] === "has already been taken"){
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
      }
    }
    let authRedirect = null;
    if ( this.props.isAuthenticated ) {
        authRedirect = <Redirect to="/profile-page" />
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
        {errorMessage}
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.submitHandler}>
                    <CardHeader style={{title:"2em"}} color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                    </CardHeader>
                    <CardBody>
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
                        Login
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
        errors: state.auth.loginError,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: ( email, password ) => dispatch( actions.login( email, password) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(LoginPage));
