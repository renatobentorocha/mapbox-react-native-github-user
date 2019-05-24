import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ModalActions } from "../store/ducks/modal";
import { Creators as UserActions } from "../store/ducks/user";

const { width, height } = Dimensions.get("window");

class ModalMap extends Component {
  state = { userInput: "" };

  handleVisible = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  handleFormSubmit = e => {
    const { loading } = this.props;

    if (loading) return;

    const { userInput } = this.state;

    if (!userInput) return;

    const {
      addUserRequest,
      modal: { cordinates }
    } = this.props;

    console.log(cordinates);

    addUserRequest(userInput, cordinates);
    this.setState({ userInput: "" });
  };

  handleInputChange = text => this.setState({ userInput: text });

  render() {
    const { visible } = this.props.modal;
    return (
      <Modal
        animationType={"slide"}
        transparent
        visible={visible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: (height * 40) / 100,
              width: (width * 80) / 100,
              backgroundColor: "#fff"
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Adicionar novo local
            </Text>
            <TextInput
              value={this.state.userInput}
              onChangeText={text => this.handleInputChange(text)}
              placeholder="Usuário no GitHub"
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                width: "80%",
                borderRadius: 5,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#fff"
              }}
            />
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 8,
                  margin: 3,
                  backgroundColor: "#DFD9D9",
                  width: "40%",
                  borderRadius: 3
                }}
                onPress={() => this.handleVisible()}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center"
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 8,
                  margin: 3,
                  backgroundColor: "#63E47C",
                  width: "40%",
                  borderRadius: 3
                }}
                onPress={() => this.handleFormSubmit()}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center"
                  }}
                >
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  loading: state.users.loading,
  error: state.users.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ModalActions, ...UserActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalMap);
