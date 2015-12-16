'use strict';

var React = require('react-native');
var {
  Image,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet
  } = React;
var Firebase = require('firebase');
var s = require('underscore.string');
var _ = require('lodash');
var t = require('tcomb-form-native');

var firebaseRef = new Firebase('https://boiling-heat-6944.firebaseio.com');
var usersRef = firebaseRef.child('users');
var testRef = new Firebase('https://boiling-heat-6944.firebaseio.com/users');

var Form = t.form.Form;

var Person = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  password: t.String
});

var options = {
  fields: {
    firstName: {
      autoFocus: true,
      maxLength: 40
    },
    lastName: {
      maxLength: 40
    },
    email: {
      error: 'Please enter valid email',
      maxLength: 40
    },
    password: {
      secureTextEntry: true,
      maxLength: 30
    }
  },
  auto: 'placeholders'
};

var Register = React.createClass({
  getInitialState() {
    return {
      value: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      errorMsg: '',
      animated: true,
      modalVisible: false,
      transparent: true,
    };
  },
  onChange(value) {
    this.setState({value});
  },
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },
  completeRegister() {
    // 모달의 OK 버튼을 누르면 모달을 닫고 메인화면으로 돌아간다.
    this.setModalVisible(false);
    this.props.navigator.pop();
  },
  onPress() {
    var value = this.refs.form.getValue();
    // 회원가입 폼이 유효하면 회원가입을 진행한다.
    if(value) {
      firebaseRef.createUser({
        email: value.email,
        password: value.password
      }, (error, authData) => {
        if (error) {
          console.log(error);
          this.setState({errorMsg: error.message});
        } else {
          // 가입하기 전에 동일한 이메일이 있는지 확인한다.
          usersRef
            .orderByChild('email')
            .equalTo(value.email)
            .once('value', snapShot =>{
              if(snapShot.val()){
                // 이메일이 이미 등록되있으면 에러를 표시한다
                this.setState({ errorMsg: 'Account already exists.' });
              } else {
                // 이메일이 등록되있지 않으면 회원으로 등록한다.
                var firstName = s(value.firstName).capitalize().clean().value();
                var lastName = s(value.lastName).capitalize().clean().value();
                var name = s.join("-", s(firstName).decapitalize().value(),
                  s(lastName).decapitalize().value());
                usersRef.child(authData.uid).set({
                  provider: 'password',
                  name: name,
                  emails: value.email,
                  profile: {
                    firstName: firstName,
                    lastName: lastName,
                    picture: null
                  }
                });
                console.log("Register Done.");
                this.setModalVisible(true);
              }
            }
            );
        }
      });
    }

  },
  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0,0,0,0.5)' :
        '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent ?
    {backgroundColor: '#fff', padding: 20} : null;

    return (
      <View style={styles.container}>
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}>
          <View style={[styles.modalContainer, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>회원가입이 완료되었습니다.</Text>
              <TouchableHighlight
                onPress={this.completeRegister}
                underlayColor="#ffe3d6"
                style={styles.modalButton}>
                <Text>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Image source={require('../img/addAvatar.png')}
                 style={styles.headerImage} />
        </View>
        <View style={styles.inputs}>
          <Form
            ref="form"
            type={Person}
            value={this.state.value}
            onChange={this.onChange}
            options={options}
          />
          <Text style={styles.errorText}>{this.state.errorMsg}</Text>
        </View>
        <TouchableHighlight
        style={styles.button}
        onPress={this.onPress}>
          <Text style={styles.registerText}>Create</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .25,
    backgroundColor: 'transparent'
  },
  headerImage: {
    width: 84,
    height: 84
  },
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
  userInput: {
    marginTop: 10,
    width: 400,
    height: 30,
    color: '#000',
    paddingLeft: 1,
  },
  button: {
    padding: 10,
    height: 60,
    backgroundColor: '#d667cd',
    marginTop: 10
  },
  registerText: {
    top: 7,
    fontSize: 19,
    alignSelf: 'center',
    color: '#fffdec'
  },
  errorText: {
    left: 20,
    fontSize: 15,
    marginTop: 25,
    color: '#ff0033'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});

module.exports = Register;
