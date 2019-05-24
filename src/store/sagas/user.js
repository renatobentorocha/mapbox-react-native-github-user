import { call, put, select } from "redux-saga/effects";
import api from "../../services/api";
import { Creators as UserActions } from "../ducks/user";

export function* addUser(action) {
  try {
    console.log(`/users/${action.payload.user}`);
    const { data } = yield call(api.get, `/users/${action.payload.user}`);

    const isDuplicated = yield select(state =>
      state.users.data.find(user => user.id === data.id)
    );

    if (isDuplicated) throws();

    const userData = {
      id: data.id,
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatar: data.avatar_url,
      html_url: data.html_url,
      cordinates: action.payload.cordinates
    };

    console.log(userData);
    yield put(UserActions.addUserSuccess(userData));
  } catch (error) {
    yield put(UserActions.addUserFailure("Erro ao adicionar usuário"));
  }
}

export function* deleteUser(action) {
  try {
    const id = action.payload.id;

    const users = yield select(state =>
      state.users.data.filter(user => user.id !== id)
    );

    console.log(users);

    yield put(UserActions.deleteUserSuccess(users));
  } catch (error) {
    yield put(UserActions.addUserFailure("Erro ao adicionar usuário"));
    console.log(error);
  }
}
