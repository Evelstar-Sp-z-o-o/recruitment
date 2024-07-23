export interface PostData {
  body: string;
  author: string;
  created: number;
  edited: number;
  postId: string;
}

export interface Post {
  id: number;
  data: PostData;
}

export type PostState = {
  posts: Post[];
  editingPost: Post | null;
};

interface FetchPostsAction {
  type: 'FETCH_POSTS';
  payload: Post[];
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

interface SetEditingPostAction {
  type: 'SET_EDITING_POST';
  payload: Post | null;
}

export type PostActionTypes =
  | FetchPostsAction
  | FetchPostAction
  | CreatePostAction
  | UpdatePostAction
  | DeletePostAction
  | SetEditingPostAction;
