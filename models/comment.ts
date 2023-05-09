export type CommentResponse = {
  comments: CommentProps[]
}

export type CommentProps = {
  name: string,
  createdAt: Date,
  comment: string,
}