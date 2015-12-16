'use strict';

var React = require('react-native');
var { NavigatorIOS, StyleSheet } = React;
var Firebase = require('firebase');
var Main = require('./Main');
var Home = require('./Home');

var App = React.createClass({
  getInitialState() {
    return {
      navigationBarHidden: false
    }
  },
  toggleNavBar() {
    this.setState({
      navigationBarHidden: !this.state.navigationBarHidden
    })
  },
  render() {
    return (
      <NavigatorIOS ref="nav"
                    barTintColor="#00b9ff"
                    tintColor="#fff"
                    titleTextColor="#fff"
                    itemWrapperStyle={styles.navWrap}
                    style={styles.nav}
                    navigationBarHidden={this.state.navigationBarHidden}
                    initialRoute={{
                        title: "Login",
                        component: Home,
                        passProps: {
                            toggleNavBar: this.toggleNavBar,
                        }
                      }} />
    );
  }
});

var styles = StyleSheet.create({
  navWrap: {
    flex: 1,
  },
  nav: {
    flex: 1
  },
});

module.exports = App;
