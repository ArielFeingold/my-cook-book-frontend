import React from "react";
import { Link } from 'react-router-dom';

import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
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

import landingPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
import HeaderLinksUnauth from "../../components/Header/HeaderLinksUnauth";


const MyLink = props => <Link to="/signup-page" {...props} />

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: '',
      password: ''
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
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

    let errorMessage = null;
    if (this.props.errors === "Not Found") {
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


    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="PotLuck"
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
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <CardHeader className={classes.cardHeader} color="success" > Welcome to My Cook Book </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Your Recipes, Anywhere</h4>
                    <p>
                      My cook book allows you to collect all your favorite recipes and access them on the go.
                    </p>
                    <Button color="primary" component={MyLink}>Signup</Button>
                  </CardBody>
                  <CardFooter className={classes.footer}>
                    Already have an account?  <Link className="nav-link"
                      to="/login-page" > &nbsp;Login </Link>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
