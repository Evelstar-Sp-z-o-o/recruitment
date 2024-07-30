import { PostActionTypes, PostState } from '../../types';

const initialState: PostState = {
  posts: [],
  editingPost: null,
};

export const postReducer = (state = initialState, action: PostActionTypes): PostState => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return { ...state, posts: action.payload };
    case 'FETCH_POST':
      return { ...state, editingPost: action.payload };
    case 'CREATE_POST':
      return { ...state, posts: [...state.posts, action.payload] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post)),
        editingPost: null,
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case 'SET_EDITING_POST':
      return { ...state, editingPost: action.payload };
    default:
      return state;
  }
};
