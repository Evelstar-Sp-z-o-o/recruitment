import { PostActionTypes, PostState } from '../types';

const initialState: PostState = [];

const postsReducer = (state = initialState, action: PostActionTypes): PostState => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    case 'CREATE_POST':
      return [...state, action.payload];
    case 'UPDATE_POST':
      return state.map((post) => (post.id === action.payload.id ? action.payload : post));
    case 'DELETE_POST':
      return state.filter((post) => post.id !== action.payload);
    default:
      return state;
  }
};

export default postsReducer;
