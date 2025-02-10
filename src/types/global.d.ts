export interface CommentListProps {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface DataForm { 
  email: string
  password: string
  fullname?: string
}

export interface CommentsProps{
  author: string
  content: string
  created_at: string
  id?: string
  image?: string
  post_id: string
  user_id: string
}


export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  description: string
  image: string
}

export interface PostResponse {
  posts: Post[];
  count: number;
}