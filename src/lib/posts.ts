import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "public/content/blog");
const SLUG_RE = /^[a-z0-9-]+$/;

export interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  author?: string;
  tags: [string];
  contentHtml: string;
}

interface FrontMatter {
  title: string;
  date: string;
  description?: string;
  author?: string;
  tags: [string];
}

function resolvePostPath(slug: string): string {
  if (!SLUG_RE.test(slug)) {
    throw new Error("Invalid slug");
  }
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const resolvedDir = path.resolve(postsDirectory);
  const resolvedPath = path.resolve(fullPath);
  if (!resolvedPath.startsWith(resolvedDir + path.sep)) {
    throw new Error("Invalid slug path");
  }
  if (!fs.existsSync(resolvedPath)) {
    throw new Error("Post not found");
  }
  return resolvedPath;
}

export function getAllPosts(): Omit<Post, "contentHtml">[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents) as unknown as { data: FrontMatter };

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      tags: data.tags,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = resolvePostPath(slug);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents) as unknown as {
    data: FrontMatter;
    content: string;
  };

  const processed = await remark()
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    author: data.author,
    tags: data.tags,
    contentHtml,
  };
}
