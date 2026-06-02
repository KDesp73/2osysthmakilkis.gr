import { GithubHelper } from "@/lib/GithubHelper";
import { slugify } from "@/lib/utils";

export async function runDeletePost(title: string): Promise<void> {
  const slug = slugify(title);
  if (!slug) throw new Error("Cannot generate slug from title");

  const gh = await GithubHelper.create();
  await gh.remove(
    [`public/content/blog/${slug}.md`],
    `Removed blog post: ${title}`,
  );
}
