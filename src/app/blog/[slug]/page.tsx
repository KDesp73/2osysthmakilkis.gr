import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post, getPostBySlug, getAllPosts } from "@/lib/posts";
import { Calendar, ChevronLeft, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/styles/post.module.css";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let post: Post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Link href="/blog">
        <Button variant={"secondary"}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Πίσω
        </Button>
      </Link>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {post.date.split("T")[0]}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" /> {post.author}
          </span>
          <div className="flex gap-2 flex-wrap">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <article className={styles.article}>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </main>
    </>
  );
}
