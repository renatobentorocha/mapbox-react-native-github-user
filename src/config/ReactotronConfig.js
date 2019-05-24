import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import sagaPlugin from "reactotron-redux-saga";

const reactotron = Reactotron.configure({ host: "192.168.0.103", port: 9090 }) // controls connection & communication settings
  .useReactNative()
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();

export default reactotron;
