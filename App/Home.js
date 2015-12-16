'use strict';

var React = require('react-native');
var {
  ListView,
  TabBarIOS,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  } = React;
var Firebase = require('firebase');
var PlayItem = require('./PlayItem');

var firebaseRef = new Firebase('https://boiling-heat-6944.firebaseio.com');
var usersRef = firebaseRef.child('users');

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.objectId !== r2.objectId
});

var Home = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'playlist',
      notifCount: 0,
      presses: 0,
      dataSource: ds.cloneWithRows([
        {objectId: "AbCdEfG", songTitle: "title1", artist: "test1"},
        {objectId: "AbCdEfG", songTitle: "title2", artist: "test2"}
      ])
    };
  },
  renderItem(item) {
    return <PlayItem data={item} key={item.objectId} />;
  },
  render() {
    return (
      <TabBarIOS
        tintColor="#fff"
        barTintColor="#d667cd">
        <TabBarIOS.Item
          title="Playlist"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'playlist'}
          onPress={() => {
            this.setState({
              selectedTab: 'playlist',
            });
          }}>
          <View style={styles.playlistTapView}>
            <View style={styles.playlistWrap}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderItem} />
            </View>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={{uri: base64Icon, scale: 3}}
          title="Community"
          selected={this.state.selectedTab === 'community'}
          onPress={() => {
            this.setState({
              selectedTab: 'community',
              presses: this.state.presses + 1
            });
          }}>
          <View style={styles.tabContent}>

          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Friends"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'friends'}
          onPress={() => {
            this.setState({
              selectedTab: 'friends',
            });
          }}>
          <View style={styles.tabContent}>

          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={{uri: base64Icon, scale: 3}}
          title="Notification"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'notification'}
          onPress={() => {
            this.setState({
              selectedTab: 'notification',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <View style={styles.tabContent}>

          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  playlistTapView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistWrap: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#dfdfdf',
    width: 350,
    height: 550,
  }
});

module.exports = Home;
