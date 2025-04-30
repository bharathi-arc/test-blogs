import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Blog({ posts }) {
  return (
    <div>
      <h1>என் பிளாக்</h1>
      <ul>
        {posts.map(({ slug, title, date }) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>
              {title} ({date})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync('posts');
  const posts = files.map((filename) => {
    const markdown = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data } = matter(markdown);
    return {
      ...data,
      slug: filename.replace('.md', ''),
    };
  });

  return { props: { posts } };
}
