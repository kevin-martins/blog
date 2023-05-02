import { PostCard, PostWidget, Categories } from '@/components';
import { getPosts } from '../services/posts';
import { PostProps } from '@/models/post';

type Props = {
  posts: Array<{ node: PostProps }>
}

export default function Home({ posts }: Props) {
  return (
    <main>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid gid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post) => <PostCard key={post.node.title} {...post.node} />)}
          </div>
          <div className="lg:col-span-4 col-span-1">
              <div className="lg:sticky relative top-8">
                <PostWidget />
                <Categories />
              </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return  {
    props: { posts }
  }
}