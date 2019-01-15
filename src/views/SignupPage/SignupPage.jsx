import React from "react";
import { connect } from 'react-redux';
import * as actions from 'store/actions/index';
import { Redirect } from 'react-router-dom';


import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import signupPageStyle from "assets/jss/material-kit-react/views/signupPage.jsx";

import image from "assets/img/bg7.jpg";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: '',
      password: '',
      username: ''
    };
  }
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      500
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';
    this.props.onLogin(this.state.email, this.state.password);
  }

  render() {
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
                  <b>USER NOT FOUND:</b> please enter a valid password-email combination
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
                  <form className={classes.form}>
                    <CardHeader style={{title:"2em"}} color="primary" className={classes.cardHeader}>
                      <h4>Signup</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Username"
                        id="first"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                  <Typography color='error' variant="caption" gutterBottom>{usernameError}</Typography>
                      <CustomInput
                        labelText="Email Address"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <Typography color='error' variant="caption" gutterBottom>{emailError}</Typography>
                      <CustomInput
                        labelText="Password (8 Characters Minimum)"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      <Typography color='error' variant="caption" gutterBottom>{passwordError}</Typography>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg">
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

export default withStyles(signupPageStyle)(SignupPage);

