import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { posts } from "..";

const BlogPostDetail = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <div>
    <div>Title: {post.title}</div>
    <div>Slug: {post.slug}</div>
    <div>Content: {post.content}</div>
  </div>
);

export const getStaticPaths = async () => {
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext & {
  params: {
    slug: string;
  };
}) {
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    throw new Error(`Post not found with slug ${params.slug}`);
  }

  return {
    props: {
      post,
    },
  };
}

export default BlogPostDetail;
