import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostPageProps {
  post: any
}

export default function PostDetailPage ({post}: PostPageProps) {
  const router = useRouter(); // Get path params from URL

  if (!post) return null;

  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nGET STATIC PATHS')
  const respons = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await respons.json();
  
  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id} })),
    fallback: false,
  }
}


export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext
  ) => {
    console.log('\nGET STATIC PROPS', context.params?.postId)
    const postId = context.params?.postId
    if (!postId) return { notFound: true }

    // server-side -> run (build-time)
    // gọi bên phía Server: có thể viết code trên server
    const respons = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
    const data = await respons.json()
    // console.log(data)
  return {
    props: {
      post: data,
    }
  }
}