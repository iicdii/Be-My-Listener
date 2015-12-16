'use strict';

var React = require('react-native');
var { View, Text, TouchableHighlight, StyleSheet } = React;
var Firebase = require('firebase');
var Register = require('./Register');

var RegisterButton = React.createClass({
  getInitialState() {
    return {};
  },
  onPress() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Register
    });
  },
  render() {
    return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#c4efff"
        onPress={this.onPress}>
        <Text style={styles.registerText}>Sign Up</Text>
      </TouchableHighlight>
    </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    width: 70,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e9e9e9',
    backgroundColor: '#ffffff',
    marginTop: 20,
  },
  registerText: {
    fontSize: 13,
    alignSelf: 'center',
    color: '#9a9a9a'
  }
});

module.exports = RegisterButton;
