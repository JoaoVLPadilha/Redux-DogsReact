import { USER_GET } from '../api';
import createAsyncSlice from './helper/createAsyncSlide';
import { fetchToken, resetTokenState } from './token';

const slice = createAsyncSlice({
  name: 'user',
  fetchConfig: (tokens) => USER_GET(tokens),
});
const { resetState: resetUserState, fetchError } = slice.actions;
export const fetchUser = slice.asyncAction;

export const userLogin = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchToken(user));
  if (payload.token) {
    window.localStorage.setItem('token', payload.token);
    await dispatch(fetchUser(payload.token));
  }
};

export const autoLogin = () => async (dispatch, getState) => {
  const { token } = getState();
  if (token?.data?.token) {
    const { type } = await dispatch(fetchUser(token.data.token));
    if (type === fetchError.type) dispatch(userLogout());
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch(resetUserState());
  dispatch(resetTokenState());
  window.localStorage.removeItem('token');
};
export default slice.reducer;
