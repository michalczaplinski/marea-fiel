import { PostListItem } from "@marketing/blog/components";
import { allPosts } from "contentlayer/generated";
import { useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale);
  return {
    title: t("blog.title"),
  };
}

export default function BlogListPage() {
  const t = useTranslations();

  return (
    <div className="container max-w-6xl pb-24">
      <div className="mb-12 pt-8 text-center">
        <h1 className="mb-2 text-5xl font-bold">{t("blog.title")}</h1>
        <p className="text-lg opacity-50">{t("blog.description")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {allPosts.map((post) => (
          <PostListItem post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
