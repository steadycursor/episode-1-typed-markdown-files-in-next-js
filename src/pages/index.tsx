import Link from "next/link";

export const posts: { title: string; slug: string; content: string }[] = [
  { title: "First post", slug: "first-post", content: "Hello!" },
  { title: "Second post", slug: "second-post", content: "Hello from second." },
];

export default function Home() {
  return (
    <div>
      <h1>Blog posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
