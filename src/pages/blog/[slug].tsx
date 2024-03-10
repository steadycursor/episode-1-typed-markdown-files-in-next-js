import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { getPostsData } from '@/utils/getPostsData';

const BlogPostDetail = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => (
    <div>
        <div>Title: {post.title}</div>
        <div>Slug: {post.slug}</div>
        <div>Content: {post.content}</div>
    </div>
);

export const getStaticPaths = async () => {
    const posts = getPostsData();

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
    const posts = getPostsData();

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
