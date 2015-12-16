'use strict';

var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  } = React;
var Firebase = require('firebase');

var firebaseRef = new Firebase('https://boiling-heat-6944.firebaseio.com');
var usersRef = firebaseRef.child('users');

var PlayItem = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.songTitle}</Text>
        <Text>{this.props.artist}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = PlayItem;
