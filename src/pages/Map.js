import React, { Component } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Linking
} from "react-native";
import ModalMap from "./modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ModalActions } from "../store/ducks/modal";
import MapboxGL from "@mapbox/react-native-mapbox-gl";

const { width } = Dimensions.get("window");

MapboxGL.setAccessToken(
  "pk.eyJ1IjoicmVuYXRvcm9jaGEiLCJhIjoiY2p2YjNsNGMzMHNuYTQzbGN5aGF5NDZydCJ9.Evo0ZZXXNgVM3-H1FoYP7Q"
);

class Map extends Component {
  renderAnnotations(user) {
    const { latitude, longitude } = user.cordinates;
    return (
      <MapboxGL.PointAnnotation
        id={`point-${user.id}`}
        coordinate={[latitude, longitude]}
        key={`point-${user.id}`}
      >
        <View style={styles.markerBorder}>
          <Image style={styles.markerFill} source={{ uri: user.avatar }} />
        </View>

        <MapboxGL.Callout style={styles.calloutContainer}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(user.html_url);
            }}
          >
            <Text style={styles.user}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <Text style={styles.url}>{user.html_url}</Text>
          </TouchableOpacity>
        </MapboxGL.Callout>
      </MapboxGL.PointAnnotation>
    );
  }

  handleLonPress = e => {
    const [latitude, longitude] = e.geometry.coordinates;
    const { showModal } = this.props;

    showModal({ latitude, longitude });
  };

  render() {
    const { users } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView
          centerCoordinate={[-49.6446024, -27.2108001]}
          style={styles.container}
          showUserLocation
          styleURL={MapboxGL.StyleURL.Dark}
          onLongPress={this.handleLonPress}
        >
          {users.data.map(user => this.renderAnnotations(user))}
        </MapboxGL.MapView>

        <ModalMap />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  markerBorder: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 24
  },
  markerFill: {
    width: 48,
    height: 48,
    borderRadius: 24,
    transform: [{ scale: 0.75 }]
  },
  calloutContainer: {
    width: width / 2,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  user: {
    fontSize: 16,
    fontWeight: "bold"
  },
  bio: {
    fontSize: 12,
    fontWeight: "200"
  },
  url: {
    paddingTop: 1,
    fontSize: 10,
    fontWeight: "100",
    color: "grey"
  }
});

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
