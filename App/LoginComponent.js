'use strict';

var React = require('react-native');
var { TouchableHighlight, TextInput, Text, View, StyleSheet } = React;
var Firebase = require('firebase');
var RegisterButton = require('./RegisterButton');
var Home = require('./Home');

var firebaseRef = new Firebase('https://boiling-heat-6944.firebaseio.com');

var LoginComponent = React.createClass({
  getInitialState() {
    return ({
      userEmail : '',
      userPassword : ''
    });
  },
  onPress() {
    firebaseRef.authWithPassword({
      email: this.state.userEmail,
      password: this.state.userPassword
    }, (error, authData) => {
      if(error) {
        this.props.setErrorMsg(error.message);
        this.props.setModalVisible(true);
      } else {
        // 로그인 성공시 홈 화면으로 이동한다.
        this.props.navigator.replace({
          title: 'Home',
          component: Home
        })
      }
    });
  },
  render() {
    return (
      <View style={styles.inputs}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.userInput}
            placeholder="Email"
            placeholderTextColor="#999999"
            onChangeText={(text) => this.setState({ userEmail: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.userInput}
            placeholder="Password"
            placeholderTextColor="#999999"
            onChangeText={(text) => this.setState({ userPassword: text })}
            secureTextEntry={true}
          />
        </View>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={this.onPress}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        <RegisterButton toggleNavBar={this.props.toggleNavBar}
                        navigator={this.props.navigator} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    flex: .25
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#f3f3f3',
    borderColor: 'transparent'
  },
  title: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#fffdec'
  },
  userInput: {
    marginTop: 10,
    width: 400,
    height: 30,
    color: '#000',
    paddingLeft: 1,
  },
  loginButton: {
    padding: 10,
    height: 45,
    backgroundColor: '#00b9ff',
    marginTop: 30
  },
  loginText: {
    fontSize: 19,
    alignSelf: 'center',
    color: '#fffdec'
  }
});

module.exports = LoginComponent;
