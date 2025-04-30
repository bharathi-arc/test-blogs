import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default function Post({ frontmatter, content }) {
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map(filename => ({
    params: { slug: filename.replace('.md', '') }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const file = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data, content } = matter(file);
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    props: {
      frontmatter: data,
      content: htmlContent
    }
  };
}
