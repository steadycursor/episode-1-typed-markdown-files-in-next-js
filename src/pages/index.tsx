import Link from 'next/link';
import { getPostsData } from '@/utils/getPostsData';
import type { InferGetStaticPropsType } from 'next';

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <h1>Blog posts</h1>

            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>
                            {post.title} ({post.date})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getStaticProps = async () => {
    const posts = getPostsData();

    return {
        props: {
            posts,
        },
    };
};
