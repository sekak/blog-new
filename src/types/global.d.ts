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