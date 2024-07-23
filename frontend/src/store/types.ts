export interface Post {
  id: number;
  title: string;
  content: string;
}

export type PostState = Post[];

interface FetchPostsAction {
  type: 'FETCH_POSTS';
  payload: PostState;
}

interface FetchPostAction {
  type: 'FETCH_POST';
  payload: Post;
}

interface CreatePostAction {
  type: 'CREATE_POST';
  payload: Post;
}

interface UpdatePostAction {
  type: 'UPDATE_POST';
  payload: Post;
}

interface DeletePostAction {
  type: 'DELETE_POST';
  payload: number;
}

export type PostActionTypes =
  | FetchPostsAction
  | FetchPostAction
  | CreatePostAction
  | UpdatePostAction
  | DeletePostAction;
