import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget
} from '@/components';
import { CategoryProps } from '@/models/category';
import { DetailPostProps, PostResponse } from '@/models/post';
import { getPostDetails, getPosts } from '@/services/posts';
import React from 'react';
// import { getPosts, getPostDetails } from '@/services/posts';

type Props = {
  post: DetailPostProps
}

export const PostDetails = ({ post }: Props) => {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <PostDetail {...post} />
          <Author {...post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category: CategoryProps) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails

export async function getStaticProps({ params }: { params: { slug: string }}) {
  const data = await getPostDetails(params.slug)

  return {
    props: { post: data }
  }
}

export async function getStaticPaths() {
  const posts: PostResponse[] = await getPosts()

  return {
    paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
    fallback: false
  }
}