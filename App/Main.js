'use strict';

var React = require('react-native');
var {
  NativeAppEventEmitter,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  } = React;
var Firebase = require('firebase');
var GoogleSignin = require('react-native-google-signin');
var LoginComponent = require('./LoginComponent');
var Home = require('./Home');

var firebaseRef = new Firebase('https://boiling-heat-6944.firebaseio.com');
var usersRef = firebaseRef.child('users');

var Main = React.createClass({
  componentDidMount() {
    this.configureOauth(
      '13518206469-2m2365e44457n1vfetu6kh9kn89tb3md.apps.googleusercontent.com'
    );
  },
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },
  setErrorMsg(msg) {
    this.setState({errorMsg: msg});
  },
  configureOauth(clientId, scopes=[]) {
    GoogleSignin.configure(clientId, scopes);

    NativeAppEventEmitter.addListener('googleSignInError', (error) => {
      console.log('ERROR Sign in', error);
    });

    NativeAppEventEmitter.addListener('googleSignIn', (user) => {
      firebaseRef.authWithOAuthToken('google', user.accessToken,
        (error, authData) => {
          if(error) {
            // 파이어베이스 구글 인증 실패 시 모달에 메세지를 띄워준다.
            this.props.setErrorMsg(error.message);
            this.props.setModalVisible(true);
          } else {
            // DB에 유저의 이메일이 있는지 찾아본다.
            usersRef
              .orderByChild('email')
              .equalTo(user.email)
              .once('value', snapShot => {
                if(snapShot.val()){
                  // DB에 이미 등록된 이메일이 있으면 바로 로그인한다.
                } else {
                  // 이메일이 없으면 DB에 새 계정 등록 후 로그인한다.
                  //usersRef.child(authData.auth.uid).set({
                  //  provider: authData.auth.provider,
                  //  name: authData.google.displayname,
                  //  emails: authData.google.email,
                  //  profile: {
                  //    firstName: authData.google.cachedUserProfile.given_name,
                  //    lastName: authData.google.cachedUserProfile.family_name,
                  //    picture: authData.google.profileImageURL
                  //  }
                  //});
                }
              });
          }
        });
    });
    return true;
  },
  googleSignIn() {
    GoogleSignin.signIn();
  },
  googleSignOut() {
    GoogleSignin.signOut();
    this.setState({user: null});
  },
  getInitialState() {
    return {
      user: null,
      animated: true,
      modalVisible: false,
      transparent: true,
      errorMsg: '',
    }
  },
  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff'
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return (
      <View style={styles.container}>
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}>
          <View style={[styles.modalContainer, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>{this.state.errorMsg}</Text>
              <TouchableHighlight
                onPress={this.setModalVisible.bind(this, false)}
                underlayColor="#ffe3d6"
                style={styles.modalButton}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Be My Listener</Text>
        </View>
        <LoginComponent signInWithGoogle={this.googleSignIn}
                        toggleNavBar={this.props.toggleNavBar}
                        navigator={this.props.navigator}
                        setModalVisible={this.setModalVisible}
                        setErrorMsg={this.setErrorMsg}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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
  titleWrap: {
    flex: .25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

module.exports = Main;
