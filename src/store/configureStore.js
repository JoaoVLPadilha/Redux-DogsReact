import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import feed from './feed';
import photo from './photo';
import photoPost from './photoPost';
import token from './token';
import ui from './ui';
import user from './user';

const contador = () => 0;

const middleware = [...getDefaultMiddleware()];

const reducer = combineReducers({ photo, photoPost, token, user, feed, ui });

const store = configureStore({ reducer, getDefaultMiddleware });

export default store;
