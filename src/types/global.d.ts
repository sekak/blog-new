export interface CommentListProps {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface DataForm {
  email: string;
  password: string;
  fullname?: string;
}

export interface CommentsProps {
  author: string;
  content: string;
  created_at: string;
  id?: string;
  image?: string;
  post_id: string;
  user_id: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  description: string;
  image: string;
  created_at: string;
}

export interface PostResponse {
  posts: Post[];
  empty: boolean;
  success: boolean;
}

export interface PropsError {
  status: number;
  message: string;
}

export interface PageProps {
  params: { id: string };
}

export interface PostProps {
  id: string;
  title: string;
  description: string;
  image: string;
  user_id: string;
  created_at: string;
  empty?: boolean;
}

export interface PropsForm {
  name: string;
  email: string;
  description: string;
}

export interface UserProps {
  isProfile?: boolean;
  user_id: string;
}

export interface PropsSavedPosts {
  id: string
  post_id: string
  user_id: string
  saved_at: string
  post: {
    id: string
    title: string
    image: string
    user_id: string
    created_at: string
    updated_at: string
  }
  board_id: string
  board_name: string
}